import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeCreateDevolucaoUseCase } from "@/use-cases/factories/make-create-devolucao-use-case";
import { LoteDoNotExistsError } from "@/use-cases/errors/lote-do-not-exists";

export async function createDevolucao(request: FastifyRequest, reply: FastifyReply) {

    const createDevolucaoBodySchema = z.object({
        vendaId: z.string(),
        quantidade: z.number(),
        valorReembolso: z.number(),
        produtoId: z.string()
    });

    const {
        vendaId,
        quantidade,
        valorReembolso,
        produtoId
    } = createDevolucaoBodySchema.parse(request.body);

    try {
        const createDevolucaoUseCase = makeCreateDevolucaoUseCase();

        await createDevolucaoUseCase.execute({
            vendaId,
            quantidade,
            valorReembolso,
            produtoId
        });

    } catch (err) {

        if (err instanceof LoteDoNotExistsError) {
            return reply.status(400).send({ message: err.message });
        }
    }

    return reply.status(201).send();
}