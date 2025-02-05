import { Produto, Prisma } from "@prisma/client";

export interface ProdutosRepository {
    findById(id: string): Promise<Produto | null>; //para buscar um produto por id
    findByNumeracao(numeracao: string): Promise<Produto | null>; //buscar um produto pela numeração
    create(data: Prisma.ProdutoUncheckedCreateInput): Promise<Produto>; //adicionar produtos no banco de dados
    findAll(): Promise<Produto[]>; // listar todos os produtos
    update(id: string, data: Prisma.ProdutoUncheckedUpdateInput): Promise<Produto>; //método para atualização
    atualizarQuantEstoque(produtoId: string): Promise<Produto>
}