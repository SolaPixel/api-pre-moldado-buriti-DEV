import { InMemoryCategoriasRepository } from '@/repositories/in-memory/in-memory-categorias-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateCategoriaUseCase } from './create-categoria'
import { CaregoriaAlreadyExistsError } from './errors/categoria-already-exists'

//criando variáveis globais tipadas com o devido dado
let categoriasRepository: InMemoryCategoriasRepository
let sut: CreateCategoriaUseCase

// testes unitários envolvendo requisitos e regras de caso de uso de criação de categoria
describe('Create Categoria Use Case', () => {

    // inicializa variáveis globais, instanciando o repositório de forma isolada em cada teste
    beforeEach(() => {
        //instanciando repositorio remoto de categoria e passando como parametro para o use case
        categoriasRepository = new InMemoryCategoriasRepository()

        // boa prática de nomear variável que representa caso de uso como "sut"
        sut = new CreateCategoriaUseCase(categoriasRepository)
    })


    //deve ser posível cadastrar uma categoria
    it('Should be able to register', async () => {

        //adicionando categoria pelo use case
        const { categoria } = await sut.execute({
            nome: 'Metálicos'
        })

        //verificando se criou uma categoria através da existencia de seu id
        expect(categoria.id).toEqual(expect.any(String))

    })

    // não deve ser possível cadastrar categorias com mesmo nome
    it('Should not be able to register with same nome twice', async () => {

        //cadastrando categoria
        const nome = 'metalicos'

        await sut.execute({
            nome,
        })

        //deve rejeitar, retornando erro apropriado 
        await expect(() => //deve ser utilizado await sempre que houver promisse no expect
            sut.execute({
                nome,
            }),
        ).rejects.toBeInstanceOf(CaregoriaAlreadyExistsError)

    })
})