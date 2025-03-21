import { PrismaVendasRepository } from "@/repositories/prisma/prisma-vendas-repository";
import { GetAllVendas } from "@/use-cases/get-all-vendas";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getAllVendas(request: FastifyRequest, reply: FastifyReply) {
    try {

        //instancia dos reposotórios
        const vendasRepository = new PrismaVendasRepository()
        const getVendaUseCase = new GetAllVendas(vendasRepository)

        // Executa o caso de uso para obter as vendas
        const { vendas } = await getVendaUseCase.execute();

        //em caso de sucesso, lista todas as vendas
        return reply.status(200).send({ vendas });

    } catch (err) {
        throw err
    }
}
