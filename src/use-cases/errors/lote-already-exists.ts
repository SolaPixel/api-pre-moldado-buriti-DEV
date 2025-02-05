export class LoteAlreadyExistsError extends Error {
    constructor() {
        super("Já existe um lote com esta numeração.");
    }
}
