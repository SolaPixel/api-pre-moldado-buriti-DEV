import { prisma } from "@/lib/prisma";
import { Cliente, Prisma } from "@prisma/client";
import { ClientesRepository } from "../clientes-repository";

export class PrismaClientesRepository implements ClientesRepository {

    async create(data: Prisma.ClienteCreateInput) {
        const cliente = await prisma.cliente.create({
            data,
        });

        return cliente
    }

    findById(id: string): Promise<Cliente | null> {
        throw new Error("Method not implemented.");
    }

    async findByNome(nome: string) {

        // busca no banco se há um registro "nome" com o mesmo valor, conforme repositório genérico
        const cliente = await prisma.cliente.findFirst({
            where: {
                nome
            }
        })

        return cliente
    }

    async findByCPF(cpf: string){
        // busca no banco se há um registro "nome" com o mesmo valor, conforme repositório genérico
        const cliente = await prisma.cliente.findUnique({
            where: {
                cpf
            }
        })

        return cliente
    }

    
    findAll(): Promise<Cliente[]> {
        throw new Error("Method not implemented.");
    }
    
    update(id: string, data: Prisma.ClienteUncheckedUpdateInput): Promise<Cliente> {
        throw new Error("Method not implemented.");
    }


}