
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { ClienteAlreadyExistsError } from '@/use-cases/errors/cliente-already-exists'
import { makeCreateClienteUseCase } from '@/use-cases/factories/make-create-cliente-use-case' 

// controller de criação de cliente
export async function createCliente(request: FastifyRequest, reply: FastifyReply) { //tipando com funções do fastify

    //esquema para verificar se dados estão chegando corretamente
    const createClienteBodySchema = z.object({
        nome: z.string(),
        endereco: z.string(),
        telefone: z.string(),
        cpf: z.string().nullable()
    })

    const { 
        nome,
        endereco,
        telefone,
        cpf
     } = createClienteBodySchema.parse(request.body) //encaminha os dados para validação de acordo com o esquema, caso contrário trava aplicação


    //encaminha os dados, juntamente com o repositório desejado para o use-case, e verifica se houve algum erro
    try {

        //instanciando repositório juntamente com caso de uso, vindo da factory
        const createClienteUseCase = makeCreateClienteUseCase()

        await createClienteUseCase.execute({ //método vindo da classe do use case, responsável por encaminhar dado para repositório desejado
            nome,
            endereco,
            telefone,
            cpf
        })
    } catch (err) {

        //personalizando resposta conforme o erro retornado
        if (err instanceof ClienteAlreadyExistsError) {
            return reply.status(409).send({message: err.message})
        }

        throw err

    }

    //retorno caso tudo de certo
    return reply.status(201).send()
}