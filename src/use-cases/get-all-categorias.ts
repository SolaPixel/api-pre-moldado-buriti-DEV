import { CategoriasRepository } from "@/repositories/categorias-repository"
import { Categoria } from "@prisma/client"

//classe com objetivo de listar todas as categoririas
export class GetAllCategorias {
    constructor(private categoriasRepository: CategoriasRepository) {} // recebe repositório do controller

    //solicida as categorias para o repositório e as armazena em variável
    async execute(): Promise<{categorias: Categoria[]}> {
        const categorias = await this.categoriasRepository.findAll()

        return {
            categorias
        }
    }
}