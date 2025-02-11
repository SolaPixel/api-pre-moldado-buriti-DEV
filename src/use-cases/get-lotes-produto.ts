import { ProdutosRepository } from "@/repositories/produtos-repository";
import { Lote, Produto } from "@prisma/client";
import { ResourseNotFoundError } from "./errors/resourse-not-found-error";
import { LotesRepository } from "@/repositories/lotes-repository";

//para tipar parametro do execute com todos os dados que virão para o caso de uso
interface GetLotesProdutoUseCaseRequest {
    produtoId: string
}

//tipando o retorno
interface GetLotesProdutoUseCaseResponse {
    lotes: Lote[];
    produto: Produto
}

//classe contendo caso de uso independente responsável por receber dados do controller 
// e encamhinhar para devidos repositórios
export class GetLotesProdutoUseCase {

    //construtor para receber repositório via parâmetro
    constructor(
        private lotesRepository: LotesRepository,
        private produtosRepository: ProdutosRepository,
    ) { }

    //execução do caso de uso com suas devidas tipagens
    async execute({produtoId}: GetLotesProdutoUseCaseRequest): Promise<GetLotesProdutoUseCaseResponse> {


        const produto = await this.produtosRepository.findById(produtoId)

        //faz a requizição para o repositório
        const lotes = await this.lotesRepository.findByProduto(produtoId)

        //caso não encontre um produto
        if(!produto) {
            throw new ResourseNotFoundError
        }

        //devolvendo produtos e categoria
        return {
            lotes,
            produto
        };
    }

}