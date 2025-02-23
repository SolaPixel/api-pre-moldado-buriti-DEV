/* centralizador de dependenias / repoitórios para controller 
    em caso de necessitar de outra dependencia ou de dependencas adicionais
*/

import { PrismaOrcamentosRepository } from "@/repositories/prisma/prisma-orcamentos-repository"
import { UpdateSituacaoOrcamentoUseCase } from "../update-situacao-orcamento" 
import { PrismaLotesRepository } from "@/repositories/prisma/prisma-lotes-repository"

export function makeUpdateSituacaoOrcamentoUseCase() {
    //instanciando repositório juntamente com caso de uso, para envio correto dos dados
    const orcamentosRepository = new PrismaOrcamentosRepository()
    const lotesRepository = new PrismaLotesRepository()
    const updateSituacaoOrcamentoUseCase = new UpdateSituacaoOrcamentoUseCase(orcamentosRepository, lotesRepository)

    return updateSituacaoOrcamentoUseCase
}