// Arquivo dedicado a contruir erro específico

export class CaregoriaAlreadyExistsError extends Error {
    constructor() {
        super('Já existe uma categoria com o mesmo nome')
    }
}