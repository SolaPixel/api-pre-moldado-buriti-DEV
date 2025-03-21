// Arquivo dedicado a contruir erro específico

export class LoteDoNotExistsError extends Error {
    constructor() {
        super('Nenhum lote foi encontrado para este produto')
    }
}