/* 

Controllers - funções que recebem requisição http e devolve uma resposta

arquivo dedicado a controller de registro

*/


import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from "@/lib/prisma"
import { z } from "zod"

// controller de registro de categoria
export async function register(request: FastifyRequest, reply: FastifyReply){ //tipando com funções do fastify

    //esquema para verificar se dados estão chegando corretamente
    const registerBodySchema = z.object({
        nome: z.string(),
    })

    const { nome } = registerBodySchema.parse(request.body) //encaminha os dados para validação de acordo com o esquema, caso contrário error

    //insere o dado no banco
    await prisma.categoria.create({
        data: {
            nome,
        }
    })

    //retorno caso tudo de certo
    return reply.status(201).send()
}