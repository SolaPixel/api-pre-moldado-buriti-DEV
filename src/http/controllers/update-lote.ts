import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { LoteAlreadyExistsError } from "@/use-cases/errors/lote-already-exists";
import { makeUpdateLoteUseCase } from "@/use-cases/factories/make-update-lote-use-case";

// Controller para criar um novo lote
export async function updateLote(request: FastifyRequest, reply: FastifyReply) {
    // Validação dos dados com Zod
    const updateLoteBodySchema = z.object({
        id: z.string(),
        numeracao: z.string().optional(),
        quantAdquirida: z.number().optional(),
        quantAtual: z.number().optional(),
        dataAquisicao: z.union([z.string().transform((val) => new Date(val)), z.date()]).optional(),
        valorGasto: z.number().optional(),
        validade: z.union([z.string().transform((val) => new Date(val)), z.date()]).optional().nullable(),
        produtoId: z.string()
    });
    

    // Faz o parse e valida os dados recebidos
    const {
        id,
        numeracao,
        quantAdquirida,
        quantAtual,
        dataAquisicao,
        valorGasto,
        validade,
        produtoId,
    } = updateLoteBodySchema.parse(request.body);


    try {
        //instancia dos reposotórios
        const updateLoteUseCase = makeUpdateLoteUseCase()

        // Executa o caso de uso para criar o lote
        await updateLoteUseCase.execute({
            id,
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
    return reply.status(204).send()
}