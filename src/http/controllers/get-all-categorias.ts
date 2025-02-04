import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetAllCategoriasUseCase } from "@/use-cases/factories/make-get-all-categorias-use-case";

export async function getAllCategorias(request: FastifyRequest, reply: FastifyReply) {
    try {

        //instanciando repositório e use case da factory
        const getAllCategorias = makeGetAllCategoriasUseCase()

         // Executa o caso de uso para obter as categorias
         const { categorias } = await getAllCategorias.execute();

         //em caso de sucesso, lista todas as categorias
         return reply.status(200).send({ categorias });

    } catch (err) {
        throw err
    }
}
