// Arquivo dedicado a contruir erro específico

export class OrcamentoAlreadyExistsError extends Error {
    constructor() {
        super('Já existe um orcamento com a mesma numeração')
    }
}