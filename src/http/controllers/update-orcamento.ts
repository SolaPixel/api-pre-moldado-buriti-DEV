import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { OrcamentoAlreadyExistsError } from "@/use-cases/errors/orcamento-already-exists";
import { makeUpdateOrcamentoUseCase } from "@/use-cases/factories/make-update-orcamento-use-case";

export async function updateOrcamento(request: FastifyRequest, reply: FastifyReply) {

    const updateOrcamentoBodySchema = z.object({
        id: z.string(),
        numeracao: z.string().optional(),
        clienteId: z.string().optional(),
        produtos: z.array(z.object({
            id: z.string(),
            produtoId: z.string().optional(),
            quantidade: z.number().optional(),
            modalidade: z.enum(["ATACADO", "VAREJO"]).optional(),
            valorUnitario: z.number().optional(),
            valorTotal: z.number().optional(),
        })).optional(),
        valorTotal: z.number().optional(),
        desconto: z.number().nullable().optional(),
        valorComDesconto: z.number().optional(),
    });

    const {
        id,
        numeracao,
        clienteId,
        produtos,
        valorTotal,
        desconto,
        valorComDesconto
    } = updateOrcamentoBodySchema.parse(request.body);

    try {
        const updateOrcamentoUseCase = makeUpdateOrcamentoUseCase();

        await updateOrcamentoUseCase.execute({
            id,
            numeracao,
            clienteId,
            produtos,
            valorTotal,
            desconto,
            valorComDesconto
        });

    } catch (err) {
        if (err instanceof OrcamentoAlreadyExistsError) {
            return reply.status(409).send({ message: err.message });
        }

        throw err;
    }

    return reply.status(201).send();
}