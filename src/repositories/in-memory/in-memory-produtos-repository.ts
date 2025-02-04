import { Produto, Prisma } from "@prisma/client";
import { ProdutosRepository } from "../produtos-repository";

export class InMemoryProdutosRepository implements ProdutosRepository {

    //array com dados salvos
    public items: Produto[] = []

    //função de adicionar objeto no array
    async create(data: Prisma.ProdutoCreateInput){
        const produto: Produto = {
            id: 'produto-1',
            numeracao: data.numeracao,
            nome: data.nome,
            descricao: data.descricao ?? null,
            categoriaId: data.categoria ? (data.categoria as any).connect?.id ?? null : null, // Garantindo que seja uma string ou null
            unidadeMedida: data.unidadeMedida,
            valorAtacado: new Prisma.Decimal(data.valorAtacado as string | number), // Conversão explícita
            valorVarejo: new Prisma.Decimal(data.valorVarejo as string | number),   // Conversão explícita
        };

        //adicionndo categoria em memória
        this.items.push(produto)

        return produto
    }


    findById(id: string): Promise<Produto | null> {
        throw new Error("Method not implemented.");
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