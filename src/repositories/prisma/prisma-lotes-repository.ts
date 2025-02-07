import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { LotesRepository } from "../lotes-repository";

export class PrismaLotesRepository implements LotesRepository {

    //inserir um lote no banco
    async create(data: Prisma.LoteUncheckedCreateInput) {
        const lote = await prisma.lote.create({
            data,
        });

        return lote
    }

    async findById(id: string) {
        const lote = await prisma.lote.findUnique({
            where: { id },
        });

        return lote
    }

    async findByNumeracao(numeracao: string, produtoId: string) {
        const lote = await prisma.lote.findFirst({
            where: {
                numeracao,
                produtoId
            },
        });

        return lote
    }

    async update(id: string, data: Prisma.LoteUncheckedUpdateInput) {
        const lote = await prisma.lote.update({
            where: { id },
            data,
        });

        return lote
    }


    async delete(id: string) {
        await prisma.lote.delete({ where: { id } });
    }

}
