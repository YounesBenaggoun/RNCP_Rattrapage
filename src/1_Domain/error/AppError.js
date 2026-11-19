export default class AppError extends Error {
    constructor(message = "Ecrire un Message d'Erreur", statusCode = 500) {
        super(String(message).trim());
        this.statusCode = Number(statusCode);
    }
}