import { OrcamentosRepository } from "@/repositories/orcamentos-repository"
import { Orcamento } from "@prisma/client"

//classe com objetivo de listar todas os orçamentos
export class GetAllOrcamentos {
    constructor(private orcamentosRepository: OrcamentosRepository) {} // recebe repositório do controller

    //solicida as orcamentos para o repositório e as armazena em variável
    async execute(): Promise<{orcamentos: Orcamento[]}> {
        const orcamentos = await this.orcamentosRepository.findAll()

        return {
            orcamentos
        }
    }
}