/* centralizador de dependenias / repoitórios para controller 
    em caso de necessitar de outra dependencia ou de dependencas adicionais
*/

import { PrismaProdutosRepository } from "@/repositories/prisma/prisma-produtos-repository"
import { UpdateProdutoUseCase } from "../update-produto"

export function makeUpdateProdutoUseCase() {
    //instanciando repositório juntamente com caso de uso, para envio correto dos dados
    const produtosRepository = new PrismaProdutosRepository()
    const updateProdutoUseCase = new UpdateProdutoUseCase(produtosRepository)

    return updateProdutoUseCase
}