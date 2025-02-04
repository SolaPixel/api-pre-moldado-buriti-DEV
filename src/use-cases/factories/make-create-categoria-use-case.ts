/* centralizador de dependenias / repoitórios para controller 
    em caso de necessitar de outra dependencia ou de dependencas adicionais
*/

import { PrismaCategoriasRepository } from "@/repositories/prisma/prisma-categorias-repository"
import { CreateCategoriaUseCase } from "../create-categoria"

export function makeCreateCategoriaUseCase() {
    //instanciando repositório juntamente com caso de uso, para envio correto dos dados
    const categoriasRepository = new PrismaCategoriasRepository()
    const createCategoriaUseCase = new CreateCategoriaUseCase(categoriasRepository)

    return createCategoriaUseCase
}