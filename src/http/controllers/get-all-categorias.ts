import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaCategoriasRepository } from '@/repositories/prisma/prisma-categorias-repository'
import { GetAllCategorias } from "@/use-cases/get-all-categorias";

export async function getAllCategorias(request: FastifyRequest, reply: FastifyReply) {
    try {

        //instanciando repositório para o caso de uso
        const categoriasRepository = new PrismaCategoriasRepository()
        const getAllCategorias = new GetAllCategorias(categoriasRepository)

         // Executa o caso de uso para obter as categorias
         const { categorias } = await getAllCategorias.execute();

         //em caso de sucesso, lista todas as categorias
         return reply.status(200).send({ categorias });

    } catch (err) {
        throw err
    }
}
