// import { OniRepository } from "../../domain/repositories/OniRepository.js";
import { OniObservation } from "../../1_Domain/entities/OniObservation.js";

const SORT_COLUMNS = {
    center_date: "center_date",
    year: "year",
    anomaly: "anomaly",
    season_index: "season_index",
};

export default class PostgresOniRepository {
    constructor({ pool }) {
        // super();
        this.pool = pool;
    }

    async getAll() {
        const tab = await this.pool.query(
            `SELECT year , anomaly as oni , season_index as month
     FROM public.oni_observations
     ORDER BY year ASC, season_index ASC`
        );
        const result = tab.rows;
        return result;
    }

    _mapRow(row) {
        if (!row) return null;
        return new OniObservation({
            year: row.year,
            season: row.season,
            anomaly: Number(row.anomaly),
            source: row.source,
            centerDate: row.center_date instanceof Date
                ? row.center_date.toISOString().slice(0, 10)
                : row.center_date,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
        });
    }

    async list({ year, season, phase, limit, offset, orderBy, order }) {
        const where = [];
        const params = [];

        if (year !== undefined) { params.push(year); where.push(`year = $${params.length}`); }
        if (season) { params.push(season); where.push(`season = $${params.length}`); }
        if (phase === "EL_NINO") where.push(`anomaly >= 0.5`);
        if (phase === "LA_NINA") where.push(`anomaly <= -0.5`);
        if (phase === "NEUTRAL") where.push(`anomaly > -0.5 AND anomaly < 0.5`);

        const sqlOrderBy = SORT_COLUMNS[orderBy] ?? "center_date";
        const sqlOrder = String(order).toUpperCase() === "DESC" ? "DESC" : "ASC";
        const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

        const countSql = `SELECT COUNT(*)::int AS total FROM oni_observations ${whereSql}`;
        const dataSql = `
      SELECT year, season, anomaly, source, center_date, created_at, updated_at
      FROM oni_observations
      ${whereSql}
      ORDER BY ${sqlOrderBy} ${sqlOrder}
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `;

        const [countRes, dataRes] = await Promise.all([
            this.pool.query(countSql, params),
            this.pool.query(dataSql, [...params, limit, offset]),
        ]);

        return {
            total: countRes.rows[0].total,
            items: dataRes.rows.map((r) => this._mapRow(r)),
            limit,
            offset,
        };
    }

    async findByKey(year, season) {
        const { rows } = await this.pool.query(
            `SELECT * FROM oni_observations WHERE year = $1 AND season = $2`,
            [year, season]
        );
        return this._mapRow(rows[0]);
    }

    async findLatest() {
        const { rows } = await this.pool.query(
            `SELECT * FROM oni_observations ORDER BY center_date DESC LIMIT 1`
        );
        return this._mapRow(rows[0]);
    }

    async findByYear(year) {
        const { rows } = await this.pool.query(
            `SELECT * FROM oni_observations WHERE year = $1 ORDER BY season_index ASC`,
            [year]
        );
        return rows.map((r) => this._mapRow(r));
    }

    

    async create(entity) {
        const { rows } = await this.pool.query(
            `INSERT INTO oni_observations (year, season, anomaly, source)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
            [entity.year, entity.season, entity.anomaly, entity.source]
        );
        return this._mapRow(rows[0]);
    }

    async update(year, season, { anomaly, source }) {
        const sets = [];
        const params = [];

        if (anomaly !== undefined) { params.push(anomaly); sets.push(`anomaly = $${params.length}`); }
        if (source !== undefined) { params.push(source); sets.push(`source = $${params.length}`); }
        if (sets.length === 0) return this.findByKey(year, season);

        sets.push(`updated_at = now()`);
        params.push(year, season);

        const { rows } = await this.pool.query(
            `UPDATE oni_observations
       SET ${sets.join(", ")}
       WHERE year = $${params.length - 1} AND season = $${params.length}
       RETURNING *`,
            params
        );
        return this._mapRow(rows[0]);
    }

    async delete(year, season) {
        const { rowCount } = await this.pool.query(
            `DELETE FROM oni_observations WHERE year = $1 AND season = $2`,
            [year, season]
        );
        return rowCount > 0;
    }
}