import { prisma } from "@/lib/prisma";
import { Produto, Prisma } from "@prisma/client";
import { ProdutosRepository } from "../produtos-repository";

export class PrismaProdutosRepository implements ProdutosRepository {


    // listar produto por id
    async findById(id: string) {
        const produto = await prisma.produto.findUnique({
            where: { id },
            include: { lotes: true, categoria: true }, // Inclui lotes e categoria na busca
        });

        return produto
    }

    //buscar produto por numeração
    async findByNumeracao(numeracao: string) {

        const produto = await prisma.produto.findUnique({
            where: {
                numeracao
            },
        });

        return produto

    }

    //inserir produto no banco
    async create(data: Prisma.ProdutoCreateInput): Promise<Produto> {
        const produto = await prisma.produto.create({
            data,
        });

        return produto
    }

    //buscar todos os produtos
    async findAll(): Promise<Produto[]> {
        return await prisma.produto.findMany({
            include: { lotes: true, categoria: true }, // Retorna produtos com seus lotes e categoria
        });
    }
}
