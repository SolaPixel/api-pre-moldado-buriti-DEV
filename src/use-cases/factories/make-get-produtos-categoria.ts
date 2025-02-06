/* centralizador de dependenias / repoitórios para controller 
em caso de necessitar de outra dependencia ou de dependencas adicionais*/

import { PrismaCategoriasRepository } from "@/repositories/prisma/prisma-categorias-repository";
import { GetProdutosCategoriaUseCase } from "../get-produtos-categoria";
import { PrismaProdutosRepository } from "@/repositories/prisma/prisma-produtos-repository";


export function makeGetProdutosCategoriaUseCase() {
    //instanciando repositórios necessários juntamente com caso de uso, para envio correto dos dados
    const produtosRepository = new PrismaProdutosRepository()
    const categoriasRepository = new PrismaCategoriasRepository()
    const getProdutosCategoriaUseCase = new GetProdutosCategoriaUseCase(produtosRepository, categoriasRepository);

    return getProdutosCategoriaUseCase
}