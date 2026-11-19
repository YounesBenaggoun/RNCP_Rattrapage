import AppError from "../error/AppError.js";
export default class IOniObersrvation {
    async getAll() {
        throw new AppError("Interface : Function getAll must be implemented");
    }

}