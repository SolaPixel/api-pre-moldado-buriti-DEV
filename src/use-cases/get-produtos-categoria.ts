import { ProdutosRepository } from "@/repositories/produtos-repository";
import { Categoria, Produto } from "@prisma/client";
import { ResourseNotFoundError } from "./errors/resourse-not-found-error";
import { CategoriasRepository } from "@/repositories/categorias-repository";

//para tipar parametro do execute com todos os dados que virão para o caso de uso
interface GetProdutosCategoriaUseCaseRequest {
    categoriaId: string
}

//tipando o retorno
interface GetProdutosCategoriaUseCaseResponse {
    produtos: Produto[];
    categoria: Categoria
}

//classe contendo caso de uso independente responsável por receber dados do controller 
// e encamhinhar para devidos repositórios
export class GetProdutosCategoriaUseCase {

    //construtor para receber repositório via parâmetro
    constructor(
        private produtosRepository: ProdutosRepository,
        private categoriasRepository: CategoriasRepository
    ) { }

    //execução do caso de uso com suas devidas tipagens
    async execute({categoriaId}: GetProdutosCategoriaUseCaseRequest): Promise<GetProdutosCategoriaUseCaseResponse> {


        const categoria = await this.categoriasRepository.findById(categoriaId)

        //faz a requizição para o repositório
        const produtos = await this.produtosRepository.findByCategoria(categoriaId)

        //caso não encontre um produto
        if(!categoria) {
            throw new ResourseNotFoundError
        }

        //devolvendo produtos e categoria
        return {
            produtos,
            categoria
        };
    }

}