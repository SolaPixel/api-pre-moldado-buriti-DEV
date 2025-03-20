import { VendasRepository } from "@/repositories/vendas-repository"
import { Venda } from "@prisma/client"

//classe com objetivo de listar todas os orçamentos
export class GetAllVendas {
    constructor(private vendasRepository: VendasRepository) {} // recebe repositório do controller

    //solicida as vendas para o repositório e as armazena em variável
    async execute(): Promise<{vendas: Venda[]}> {
        const vendas = await this.vendasRepository.findAll()

        return {
            vendas
        }
    }
}