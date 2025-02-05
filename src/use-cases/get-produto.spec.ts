import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryProdutosRepository } from '@/repositories/in-memory/in-memory-produtos-repository'
import { GetProdutoUseCase } from './get-produto'
import { ResourseNotFoundError } from './errors/resourse-not-found-error'

let produtosRepository: InMemoryProdutosRepository
let sut: GetProdutoUseCase

describe('Get produto use case', () => {

    beforeEach(()=>{
        
        produtosRepository = new InMemoryProdutosRepository()
        sut = new GetProdutoUseCase(produtosRepository)
    })

    //deve ser possível obter um produto
    it('shoud be able to get user profile', async () => {


        const createdProduto = await produtosRepository.create({
            numeracao: '222',
            nome: 'fafa',
            descricao: 'dasfdasf',
            unidadeMedida: 'METRICA',
            valorAtacado: 10,
            valorVarejo: 10
        })

        //campos que vem do sut (caso de uso) para teste
        const { produto } = await sut.execute({
            produtoId: createdProduto.id,
        })

        expect(produto.id).toEqual(expect.any(String))
        expect(produto.nome).toEqual('fafa')
    })

    //não deve ser possível listar produto com id não existente
    it('shoud not be able to get produto with false id', async () =>{
        await expect(()=>
        sut.execute({
            produtoId: 'non-existing',
        })).rejects.toBeInstanceOf(ResourseNotFoundError)
    })

})