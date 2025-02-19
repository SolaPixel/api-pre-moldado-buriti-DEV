import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { OrcamentoAlreadyExistsError } from "@/use-cases/errors/orcamento-already-exists";
import { makeCreateOrcamentoUseCase } from "@/use-cases/factories/make-create-orcamento-use-case";

export async function createOrcamento(request: FastifyRequest, reply: FastifyReply) {

    const createOrcamentoBodySchema = z.object({
        numeracao: z.string(),
        clienteId: z.string(),
        produtos: z.array(z.object({
            produtoId: z.string(),
            quantidade: z.number(),
            modalidade: z.enum(["ATACADO", "VAREJO"]),
            valorUnitario: z.number(),
            valorTotal: z.number(),
        })).nonempty("Deve haver pelo menos um produto."),
        valorTotal: z.number(),
        desconto: z.number().nullable(),
        valorComDesconto: z.number()
    });

    const {
        numeracao,
        clienteId,
        produtos,
        valorTotal,
        desconto,
        valorComDesconto
    } = createOrcamentoBodySchema.parse(request.body);

    try {
        const createOrcamentoUseCase = makeCreateOrcamentoUseCase();

        await createOrcamentoUseCase.execute({
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