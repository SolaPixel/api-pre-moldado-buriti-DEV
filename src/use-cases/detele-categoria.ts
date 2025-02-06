import { CategoriasRepository } from "@/repositories/categorias-repository";
import { ResourseNotFoundError } from "./errors/resourse-not-found-error";

// Definição da interface do request
interface DeleteCategoriaUseCaseRequest {
    id: string;
}

// Definição da classe responsável pelo caso de uso
export class DeleteCategoriaUseCase {
    constructor(private categoriasRepository: CategoriasRepository) {}

    async execute({ id }: DeleteCategoriaUseCaseRequest): Promise<void> {
        // Buscar se a categoria existe antes de excluir
        const categoria = await this.categoriasRepository.findById(id);

        if (!categoria) {
            throw new ResourseNotFoundError();
        }

        // Deletar categoria
        await this.categoriasRepository.delete(id);
    }
}
