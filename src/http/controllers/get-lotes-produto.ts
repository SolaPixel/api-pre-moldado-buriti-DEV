import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { ResourseNotFoundError } from "@/use-cases/errors/resourse-not-found-error";
import { makeGetLotesProdutoUseCase } from "@/use-cases/factories/make-get-lotes-produto-use-case";

// Controller para buscar produtos de uma categoria
export async function getLotesProduto(request: FastifyRequest, reply: FastifyReply) {

    // Validação dos dados recebidos
    const getLotesProdutoParamsSchema = z.object({
        produtoId: z.string(),
    });

    // Faz o parse e valida os dados da requisição
    const { produtoId } = getLotesProdutoParamsSchema.parse(request.params);

    try {
        // Instancia o caso de uso com repositórios
        const getLotesProdutoUseCase = makeGetLotesProdutoUseCase();

        // Executa o caso de uso
        const { lotes } = await getLotesProdutoUseCase.execute({ produtoId });

        // Retorna os produtos e a categoria encontrados
        return reply.status(200).send({ lotes });

    } catch (err) {

        if (err instanceof ResourseNotFoundError) {
            return reply.status(404).send({ message: err.message});
        }

        throw err;
    }
}
