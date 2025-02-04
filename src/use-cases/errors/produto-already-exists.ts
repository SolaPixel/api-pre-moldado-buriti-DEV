export class ProdutoAlreadyExistsError extends Error {
    constructor() {
        super("Já existe um produto com esta numeração.");
    }
}
