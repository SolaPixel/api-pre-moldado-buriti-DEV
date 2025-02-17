/* centralizador de dependenias / repoitórios para controller 
    em caso de necessitar de outra dependencia ou de dependencas adicionais
*/

import { PrismaClientesRepository } from "@/repositories/prisma/prisma-clientes-repository" 
import { CreateClienteUseCase } from "../create-cliente"

export function makeCreateClienteUseCase() {
    //instanciando repositório juntamente com caso de uso, para envio correto dos dados
    const clientesRepository = new PrismaClientesRepository()
    const createClienteUseCase = new CreateClienteUseCase(clientesRepository)

    return createClienteUseCase
}