import AppError from "../error/AppError.js";
export default class IOniObersrvation {
    async getAll() {
        throw new AppError("IOniObersrvation: Function getAll must Be Implemented");
    }
    async findDuplicatedData() {
        throw new AppError("IOniObersrvation: Function findDuplicatedData must Be Implemented");
    }
    async getByRange() {
        throw new AppError("IOniObersrvation: Function getByRange must Be Implemented");
    }
    
}