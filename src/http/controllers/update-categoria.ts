import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { CaregoriaAlreadyExistsError } from "@/use-cases/errors/categoria-already-exists";
import { makeUpdateCategoriaUseCase } from "@/use-cases/factories/make-update-categoria-use-case";

// Controller para criar um novo categoria
export async function updateCategoria(request: FastifyRequest, reply: FastifyReply) {
    // Validação dos dados com Zod
    const updateCategoriaBodySchema = z.object({
        id: z.string(),
        nome: z.string()
    });
    

    // Faz o parse e valida os dados recebidos
    const {
        id,
        nome
    } = updateCategoriaBodySchema.parse(request.body);


    try {
        //instancia dos reposotórios
        const updateCategoriaUseCase = makeUpdateCategoriaUseCase()

        // Executa o caso de uso para criar o Categoria
        await updateCategoriaUseCase.execute({
            id,
            nome
        });

    } catch (err) {

        if (err instanceof CaregoriaAlreadyExistsError) {
            return reply.status(409).send({ message: err.message });
        }

        throw err
    }

    //retorno caso tudo de certo
    return reply.status(204).send()
}