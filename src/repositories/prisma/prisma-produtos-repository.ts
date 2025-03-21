import { prisma } from "@/lib/prisma";
import { Produto, Prisma } from "@prisma/client";
import { ProdutosRepository } from "../produtos-repository";

export class PrismaProdutosRepository implements ProdutosRepository {

    //inserir produto no banco
    async create(data: Prisma.ProdutoCreateInput) {
        const produto = await prisma.produto.create({
            data,
        });

        return produto
    }

    //buscar todos os produtos
    // Buscar todos os produtos com soma de quantAdquirida dos lotes
    async findAll() {
        const produtos = await prisma.produto.findMany({
            orderBy: { createdAt: 'desc' },
            include: { 
                lotes: true, 
                categoria: true, 
                orcamentos: {
                    include: {
                        orcamento: true // Inclui os detalhes do orçamento relacionado
                    }
                },
                devolucoes: true
            }
        });
    
        return produtos
    }
    
    
    



    // listar produto por id
    async findById(id: string) {
        const produto = await prisma.produto.findUnique({
            where: { id },
            include: { 
                lotes: true, 
                categoria: true, 
                orcamentos: {
                    include: {
                        orcamento: true // Inclui os detalhes do orçamento relacionado
                    }
                },
                devolucoes: true
            }
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

    //listar por categoria
    async findByCategoria(categoriaId: string) {

        const produto = await prisma.produto.findMany({
            where: { categoriaId },
            orderBy: { createdAt: 'desc' },
            include: { 
                lotes: true, 
                categoria: true, 
                orcamentos: {
                    include: {
                        orcamento: true // Inclui os detalhes do orçamento relacionado
                    }
                },
                devolucoes: true
            }, // Inclui lotes e categoria na busca
        });

        return produto
    }

    async update(id: string, data: Prisma.ProdutoUncheckedUpdateInput) {
        const produto = await prisma.produto.update({
            where: { id },
            data,
        });

        return produto
    }

    // async atualizarQuantEstoque(produtoId: string) {
    //     const soma = await prisma.lote.aggregate({
    //         where: { produtoId },
    //         _sum: { quantAtual: true },
    //     });

    //     const produto = await prisma.produto.update({
    //         where: { id: produtoId },
    //         data: { quantEstoque: soma._sum.quantAtual || 0 },
    //     });

    //     return produto
    // }

    async delete(id: string) {
        await prisma.produto.delete({ where: { id } });
    }
}
