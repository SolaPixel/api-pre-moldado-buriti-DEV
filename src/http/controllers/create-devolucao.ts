import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeCreateDevolucaoUseCase } from "@/use-cases/factories/make-create-devolucao-use-case";

export async function createDevolucao(request: FastifyRequest, reply: FastifyReply) {

    const createDevolucaoBodySchema = z.object({
        vendaId: z.string(),
        produtos: z.array(z.object({
            produtoId: z.string(),
            quantidade: z.number(),
            valorReembolso: z.number()
        })).nonempty("Deve haver pelo menos um produto."),
    });

    const {
        vendaId,
        produtos,
    } = createDevolucaoBodySchema.parse(request.body);

    try {
        const createDevolucaoUseCase = makeCreateDevolucaoUseCase();

        await createDevolucaoUseCase.execute({
            vendaId,
            produtos,
        });

    } catch (err) {
   
        throw err;
    }

    return reply.status(201).send();
}