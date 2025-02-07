import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { ResourseNotFoundError } from "@/use-cases/errors/resourse-not-found-error";
import { makeDeleteCategoriaUseCase } from "@/use-cases/factories/make-delete-categoria-use-case";

// Controller para deletar um categoria
export async function deleteCategoria(request: FastifyRequest, reply: FastifyReply) {
    // Validação do ID com Zod
    const deleteCategoriaParamsSchema = z.object({
        id: z.string()
    });

    console.log(request.params)

    // Faz o parse e valida o parâmetro recebido
    const { id } = deleteCategoriaParamsSchema.parse(request.params);

    

    try {
        // Instancia o caso de uso
        const deleteCategoriaUseCase = makeDeleteCategoriaUseCase();

        // Executa a exclusão do Categoria
        await deleteCategoriaUseCase.execute({ id });

    } catch (err) {
        if (err instanceof ResourseNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        throw err;
    }

    // Retorno de sucesso sem conteúdo
    return reply.status(204).send();
}
