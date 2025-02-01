/* 

Controllers - funções específicas da camada http que recebem requisição e devolvem uma resposta. 

arquivo dedicado a controller de criação de categoria

Através do princípio "D", controller encaminha para caso de uso quall dependencia/repositório utilizar
*/


import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { CreateCategoriaUseCase } from '@/use-cases/create-categoria' //recebendo classe responsável pelo use case
import { PrismaCategoriasRepository } from '@/repositories/prisma/prisma-categorias-repository'

// controller de criação de categoria
export async function createCategoria(request: FastifyRequest, reply: FastifyReply){ //tipando com funções do fastify

    //esquema para verificar se dados estão chegando corretamente
    const createCategoriaBodySchema = z.object({
        nome: z.string(),
    })

    const { nome } = createCategoriaBodySchema.parse(request.body) //encaminha os dados para validação de acordo com o esquema, caso contrário error


    //encaminha os dados, juntamente com o repositório desejado para o use-case, e verifica se houve algum erro
    try {

        //instanciando repositório juntamente com caso de uso, para envio correto dos dados
        const categoriasRepository = new PrismaCategoriasRepository()
        const createCategoriaUseCase = new CreateCategoriaUseCase(categoriasRepository)

        await createCategoriaUseCase.execute({ //método vindo da classe do use case, responsável por encaminhar dado para repositório desejado
            nome,
        })
    } catch (err) {
        return reply.status(409).send()
    }
    
    //retorno caso tudo de certo
    return reply.status(201).send()
}