
import { PrismaDevolucoesRepository } from "@/repositories/prisma/prisma-devolucoes-repository" 
import { CreateDevolucaoUseCase } from "../create-devolucao"
import { PrismaLotesRepository } from "@/repositories/prisma/prisma-lotes-repository"

export function makeCreateDevolucaoUseCase() {
    //instanciando repositório juntamente com caso de uso, para envio correto dos dados
    const devolucoesRepository = new PrismaDevolucoesRepository()
    const lotesRepository = new PrismaLotesRepository()
    const createDevolucaoUseCase = new CreateDevolucaoUseCase(devolucoesRepository, lotesRepository)

    return createDevolucaoUseCase
}