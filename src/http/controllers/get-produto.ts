import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { ResourseNotFoundError } from "@/use-cases/errors/resourse-not-found-error";
import { makeGetProdutoUseCase } from "@/use-cases/factories/make-get-produto-use-case";


// Controller para buscar um produto
export async function getProduto(request: FastifyRequest, reply: FastifyReply) {
    // Validação do ID com Zod
    const getProdutoParamsSchema = z.object({
        produtoId: z.string()
    });

    // Faz o parse e valida o parâmetro recebido
    const { produtoId } = getProdutoParamsSchema.parse(request.params);

    try {
        // Instancia o caso de uso
        const getProdutoUseCase = makeGetProdutoUseCase();

        // Executa a busca do produto
        const { produto } = await getProdutoUseCase.execute({ produtoId });

        // Retorno com os dados do produto
        return reply.status(200).send({ produto });
    } catch (err) {
        if (err instanceof ResourseNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        throw err;
    }
}