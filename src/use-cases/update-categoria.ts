/* 
    Use case com D - Dependency Inversion Principle  
    caso de uso não comunica diretamente com dependência / repositório específico
*/

import { CategoriasRepository } from "@/repositories/categorias-repository"
import { CaregoriaAlreadyExistsError } from "./errors/categoria-already-exists"
import { Categoria } from "@prisma/client"
import { ResourseNotFoundError } from "./errors/resourse-not-found-error";

//para tipar parametro do execute com todos os dados que virão para o caso de uso
interface UpdateCategoriaUseCaseRequest {
    id: string,
    nome: string,
}

//tipando o retorno do use case
interface UpdateCategoriaUseCaseResponse {
    categoria: Categoria
}

//classe contendo caso de uso independente responsável por receber dados do controller e inserir no banco através de repositório declarado
export class UpdateCategoriaUseCase {

    //construtor com objetivo de receber dependêncas do controller, com tipagem dinâmica de repositório genérico
    constructor(private categoriasRepository: CategoriasRepository) { }

    async execute({ id, nome }: UpdateCategoriaUseCaseRequest): Promise<UpdateCategoriaUseCaseResponse> {

        // Busca o produto pelo ID
        const categoria = await this.categoriasRepository.findById(id);

        if (!categoria) {
            throw new ResourseNotFoundError();
        }


        // envia valor para repositório buscar no banco se há um registro "nome" com o mesmo valor, para validação
        const categoriaWithSameNome = await this.categoriasRepository.findByNome(nome)

        //caso haja um registro igual em "nome", retornar erro personalizado
        if (categoriaWithSameNome) {
            throw new CaregoriaAlreadyExistsError()
        }


        //encaminhado dados para o repositório declarado no construtor para registro definitivo do dado
        const updateCategoria = await this.categoriasRepository.update(id, {
            nome,
        })

        //devolvendo categoria para testes
        return {
            categoria: updateCategoria
        }

    }
}

