import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { ResourseNotFoundError } from "@/use-cases/errors/resourse-not-found-error";
import { makeGetProdutosCategoriaUseCase } from "@/use-cases/factories/make-get-produtos-categoria";

// Controller para buscar produtos de uma categoria
export async function getProdutosCategoria(request: FastifyRequest, reply: FastifyReply) {

    // Validação dos dados recebidos
    const getProdutosCategoriaParamsSchema = z.object({
        categoriaId: z.string(),
    });

    // Faz o parse e valida os dados da requisição
    const { categoriaId } = getProdutosCategoriaParamsSchema.parse(request.params);

    try {
        // Instancia o caso de uso com repositórios
        const getProdutosCategoriaUseCase = makeGetProdutosCategoriaUseCase();

        // Executa o caso de uso
        const { produtos } = await getProdutosCategoriaUseCase.execute({ categoriaId });

        // Retorna os produtos e a categoria encontrados
        return reply.status(200).send({ produtos });

    } catch (err) {

        if (err instanceof ResourseNotFoundError) {
            return reply.status(404).send({ message: err.message});
        }

        throw err;
    }
}
