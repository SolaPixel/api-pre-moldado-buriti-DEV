import { Devolucao, Prisma } from "@prisma/client";

export interface DevolucoesRepository {
    findById(id: string): Promise<Devolucao | null>; //para buscar um Devolucao por id
    create(data: Prisma.DevolucaoUncheckedCreateInput): Promise<Devolucao>; //adicionar Devolucaos no banco de dados
    update(id: string, data: Prisma.DevolucaoUncheckedUpdateInput): Promise<Devolucao>; //método para atualização
    delete(id: string): Promise<void>
}