import { ProdutosRepository } from "@/repositories/produtos-repository";
import { ResourseNotFoundError } from "./errors/resourse-not-found-error";

// Definição da interface do request
interface DeleteProdutoUseCaseRequest {
    id: string;
}

// Definição da classe responsável pelo caso de uso
export class DeleteProdutoUseCase {
    constructor(private produtosRepository: ProdutosRepository) {}

    async execute({ id }: DeleteProdutoUseCaseRequest): Promise<void> {
        // Buscar se a produto existe antes de excluir
        const produto = await this.produtosRepository.findById(id);

        if (!produto) {
            throw new ResourseNotFoundError();
        }

        // Deletar produto
        await this.produtosRepository.delete(id);
    }
}
