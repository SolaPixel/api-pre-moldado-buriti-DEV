import { InMemoryProdutosRepository } from '@/repositories/in-memory/in-memory-produtos-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateProdutoUseCase } from './create-produto'
import { ProdutoAlreadyExistsError } from './errors/produto-already-exists'

//criando variáveis globais tipadas com o devido dado
let produtosRepository: InMemoryProdutosRepository
let sut: CreateProdutoUseCase

// testes unitários envolvendo requisitos e regras de caso de uso de criação de produtos
describe('Create Categoria Use Case', () => {

    // inicializa variáveis globais, instanciando o repositório de forma isolada em cada teste
    beforeEach(() => {
        //instanciando repositorio remoto de categoria e passando como parametro para o use case
        produtosRepository = new InMemoryProdutosRepository()

        // boa prática de nomear variável que representa caso de uso como "sut"
        sut = new CreateProdutoUseCase(produtosRepository)
    })


    //deve ser posível cadastrar um produto
    it('Should be able to register', async () => {

        //adicionando produto pelo use case
        const { produto } = await sut.execute({
            numeracao: '222',
            nome: 'fafd',
            descricao: 'dasfdasf',
            unidadeMedida: 'METRICA',
            valorAtacado: 10,
            valorVarejo: 10
        })

        //verificando se criou uma categoria através da existencia de seu id
        expect(produto.id).toEqual(expect.any(String))

    })

    // não deve ser possível cadastrar produtos com a mesma numeração
    it('Should not be able to register with same nome twice', async () => {

        //cadastrando categoria
        const numeracao = '5555'

        await sut.execute({
            numeracao,
            nome: 'fafd',
            descricao: 'dasfdasf',
            unidadeMedida: 'METRICA',
            valorAtacado: 10,
            valorVarejo: 10
        })

        //deve rejeitar, retornando erro apropriado 
        await expect(() => //deve ser utilizado await sempre que houver promisse no expect
            sut.execute({
                numeracao,
                nome: 'fafd',
                descricao: 'dasfdasf',
                unidadeMedida: 'METRICA',
                valorAtacado: 10,
                valorVarejo: 10
            }),
        ).rejects.toBeInstanceOf(ProdutoAlreadyExistsError)

    })
})