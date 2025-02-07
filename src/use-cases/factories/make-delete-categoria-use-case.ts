/* centralizador de dependenias / repoitórios para controller 
    em caso de necessitar de outra dependencia ou de dependencas adicionais
*/

import { PrismaCategoriasRepository } from "@/repositories/prisma/prisma-categorias-repository"
import { DeleteCategoriaUseCase } from "../detete-categoria"


export function makeDeleteCategoriaUseCase() {
    //instanciando repositório juntamente com caso de uso, para envio correto dos dados
    const categoriasRepository = new PrismaCategoriasRepository()
    const deleteCategoriaUseCase = new DeleteCategoriaUseCase(categoriasRepository)

    return deleteCategoriaUseCase
}