/* 
    Controllers - funções específicas da camada http que recebem requisição e devolvem uma resposta. 
    arquivo dedicado a controller de criação de categoria
    Através do princípio "D", controller encaminha para caso de uso quall dependencia/repositório utilizar
*/


import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { CaregoriaAlreadyExistsError } from '@/use-cases/errors/categoria-already-exists'
import { makeCreateCategoriaUseCase } from '@/use-cases/factories/make-create-categoria-use-case'

// controller de criação de categoria
export async function createCategoria(request: FastifyRequest, reply: FastifyReply) { //tipando com funções do fastify

    //esquema para verificar se dados estão chegando corretamente
    const createCategoriaBodySchema = z.object({
        nome: z.string(),
    })

    const { nome } = createCategoriaBodySchema.parse(request.body) //encaminha os dados para validação de acordo com o esquema, caso contrário trava aplicação


    //encaminha os dados, juntamente com o repositório desejado para o use-case, e verifica se houve algum erro
    try {

        //instanciando repositório juntamente com caso de uso, vindo da factory
        const createCategoriaUseCase = makeCreateCategoriaUseCase()

        await createCategoriaUseCase.execute({ //método vindo da classe do use case, responsável por encaminhar dado para repositório desejado
            nome,
        })
    } catch (err) {

        //personalizando resposta conforme o erro retornado
        if (err instanceof CaregoriaAlreadyExistsError) {
            return reply.status(409).send({message: err.message})
        }

        throw err

    }

    //retorno caso tudo de certo
    return reply.status(201).send()
}