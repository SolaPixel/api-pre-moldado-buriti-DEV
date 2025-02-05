import { Lote, Prisma } from "@prisma/client";

export interface LotesRepository {
    findById(id: string): Promise<Lote | null>; //para buscar um produto por id
    findByNumeracao(numeracao: string): Promise<Lote | null>; //buscar um produto pela numeração
    create(data: Prisma.LoteUncheckedCreateInput): Promise<Lote>; //adicionar produtos no banco de dados
    findAll(): Promise<Lote[]>; // listar todos os produtos
}