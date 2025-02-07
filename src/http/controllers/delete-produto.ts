import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { ResourseNotFoundError } from "@/use-cases/errors/resourse-not-found-error";
import { makeDeleteProdutoUseCase } from "@/use-cases/factories/make-delete-produto-use-case";


// Controller para deletar um lote
export async function deleteProduto(request: FastifyRequest, reply: FastifyReply) {
    // Validação do ID com Zod
    const deleteProdutoParamsSchema = z.object({
        id: z.string()
    });

    console.log(request.params)

    // Faz o parse e valida o parâmetro recebido
    const { id } = deleteProdutoParamsSchema.parse(request.params);

    

    try {
        // Instancia o caso de uso
        const deleteProdutoUseCase = makeDeleteProdutoUseCase();

        // Executa a exclusão do lote
        await deleteProdutoUseCase.execute({ id });

    } catch (err) {
        if (err instanceof ResourseNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        throw err;
    }

    // Retorno de sucesso sem conteúdo
    return reply.status(204).send();
}
