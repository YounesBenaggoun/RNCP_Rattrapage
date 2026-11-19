
import { OniObservation } from "../../1_Domain/entities/OniObservation.js";
import IOniObersrvation from "../../1_Domain/interface/OniObservation.interface.js";


export default class PostgresOniRepository extends IOniObersrvation {
    constructor({ pool }) {
        super();
        this.pool = pool;
    }

    // async getAll() {
    //     const tab = await this.pool.query(
    //         `SELECT year , anomaly as oni , season_index as month
    //  FROM public.oni_observations
    //  ORDER BY year ASC, season_index ASC`
    //     );
    //     const result = tab.rows;
    //     return result;
    // }
}