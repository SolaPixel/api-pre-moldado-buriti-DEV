import { OrcamentosRepository } from "@/repositories/orcamentos-repository";
import { ResourseNotFoundError } from "./errors/resourse-not-found-error";
import { CannotToOperateOrcamentoAprovadoError } from "./errors/cannot-to-operate-orcameto-aprovado";

// Definição da interface do request
interface DeleteOrcamentoUseCaseRequest {
    id: string;
}

// Definição da classe responsável pelo caso de uso
export class DeleteOrcamentoUseCase {
    constructor(private orcamentosRepository: OrcamentosRepository) { }

    async execute({ id }: DeleteOrcamentoUseCaseRequest): Promise<void> {
        // Buscar se a orcamento existe antes de excluir
        const orcamento = await this.orcamentosRepository.findById(id);

        if (!orcamento) {
            throw new ResourseNotFoundError();
        }

        if (orcamento.situacao === "APROVADO") {
            throw new CannotToOperateOrcamentoAprovadoError()
        }

        // Deletar orcamento
        await this.orcamentosRepository.delete(id);
    }
}
