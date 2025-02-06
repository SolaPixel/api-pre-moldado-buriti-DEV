import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { LoteAlreadyExistsError } from "@/use-cases/errors/lote-already-exists";
import { makeCreateLoteUseCase } from "@/use-cases/factories/make-create-lote-use-case";

// Controller para criar um novo lote
export async function createLote(request: FastifyRequest, reply: FastifyReply) {
    // Validação dos dados com Zod
    const createLoteBodySchema = z.object({
        numeracao: z.string().min(1, "A numeração é obrigatória."),
        quantAdquirida: z.number(),
        quantAtual: z.number().optional(),
        dataAquisicao: z.union([z.string().transform((val) => new Date(val)), z.date()]),
        valorGasto: z.number(),
        validade: z.union([z.string().transform((val) => new Date(val)), z.date()]),
        produtoId: z.string()
    });
    

    // Faz o parse e valida os dados recebidos
    let {
        numeracao,
        quantAdquirida,
        quantAtual,
        dataAquisicao,
        valorGasto,
        validade,
        produtoId,
    } = createLoteBodySchema.parse(request.body);

    //faz com que quantAtual receba o valor padrão de quantAdiquirida caso a quantatual não seja informada
    if (quantAtual === undefined) {
        quantAtual = quantAdquirida;
    }

    try {
        //instancia dos reposotórios
        const createLoteUseCase = makeCreateLoteUseCase()

        // Executa o caso de uso para criar o lote
        await createLoteUseCase.execute({
            numeracao,
            quantAdquirida,
            quantAtual,
            dataAquisicao,
            valorGasto,
            validade,
            produtoId,
        });

    } catch (err) {

        if (err instanceof LoteAlreadyExistsError) {
            return reply.status(409).send({ message: err.message });
        }

        throw err
    }

    //retorno caso tudo de certo
    return reply.status(201).send()
}