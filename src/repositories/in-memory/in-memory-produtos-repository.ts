import { Produto, Prisma } from "@prisma/client";
import { ProdutosRepository } from "../produtos-repository";
import { randomUUID } from "node:crypto";

export class InMemoryProdutosRepository implements ProdutosRepository {
    
    
    findByCategoria(categoriaId: string): Promise<Produto[]> {
        throw new Error("Method not implemented.");
    }
    
    
    // Atualizar a quantidade de estoque
    // Atualizar quantidade de estoque com base nos lotes
    async atualizarQuantEstoque(produtoId: string){
        // Como não estamos utilizando lotes diretamente, simulamos um cálculo de soma
        const produto = this.items.find((item) => item.id === produtoId);

        if (!produto) {
            throw new Error("Produto não encontrado.");
        }

        // A soma do estoque pode ser calculada diretamente no produto ou pela lógica de lotes
        // Aqui, vamos simular somando um valor fictício, pois lotes não estão presentes no repositório
        let somaEstoque = produto.quantEstoque; // Simulação de soma de quantidades de lotes

        // Simulando uma alteração no estoque (isso poderia ser calculado a partir dos lotes)
        produto.quantEstoque = somaEstoque;

        return produto;
    }
   
    

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
            quantEstoque: data.quantEstoque ?? 0
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

    async update(id: string, data: Partial<Produto>){

        const itemIndex = this.items.findIndex(item => item.id === id);

        this.items[itemIndex] = {
            ...this.items[itemIndex],
            ...data,
        };

        return this.items[itemIndex];
    }
   

    findAll(): Promise<Produto[]> {
        throw new Error("Method not implemented.");
    }


}