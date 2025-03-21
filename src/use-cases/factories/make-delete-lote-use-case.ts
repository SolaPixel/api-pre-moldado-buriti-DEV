/* centralizador de dependenias / repoitórios para controller 
em caso de necessitar de outra dependencia ou de dependencas adicionais*/

import { PrismaLotesRepository } from "@/repositories/prisma/prisma-lotes-repository";
import { DeleteLoteUseCase } from "../delete-lote";


export function makeDeleteLoteUseCase() {
    //instanciando repositório juntamente com caso de uso, para envio correto dos dados
    const lotesRepository = new PrismaLotesRepository();
    // const produtosRepository = new PrismaProdutosRepository()
    const deleteLoteUseCase = new DeleteLoteUseCase(lotesRepository);

    return deleteLoteUseCase
}