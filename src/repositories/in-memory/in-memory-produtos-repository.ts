import { Produto, Prisma } from "@prisma/client";
import { ProdutosRepository } from "../produtos-repository";
import { randomUUID } from "node:crypto";

export class InMemoryProdutosRepository implements ProdutosRepository {

    //array com dados salvos
    public items: Produto[] = []

    //função de adicionar objeto no array
    async create(data: Prisma.ProdutoUncheckedCreateInput){
        const produto: Produto = {
            id: randomUUID(),
            numeracao: data.numeracao,
            nome: data.nome,
            descricao: data.descricao ?? null,
            categoriaId: data.categoriaId ??  null, // Garantindo que seja uma string ou null
            unidadeMedida: data.unidadeMedida,
            valorAtacado: new Prisma.Decimal(data.valorAtacado as string | number), // Conversão explícita
            valorVarejo: new Prisma.Decimal(data.valorVarejo as string | number),   // Conversão explícita
        };

        //adicionndo categoria em memória
        this.items.push(produto)

        return produto
    }


    async findById(id: string) {
        const produto = this.items.find((item)=> item.id === id)

        if(!produto){
            return null
        }

        return produto
    }

    //buscar produto pela numeração
    async findByNumeracao(numeracao: string){
        const produto = this.items.find(item => item.numeracao === numeracao)

        if(!produto) {
            return null
        }

        return produto
    }

   

    findAll(): Promise<Produto[]> {
        throw new Error("Method not implemented.");
    }


}