import { Lote, Prisma } from "@prisma/client";

export interface LotesRepository {
    findById(id: string): Promise<Lote | null>; //para buscar um produto por id
    findByNumeracao(numeracao: string, produtoId: string): Promise<Lote | null>; //buscar um produto pela numeração
    findByProduto(produtoId: string): Promise<Lote[]>
    findMostRecentByProductId(produtoId: string): Promise<Lote | null>
    create(data: Prisma.LoteUncheckedCreateInput): Promise<Lote>; //adicionar produtos no banco de dados
    update(id: string, data: Prisma.LoteUncheckedUpdateInput): Promise<Lote>; //método para atualização
    delete(id: string): Promise<void>
}