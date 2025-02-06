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

    //listar por categoria
    async findByCategoria(categoriaId: string) {

        const produto = await prisma.produto.findMany({
            where: { categoriaId },
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
    async create(data: Prisma.ProdutoCreateInput) {
        const produto = await prisma.produto.create({
            data,
        });

        return produto
    }

    //buscar todos os produtos
    async findAll() {
        return await prisma.produto.findMany({
            include: { lotes: true, categoria: true }, // Retorna produtos com seus lotes e categoria
        });
    }

    async update(id: string, data: Prisma.ProdutoUncheckedUpdateInput) {
        const produto =  await prisma.produto.update({
            where: { id },
            data,
        });

        return produto
    }

    async atualizarQuantEstoque(produtoId: string) {
        const soma = await prisma.lote.aggregate({
          where: { produtoId },
          _sum: { quantAtual: true },
        });
    
        const produto = await prisma.produto.update({
          where: { id: produtoId },
          data: { quantEstoque: soma._sum.quantAtual || 0 },
        });

        return produto
      }
}
