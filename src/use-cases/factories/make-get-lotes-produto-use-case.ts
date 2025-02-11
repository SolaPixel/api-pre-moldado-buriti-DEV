/* centralizador de dependenias / repoitórios para controller 
em caso de necessitar de outra dependencia ou de dependencas adicionais*/

import { PrismaLotesRepository } from "@/repositories/prisma/prisma-lotes-repository";
import { GetLotesProdutoUseCase } from "../get-lotes-produto";
import { PrismaProdutosRepository } from "@/repositories/prisma/prisma-produtos-repository";


export function makeGetLotesProdutoUseCase() {
    //instanciando repositórios necessários juntamente com caso de uso, para envio correto dos dados
    const produtosRepository = new PrismaProdutosRepository()
    const lotesRepository = new PrismaLotesRepository()
    const getLotesProdutoUseCase = new GetLotesProdutoUseCase(lotesRepository, produtosRepository);

    return getLotesProdutoUseCase
}