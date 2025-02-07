/* centralizador de dependenias / repoitórios para controller 
em caso de necessitar de outra dependencia ou de dependencas adicionais*/

import { GetProdutoUseCase } from "../get-produto";
import { PrismaProdutosRepository } from "@/repositories/prisma/prisma-produtos-repository";


export function makeGetProdutoUseCase() {
    //instanciando repositório juntamente com caso de uso, para envio correto dos dados
    const produtosRepository = new PrismaProdutosRepository()
    const getProdutoUseCase = new GetProdutoUseCase(produtosRepository);

    return getProdutoUseCase
}