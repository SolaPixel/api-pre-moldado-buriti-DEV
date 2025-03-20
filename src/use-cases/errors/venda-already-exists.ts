export class VendaAlreadyExistsError extends Error {
    constructor() {
        super("Já existe uma venda com esta numeração.");
    }
}
