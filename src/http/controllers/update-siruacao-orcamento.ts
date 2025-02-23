import { ResourseNotFoundError } from "@/use-cases/errors/resourse-not-found-error";
import { makeUpdateSituacaoOrcamentoUseCase } from "@/use-cases/factories/make-update-situacao-orcamento-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function updateSituacaoOrcamento(request: FastifyRequest, reply: FastifyReply) {

    const updateOrcamentoBodySchema = z.object({
        id: z.string(),
        situacao: z.string()
    });

    const {
        id,
        situacao
    } = updateOrcamentoBodySchema.parse(request.body);

    try {
        const updateOrcamentoUseCase = makeUpdateSituacaoOrcamentoUseCase();

        await updateOrcamentoUseCase.execute({
            id,
            situacao
        });

    } catch (err) {
        if (err instanceof ResourseNotFoundError) {
            return reply.status(400).send({ message: err.message });
        }

        throw err;
    }

    return reply.status(204).send();
}