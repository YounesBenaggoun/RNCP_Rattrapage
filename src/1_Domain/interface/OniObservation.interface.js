import AppError from "../error/AppError.js";
export default class IOniObersrvation {
    async getAll() {
        throw new AppError("IOniObersrvation: Function getAll must Be Implemented");
    }
}