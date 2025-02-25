import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaOrcamentosRepository } from "@/repositories/prisma/prisma-orcamentos-repository"
import { GetAllOrcamentos } from "@/use-cases/get-all-orcamentos"; 

export async function getAllOrcamentos(request: FastifyRequest, reply: FastifyReply) {
    try {

        //instanciando repositório e use case (sem padrão make)
        const orcamentosRepository = new PrismaOrcamentosRepository()
        const getAllOrcamentos = new GetAllOrcamentos(orcamentosRepository)

         // Executa o caso de uso para obter as orcamentos
         const { orcamentos } = await getAllOrcamentos.execute();

         //em caso de sucesso, lista todas as orcamentos
         return reply.status(200).send({ orcamentos });

    } catch (err) {
        throw err
    }
}
