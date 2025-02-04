/* centralizador de dependenias / repoitórios para controller 
em caso de necessitar de outra dependencia ou de dependencas adicionais*/

import { PrismaProdutosRepository } from "@/repositories/prisma/prisma-produtos-repository";
import { CreateProdutoUseCase } from "../create-produto";


export function makeCreateProdutoUseCase() {
    //instanciando repositório juntamente com caso de uso, para envio correto dos dados
    const produtosRepository = new PrismaProdutosRepository();
    const createProdutoUseCase = new CreateProdutoUseCase(produtosRepository);

    return createProdutoUseCase
}