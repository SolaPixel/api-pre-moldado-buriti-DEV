import { InMemoryCategoriasRepository } from '@/repositories/in-memory/in-memory-categorias-repository'
import { expect, describe, it } from 'vitest'
import { CreateCategoriaUseCase } from './create-categoria'
import { CaregoriaAlreadyExistsError } from './errors/categoria-already-exists'

// testes unitários envolvendo requisitos e regras de caso de uso de criação de categoria
describe('Create Categoria Use Case', () => {

    //deve ser posível cadastrar uma categoria
    it('Should be able to register', async () => {

        //instanciando repositorio remoto de categoria e passando como parametro para o use case
        const categoriasRepository = new InMemoryCategoriasRepository()
        const createCategoriaUseCase = new CreateCategoriaUseCase(categoriasRepository)

        //adicionando categoria pelo use case
        const { categoria } = await createCategoriaUseCase.execute({
            nome: 'Metálicos'
        })

        //verificando se criou uma categoria através da existencia de seu id
        expect(categoria.id).toEqual(expect.any(String))

    })

    // não deve ser possível cadastrar categorias com mesmo nome
    it('Should not be able to register with same nome twice', async () => {

        //instanciando repositorio remoto de categoria e passando como parametro para o use case
        const categoriasRepository = new InMemoryCategoriasRepository()
        const createCategoriaUseCase = new CreateCategoriaUseCase(categoriasRepository)

        //cadastrando categoria
        const nome = 'metalicos'

        await createCategoriaUseCase.execute({
            nome,
        })

        //deve rejeitar, retornando erro apropriado 
        await expect(() => //deve ser utilizado await sempre que houver promisse no expect
            createCategoriaUseCase.execute({
                nome,
            }),
        ).rejects.toBeInstanceOf(CaregoriaAlreadyExistsError)

    })
})