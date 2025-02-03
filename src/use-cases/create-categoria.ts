/* 
    Use case com D - Dependency Inversion Principle  
    caso de uso não comunica diretamente com dependência / repositório específico
*/

import { CategoriasRepository } from "@/repositories/categorias-repository"
import { CaregoriaAlreadyExistsError } from "./errors/categoria-already-exists"

//para tipar o dado
interface CreateCategoriaUseCaseRequest {
    nome: string,
}

//classe contendo caso de uso independente responsável por receber dados do controller e inserir no banco através de repositório declarado
export class CreateCategoriaUseCase {

    //construtor com objetivo de receber dependêncas do controller, com tipagem dinâmica de repositório genérico
    constructor(private categoriasRepository: CategoriasRepository) { }

    async execute({ nome }: CreateCategoriaUseCaseRequest) {

        // envia valor para repositório buscar no banco se há um registro "nome" com o mesmo valor, para validação
        const categoriaWithSameNome = await this.categoriasRepository.findByNome(nome)

        //caso haja um registro igual em "nome", retornar erro personalizado
        if (categoriaWithSameNome) {
            throw new CaregoriaAlreadyExistsError()
        }


        //encaminhado dados para o repositório declarado no construtor para registro definitivo do dado
        await this.categoriasRepository.create({
            nome,
        })

    }
}

