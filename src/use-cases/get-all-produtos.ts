import { ProdutosRepository } from "@/repositories/produtos-repository"
import { Produto } from "@prisma/client"

//classe com objetivo de listar todas as categoririas
export class GetAllProdutos {
    constructor(private produtosRepository: ProdutosRepository) {} // recebe repositório do controller

    //solicida as produtos para o repositório e as armazena em variável
    async execute(): Promise<{produtos: Produto[]}> {
        const produtos = await this.produtosRepository.findAll()

        return {
            produtos
        }
    }
}