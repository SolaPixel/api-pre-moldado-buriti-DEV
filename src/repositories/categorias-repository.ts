/* 
    Repositório genérico (interface) das operações relacionadas à categorias.
    Dedicado a criação de interface para tipagem, regras de negócio comuns 
    à todos os repositórios específicos e inteligência de código em use case 

*/

import { Categoria, Prisma } from "@prisma/client";

export interface CategoriasRepository {
    //operações relacionadas à regras de negócio
    findByNome(nome: string): Promise<Categoria | null> // busca no repositório desejado se há um registro "nome" com o mesmo valor no banco
    findById(id: string): Promise<Categoria | null>; //para buscar um produto por id
    create(data: Prisma.CategoriaCreateInput): Promise<Categoria> // interface com promise contendo objeto que retorna do repositório
    update(id: string, data: Prisma.CategoriaUpdateInput): Promise<Categoria>; //método para atualização
    findAll(): Promise<Categoria[]>; //listar todas as categorias
    delete(id: string): Promise<void>
}
