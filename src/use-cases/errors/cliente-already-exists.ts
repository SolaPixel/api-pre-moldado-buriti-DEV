// Arquivo dedicado a contruir erro específico

export class ClienteAlreadyExistsError extends Error {
    constructor() {
        super('Já existe um cliente com o mesmo CPF')
    }
}