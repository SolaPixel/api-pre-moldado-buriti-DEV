/* centralizador de dependenias / repoitórios para controller 
em caso de necessitar de outra dependencia ou de dependencas adicionais
*/

import { PrismaCategoriasRepository } from "@/repositories/prisma/prisma-categorias-repository"
import { GetAllCategorias } from "../get-all-categorias"

export function makeGetAllCategoriasUseCase() {
    //instanciando repositório juntamente com caso de uso, para envio correto dos dados
    const categoriasRepository = new PrismaCategoriasRepository()
    const getAllCategorias = new GetAllCategorias(categoriasRepository)

    return getAllCategorias
}