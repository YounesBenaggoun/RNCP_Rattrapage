import { Season } from "../value-objects/Season.js";
import { Anomaly } from "../value-objects/Anomaly.js";
import AppError from "../error/AppError.js";



export class OniObservation  {
    constructor({ year, season, anomaly, source, centerDate, createdAt, updatedAt }) {
        if (!Number.isInteger(year) || year < 1800 || year > 2200) {
            throw new AppError(`Invalid year: ${year}`, "INVALID_YEAR");
        }
        const s = new Season(season);
        const a = new Anomaly(anomaly);
        if (!source || typeof source !== "string") {
            throw new AppError("source is required, INVALID_SOURCE", "500");
        }

        this.year = year;
        this.season = s.value;
        this.anomaly = a.value;
        this.source = source;
        this.phase = a.phase;
        this.centerDate = centerDate ?? OniObservation.computeCenterDate(year, s.value);
        this.createdAt = createdAt ?? null;
        this.updatedAt = updatedAt ?? null;
    }

    static computeCenterDate(year, season) {
        const month = Season.index(season);
        return new Date(Date.UTC(year, month - 1, 1)).toISOString().slice(0, 10);
    }

    isElNino() { return this.phase === "EL_NINO"; }
    isLaNina() { return this.phase === "LA_NINA"; }
    isNeutral() { return this.phase === "NEUTRAL"; }
}