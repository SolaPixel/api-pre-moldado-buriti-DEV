/* centralizador de dependenias / repoitórios para controller 
em caso de necessitar de outra dependencia ou de dependencas adicionais*/

import { PrismaLotesRepository } from "@/repositories/prisma/prisma-lotes-repository";
import { CreateLoteUseCase } from "../create-lote";
import { PrismaProdutosRepository } from "@/repositories/prisma/prisma-produtos-repository";


export function makeCreateLoteUseCase() {
    //instanciando repositório juntamente com caso de uso, para envio correto dos dados
    const lotesRepository = new PrismaLotesRepository();
    const produtosRepository = new PrismaProdutosRepository()
    const createLoteUseCase = new CreateLoteUseCase(lotesRepository, produtosRepository);

    return createLoteUseCase
}