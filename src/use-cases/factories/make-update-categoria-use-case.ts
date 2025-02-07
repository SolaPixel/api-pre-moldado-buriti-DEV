/* centralizador de dependenias / repoitórios para controller 
    em caso de necessitar de outra dependencia ou de dependencas adicionais
*/

import { PrismaCategoriasRepository } from "@/repositories/prisma/prisma-categorias-repository"
import { UpdateCategoriaUseCase } from "../update-categoria"

export function makeUpdateCategoriaUseCase() {
    //instanciando repositório juntamente com caso de uso, para envio correto dos dados
    const categoriasRepository = new PrismaCategoriasRepository()
    const updateCategoriaUseCase = new UpdateCategoriaUseCase(categoriasRepository)

    return updateCategoriaUseCase
}