/* arquivo dedicado à repositório remoto de categorias, próprio para testes  */

import { Categoria, Prisma } from "@prisma/client";
import { CategoriasRepository } from "../categorias-repository";

//classe com operações que utiliza do repositório genérico de categorias e adiciona dado em memória local
export class InMemoryCategoriasRepository implements CategoriasRepository {
   

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
            id: 'categoria-1',
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