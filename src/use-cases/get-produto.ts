import { ProdutosRepository } from "@/repositories/produtos-repository";
import { Produto } from "@prisma/client";
import { ResourseNotFoundError } from "./errors/resourse-not-found-error";

//para tipar parametro do execute com todos os dados que virão para o caso de uso
interface GetProdutoUseCaseRequest {
    produtoId: string
}

//tipando o retorno
interface GetProdutoUseCaseResponse {
    produto: Produto;
}

//classe contendo caso de uso independente responsável por receber dados do controller 
// e encamhinhar para devidos repositórios
export class GetProdutoUseCase {

    //construtor para receber repositório via parâmetro
    constructor(private produtosRepository: ProdutosRepository) { }

    //execução do caso de uso com suas devidas tipagens
    async execute({produtoId}: GetProdutoUseCaseRequest): Promise<GetProdutoUseCaseResponse> {

        //faz a requizição para o repositório
        const produto = await this.produtosRepository.findById(produtoId)

        //caso não encontre um produto
        if(!produto) {
            throw new ResourseNotFoundError
        }

        //devolvendo produto
        return {
            produto
        };
    }

}