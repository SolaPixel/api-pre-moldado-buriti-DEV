import { prisma } from "@/lib/prisma";
import { Produto, Prisma, Lote } from "@prisma/client";
import { LotesRepository } from "../lotes-repository";

export class PrismaLotesRepository implements LotesRepository {

    findById(id: string): Promise<Lote | null> {
        throw new Error("Method not implemented.");
    }

    async findByNumeracao(numeracao: string) {
        const lote = await prisma.lote.findUnique({
            where: {
                numeracao
            },
        });

        return lote
    }

    //inserir um lote no banco
    async create(data: Prisma.LoteUncheckedCreateInput) {
        const lote = await prisma.lote.create({
            data,
        });

        return lote
    }

    findAll(): Promise<Lote[]> {
        throw new Error("Method not implemented.");
    }
    



    
}
