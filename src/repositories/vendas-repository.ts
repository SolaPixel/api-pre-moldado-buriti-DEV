import { Venda, Prisma } from "@prisma/client";

export interface VendasRepository {
    findById(id: string): Promise<Venda | null>; //para buscar um Venda por id
    findByNumeracao(numeracao: string): Promise<Venda | null>; //buscar um Venda pela numeração
    findAll(): Promise<Venda[]>; // listar todos os Vendas
    create(data: Prisma.VendaUncheckedCreateInput): Promise<Venda>; //adicionar Vendas no banco de dados
    update(id: string, data: Prisma.VendaUncheckedUpdateInput): Promise<Venda>; //método para atualização
    delete(id: string): Promise<void>
}