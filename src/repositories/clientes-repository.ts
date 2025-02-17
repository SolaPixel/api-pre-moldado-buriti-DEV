import { Cliente, Prisma } from "@prisma/client";

export interface ClientesRepository {
    findById(id: string): Promise<Cliente | null>; //para buscar um cliente por id
    findByNome(nome: string): Promise<Cliente | null>; //buscar um cliente pelo nome
    findByCPF(cpf: string): Promise<Cliente | null> //buscar cliente pelo cpf
    findAll(): Promise<Cliente[]>; // listar todos os clientes
    create(data: Prisma.ClienteCreateInput): Promise<Cliente>; //adicionar cliente no banco de dados
    update(id: string, data: Prisma.ClienteUncheckedUpdateInput): Promise<Cliente>; //método para atualização
}