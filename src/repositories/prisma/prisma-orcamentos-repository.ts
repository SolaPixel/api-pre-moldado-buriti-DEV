// IMPLEMENTAÇÃO DO REPOSITÓRIO COM PRISMA
import { prisma } from "@/lib/prisma";
import { OrcamentosRepository } from "../orcamentos-repository";
import { Orcamento, Prisma } from "@prisma/client";

export class PrismaOrcamentosRepository implements OrcamentosRepository {
   
    

    
    async create(data: Prisma.OrcamentoUncheckedCreateInput) {
        const orcamento = await prisma.orcamento.create({
            data,
            include: {
                produtos: true
            }
        });
        return orcamento;
    }

    // listar produto por id
    async findById(id: string) {
        const orcamento = await prisma.orcamento.findUnique({
            where: { id },
            include: {  cliente: true, produtos: true }, // Inclui produtos e clientes na busca
        });
        return orcamento

        
    }

    async findByNumeracao(numeracao: string) {
        const orcamento = await prisma.orcamento.findUnique({
            where: { numeracao },
        });
        return orcamento;
    }

    async findAll() {
        return await prisma.orcamento.findMany({
            orderBy: { createdAt: 'desc' },
            include: { cliente: true, produtos: true }, // Retorna lote com cliente e produtos
        });
    }

    async update(id: string, data: Prisma.OrcamentoUncheckedUpdateInput) {
        const orcamento = await prisma.orcamento.update({
            where: { id },
            data,
            include: {
                produtos: true
            }
        });

        return orcamento
    }

    async updateSituacao(id: string, data: Prisma.OrcamentoUncheckedUpdateInput) {
        const orcamento = await prisma.orcamento.update({
            where: {id},
            data,
        })

        return orcamento
    }
}