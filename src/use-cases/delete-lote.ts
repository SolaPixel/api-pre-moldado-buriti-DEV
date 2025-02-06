import { ProdutosRepository } from "@/repositories/produtos-repository";
import { LotesRepository } from "@/repositories/lotes-repository";
import { ResourseNotFoundError } from "./errors/resourse-not-found-error";

// Definição da interface do request
interface DeleteLoteUseCaseRequest {
    id: string;
}

// Definição da classe responsável pelo caso de uso
export class DeleteLoteUseCase {
    constructor(
        private lotesRepository: LotesRepository,
        private produtosRepository: ProdutosRepository
    ) {}

    async execute({ id }: DeleteLoteUseCaseRequest): Promise<void> {

        // Buscar se a lote existe antes de excluir
        const lote = await this.lotesRepository.findById(id);

        if (!lote) {
            throw new ResourseNotFoundError();
        }

        const produtoId = lote.produtoId

        // Deletar lote
        await this.lotesRepository.delete(id);

        // Atualiza o estoque do produto após deletar o  lote
        await this.produtosRepository.atualizarQuantEstoque(produtoId);

    }
}
