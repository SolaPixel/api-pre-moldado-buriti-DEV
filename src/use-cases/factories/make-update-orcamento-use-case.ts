/* centralizador de dependenias / repoitórios para controller 
    em caso de necessitar de outra dependencia ou de dependencas adicionais
*/

import { PrismaOrcamentosRepository } from "@/repositories/prisma/prisma-orcamentos-repository"
import { UpdateOrcamentoUseCase } from "../update-orcamento" 

export function makeUpdateOrcamentoUseCase() {
    //instanciando repositório juntamente com caso de uso, para envio correto dos dados
    const orcamentosRepository = new PrismaOrcamentosRepository()
    const updateOrcamentoUseCase = new UpdateOrcamentoUseCase(orcamentosRepository)

    return updateOrcamentoUseCase
}