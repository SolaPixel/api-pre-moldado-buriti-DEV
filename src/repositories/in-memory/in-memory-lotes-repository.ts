import { Lote, Prisma } from "@prisma/client";
import { LotesRepository } from "../lotes-repository";
import { randomUUID } from "node:crypto";

export class InMemoryLotesRepository implements LotesRepository {
    findByProduto(produtoId: string): Promise<Lote[]> {
        throw new Error("Method not implemented.");
    }
    update(id: string, data: Prisma.LoteUncheckedUpdateInput): Promise<Lote> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public items: Lote[] = [];

    async create(data: Prisma.LoteUncheckedCreateInput){
        const lote: Lote = {
            id: randomUUID(), // Gera um UUID
            numeracao: data.numeracao,
            quantAdquirida: data.quantAdquirida,
            quantAtual: data.quantAtual,
            dataAquisicao: new Date(data.dataAquisicao),
            valorGasto: new Prisma.Decimal(data.valorGasto as string | number), // Converte para Decimal
            validade: data.validade ? new Date(data.validade) : null,
            produtoId: data.produtoId,
        };

        this.items.push(lote);
        
        return lote;
    }

    findAll(): Promise<Lote[]> {
        throw new Error("Method not implemented.");
    }
   

    async findById(id: string): Promise<Lote | null> {
        return this.items.find((item) => item.id === id) || null;
    }

    async findByNumeracao(numeracao: string): Promise<Lote | null> {
        return this.items.find((item) => item.numeracao === numeracao) || null;
    }


    
}
