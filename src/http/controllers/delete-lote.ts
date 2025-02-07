import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { ResourseNotFoundError } from "@/use-cases/errors/resourse-not-found-error";
import { makeDeleteLoteUseCase } from "@/use-cases/factories/make-delete-lote-use-case";

// Controller para deletar um lote
export async function deleteLote(request: FastifyRequest, reply: FastifyReply) {
    // Validação do ID com Zod
    const deleteLoteParamsSchema = z.object({
        id: z.string()
    });

    console.log(request.params)

    // Faz o parse e valida o parâmetro recebido
    const { id } = deleteLoteParamsSchema.parse(request.params);

    

    try {
        // Instancia o caso de uso
        const deleteLoteUseCase = makeDeleteLoteUseCase();

        // Executa a exclusão do lote
        await deleteLoteUseCase.execute({ id });

    } catch (err) {
        if (err instanceof ResourseNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        throw err;
    }

    // Retorno de sucesso sem conteúdo
    return reply.status(204).send();
}
