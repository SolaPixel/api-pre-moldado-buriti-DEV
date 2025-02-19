/* centralizador de dependenias / repoitórios para controller 
    em caso de necessitar de outra dependencia ou de dependencas adicionais
*/

import { PrismaOrcamentosRepository } from "@/repositories/prisma/prisma-orcamentos-repository"
import { CreateOrcamentoUseCase } from "../create-orcamento" 

export function makeCreateOrcamentoUseCase() {
    //instanciando repositório juntamente com caso de uso, para envio correto dos dados
    const orcamentosRepository = new PrismaOrcamentosRepository()
    const createOrcamentoUseCase = new CreateOrcamentoUseCase(orcamentosRepository)

    return createOrcamentoUseCase
}