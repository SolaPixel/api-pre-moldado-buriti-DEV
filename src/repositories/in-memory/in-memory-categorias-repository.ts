/* arquivo dedicado à repositório remoto de categorias, próprio para testes  */

import { Categoria, Prisma } from "@prisma/client";
import { CategoriasRepository } from "../categorias-repository";
import { randomUUID } from "node:crypto";

//classe com operações que utiliza do repositório genérico de categorias e adiciona dado em memória local
export class InMemoryCategoriasRepository implements CategoriasRepository {
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }


    findById(id: string): Promise<Categoria | null> {
        throw new Error("Method not implemented.");
    }
    update(id: string, data: Prisma.CategoriaUpdateInput): Promise<Categoria> {
        throw new Error("Method not implemented.");
    }
   

    //array com dados salvos
    public items: Categoria[] = []

    //verifica se ja possui uma categoria com o mesmo nome
    async findByNome(nome: string) {
        const categoria = this.items.find(item => item.nome === nome)

        if(!categoria) {
            return null
        }

        return categoria
    }

    //método de criação de categoria instanciando tipagem do prista
    async create(data: Prisma.CategoriaCreateInput){
        const categoria = {
            id: randomUUID(),
            nome: data.nome,
        }

        //adicionndo categoria em memória
        this.items.push(categoria)

        return categoria
    }

    //método para listar todos os dados
    async findAll() {
        return this.items;
    }
}