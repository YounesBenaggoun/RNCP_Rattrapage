import AppError from "../error/AppError.js";

export const SEASONS = Object.freeze([
    "DJF", "JFM", "FMA", "MAM", "AMJ", "MJJ",
    "JJA", "JAS", "ASO", "SON", "OND", "NDJ",
]);

export class Season {
    constructor(value) {
        if (!SEASONS.includes(value)) {
            throw new AppError(`Invalid season: ${value}`, "INVALID_SEASON");
        }
        this.value = value;
    }

    static index(season) {
        const i = SEASONS.indexOf(season);
        if (i === -1) throw new AppError(`Invalid season: ${season}`, "INVALID_SEASON");
        return i + 1; // 1..12 (cohérent avec oni_season_index)
    }

    equals(other) {
        return other instanceof Season && other.value === this.value;
    }
}