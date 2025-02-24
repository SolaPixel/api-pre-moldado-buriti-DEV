export class CannotToOperateOrcamentoAprovadoError extends Error {
    constructor() {
        super("Não é possível realizar esta operação em orçamentos aprovados.");
    }
}
