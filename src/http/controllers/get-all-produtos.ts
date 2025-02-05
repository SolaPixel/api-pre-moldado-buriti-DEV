import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetAllProdutosUseCase } from "@/use-cases/factories/make-get-all-produtos-use-case";

export async function getAllProdutos(request: FastifyRequest, reply: FastifyReply) {
    try {

        //instanciando repositório e use case da factory
        const getAllProdutos = makeGetAllProdutosUseCase()

         // Executa o caso de uso para obter as produtos
         const { produtos } = await getAllProdutos.execute();

         //em caso de sucesso, lista todas as produtos
         return reply.status(200).send({ produtos });

    } catch (err) {
        throw err
    }
}
