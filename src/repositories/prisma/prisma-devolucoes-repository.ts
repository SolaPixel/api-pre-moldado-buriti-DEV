/* 
Arquivo dedicado exclusivamente a operações diretas no banco de 
dados envolvendo DevolucaoS através do PRISMA 
*/

import { prisma } from "@/lib/prisma";
import { Devolucao, Prisma } from "@prisma/client"; //método com tipagens personalizadas e automáticas do prisma
import { DevolucoesRepository } from "../devolucoes-repository";

//classe com operações que utiliza métodos do repositório genérico e adiciona dado diretamente no banco
export class PrismaDevolucoesRepository implements DevolucoesRepository {

    async create(data: Prisma.DevolucaoUncheckedCreateInput) {
        const devolucao = await prisma.devolucao.create({
            data,
        });

        return devolucao
    }

    findById(id: string): Promise<Devolucao | null> {
        throw new Error("Method not implemented.");
    }
    
    update(id: string, data: Prisma.DevolucaoUncheckedUpdateInput): Promise<Devolucao> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }


}