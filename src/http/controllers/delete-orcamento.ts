import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { ResourseNotFoundError } from "@/use-cases/errors/resourse-not-found-error";

import { PrismaOrcamentosRepository } from "@/repositories/prisma/prisma-orcamentos-repository"
import { DeleteOrcamentoUseCase } from "@/use-cases/delete-orcamento"; 
import { CannotToOperateOrcamentoAprovadoError } from "@/use-cases/errors/cannot-to-operate-orcameto-aprovado";


// Controller para deletar um lote
export async function deleteOrcamento(request: FastifyRequest, reply: FastifyReply) {
    // Validação do ID com Zod
    const deleteOrcamentoParamsSchema = z.object({
        id: z.string()
    });

    console.log(request.params)

    // Faz o parse e valida o parâmetro recebido
    const { id } = deleteOrcamentoParamsSchema.parse(request.params);

    

    try {
        // Instancia o caso de uso
        const orcamentosRepository = new PrismaOrcamentosRepository()
        const deleteOrcamentoUseCase = new DeleteOrcamentoUseCase(orcamentosRepository)

        // Executa a exclusão do lote
        await deleteOrcamentoUseCase.execute({ id });

    } catch (err) {

        if (err instanceof ResourseNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
    
        if (err instanceof CannotToOperateOrcamentoAprovadoError) {
            return reply.status(400).send({ message: err.message });
        }
    }

    // Retorno de sucesso sem conteúdo
    return reply.status(204).send();
}
