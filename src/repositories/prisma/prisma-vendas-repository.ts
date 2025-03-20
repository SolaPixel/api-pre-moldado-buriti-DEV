/* 
Arquivo dedicado exclusivamente a operações diretas no banco de 
dados envolvendo VendaS através do PRISMA 
*/

import { prisma } from "@/lib/prisma";
import { Venda, Prisma } from "@prisma/client"; //método com tipagens personalizadas e automáticas do prisma
import { VendasRepository } from "../vendas-repository";

//classe com operações que utiliza métodos do repositório genérico e adiciona dado diretamente no banco
export class PrismaVendasRepository implements VendasRepository {

    async create(data: Prisma.VendaUncheckedCreateInput) {
        const venda = await prisma.venda.create({
            data,
            include: {
                parcelas: true
            }
        });

        return venda
    }


    findById(id: string): Promise<Venda | null> {
        throw new Error("Method not implemented.");
    }

    //buscar venda por numeração
    async findByNumeracao(numeracao: string) {

        const venda = await prisma.venda.findUnique({
            where: {
                numeracao
            },
        });

        return venda

    }


    async findAll() {
        return await prisma.venda.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                orcamento: true,
                devolucoes: true,
                parcelas: true
            }, 
        });
    }

    update(id: string, data: Prisma.VendaUncheckedUpdateInput): Promise<Venda> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }



}