import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { VendaAlreadyExistsError } from "@/use-cases/errors/venda-already-exists";
import { PrismaVendasRepository } from "@/repositories/prisma/prisma-vendas-repository";
import { CreateVendaUseCase } from "@/use-cases/create-venda";

// Controller para criar um novo venda
export async function createVenda(request: FastifyRequest, reply: FastifyReply) {
    // Validação dos dados com Zod
    const createVendaBodySchema = z.object({
        numeracao: z.string(),
        orcamentoId: z.string(),
        formaPagamento: z.string(),
        parcelas: z.array(z.object({
            valorParcela: z.number(),
            dataVencimento: z.union([z.string().transform((val) => new Date(val)), z.date()]),
            dataPagamento: z.union([z.string().transform((val) => new Date(val)), z.date()]).nullable(),
        })).nonempty("Deve haver pelo menos uma parcela."),
    });

    // Faz o parse e valida os dados recebidos
    const {
        numeracao,
        orcamentoId,
        formaPagamento,
        parcelas
    } = createVendaBodySchema.parse(request.body);

    try {
        //instancia dos reposotórios
         const vendasRepository = new PrismaVendasRepository()
        const createVendaUseCase = new CreateVendaUseCase(vendasRepository)

        // Executa o caso de uso para criar o venda
        await createVendaUseCase.execute({
            numeracao,
            orcamentoId,
            formaPagamento,
            parcelas
        });

    } catch (err) {
        if (err instanceof VendaAlreadyExistsError) {
            return reply.status(409).send({ message: err.message });
        }

        throw err
    }

    //retorno caso tudo de certo
    return reply.status(201).send()
}