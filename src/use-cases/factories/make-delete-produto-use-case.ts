/* centralizador de dependenias / repoitórios para controller 
em caso de necessitar de outra dependencia ou de dependencas adicionais*/

import { DeleteProdutoUseCase } from "../delete-produto";
import { PrismaProdutosRepository } from "@/repositories/prisma/prisma-produtos-repository";


export function makeDeleteProdutoUseCase() {
    //instanciando repositório juntamente com caso de uso, para envio correto dos dados
    const produtosRepository = new PrismaProdutosRepository()
    const deleteProdutoUseCase = new DeleteProdutoUseCase(produtosRepository);

    return deleteProdutoUseCase
}