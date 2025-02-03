/* 
    Repositório genérico (interface) das operações relacionadas à categorias.
    Dedicado a criação de interface para tipagem, regras de negócio comuns 
    à todos os repositórios específicos e inteligência de código em use case 

*/

import { Categoria, Prisma } from "@prisma/client";

export interface CategoriasRepository {
    //operações relacionadas à regras de negócio
    findByNome(nome: string): Promise<Categoria | null> // busca no repositório desejado se há um registro "nome" com o mesmo valor no banco
    create(data: Prisma.CategoriaCreateInput): Promise<Categoria> // interface com promise contendo objeto que retorna do repositório
    findAll(): Promise<Categoria[]>; //listar todas as categorias
}
