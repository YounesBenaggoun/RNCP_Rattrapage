import AppError from "../error/AppError.js";

export class Anomaly {
    constructor(value) {
        const n = Number(value);
        if (!Number.isFinite(n) || n < -99.99 || n > 99.99) {
            throw new AppError(`Invalid anomaly: ${value}`, "INVALID_ANOMALY");
        }
        this.value = n;
    }

    get phase() {
        if (this.value >= 0.5) return "EL_NINO";
        if (this.value <= -0.5) return "LA_NINA";
        return "NEUTRAL";
    }
}