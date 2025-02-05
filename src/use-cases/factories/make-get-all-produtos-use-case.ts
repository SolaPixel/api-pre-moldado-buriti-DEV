/* centralizador de dependenias / repoitórios para controller 
em caso de necessitar de outra dependencia ou de dependencas adicionais
*/

import { PrismaProdutosRepository } from "@/repositories/prisma/prisma-produtos-repository"
import { GetAllProdutos } from "../get-all-produtos"

export function makeGetAllProdutosUseCase() {
    //instanciando repositório juntamente com caso de uso, para envio correto dos dados
    const produtosRepository = new PrismaProdutosRepository()
    const getAllProdutos = new GetAllProdutos(produtosRepository)

    return getAllProdutos
}