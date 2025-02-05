import { InMemoryProdutosRepository } from '@/repositories/in-memory/in-memory-produtos-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { UpdateProdutoUseCase } from './update-produto'
import { InMemoryCategoriasRepository } from '@/repositories/in-memory/in-memory-categorias-repository'
import { CreateProdutoUseCase } from './create-produto'
import { CreateCategoriaUseCase } from './create-categoria'
import { ResourseNotFoundError } from './errors/resourse-not-found-error'
import { ProdutoAlreadyExistsError } from './errors/produto-already-exists'

// Variáveis globais tipadas
let produtosRepository: InMemoryProdutosRepository
let sut: UpdateProdutoUseCase
let createProdutoUseCase: CreateProdutoUseCase

// Testes unitários para a atualização de produtos
describe('Update Produto Use Case', () => {

    // Inicializa as variáveis globais antes de cada teste
    beforeEach(() => {
        produtosRepository = new InMemoryProdutosRepository()
        sut = new UpdateProdutoUseCase(produtosRepository)
        createProdutoUseCase = new CreateProdutoUseCase(produtosRepository)
    })

    // Deve ser possível atualizar um produto existente
    it('Should be able to update a product', async () => {
        // Criando um produto inicial
        const { produto } = await createProdutoUseCase.execute({
            numeracao: '001',
            nome: 'Produto Original',
            descricao: 'Descrição original',
            unidadeMedida: 'UNITARIA',
            valorAtacado: 20,
            valorVarejo: 30,
            quantEstoque: 50
        })

        // Atualizando o produto
        const { produto: produtoAtualizado } = await sut.execute({
            id: produto.id,
            numeracao: '002',
            nome: 'Produto Atualizado',
            descricao: 'Nova descrição',
            unidadeMedida: 'METRICA',
            valorAtacado: 25,
            valorVarejo: 35,
            quantEstoque: 60
        })

        // Verificações
        expect(produtoAtualizado.numeracao).toBe('002')
        expect(produtoAtualizado.nome).toBe('Produto Atualizado')
        expect(produtoAtualizado.descricao).toBe('Nova descrição')
        expect(produtoAtualizado.valorAtacado).toBe(25)
        expect(produtoAtualizado.valorVarejo).toBe(35)
        expect(produtoAtualizado.quantEstoque).toBe(60)
    })

    // Não deve ser possível atualizar um produto inexistente
    it('Should not be able to update a non-existing product', async () => {
        await expect(() =>
            sut.execute({
                id: 'produto-inexistente',
                numeracao: '003',
                nome: 'Produto Inexistente',
                descricao: 'Tentativa de atualização',
                unidadeMedida: 'UNITARIA',
                valorAtacado: 15,
                valorVarejo: 25,
                quantEstoque: 40
            })
        ).rejects.toBeInstanceOf(ResourseNotFoundError)
    })

    // Deve ser possível atualizar um produto e vincular a uma nova categoria
    it('Should be able to update a product with a new category', async () => {
        // Criando repositório e use case de categoria
        const categoriasRepository = new InMemoryCategoriasRepository()
        const createCategoriaUseCase = new CreateCategoriaUseCase(categoriasRepository)

        // Criando categoria inicial
        const { categoria } = await createCategoriaUseCase.execute({ nome: 'Metálicos' })

        // Criando um produto inicial sem categoria
        const { produto } = await createProdutoUseCase.execute({
            numeracao: '004',
            nome: 'Produto Sem Categoria',
            descricao: 'Produto original',
            unidadeMedida: 'UNITARIA',
            valorAtacado: 10,
            valorVarejo: 20,
            quantEstoque: 30
        })

        // Atualizando o produto para associá-lo a uma categoria
        const { produto: produtoAtualizado } = await sut.execute({
            id: produto.id,
            categoriaId: categoria.id,
            nome: 'Produto com Categoria',
        })

        // Verificação
        expect(produtoAtualizado.categoriaId).toBe(categoria.id)
    })

    // Não deve ser possível atualizar a numeração de um produto para uma já existente
    it('Should not be able to update product numeracao to an existing one', async () => {
        // Criando dois produtos distintos
        const { produto: produto1 } = await createProdutoUseCase.execute({
            numeracao: '1001',
            nome: 'Produto A',
            descricao: 'Descrição A',
            unidadeMedida: 'UNITARIA',
            valorAtacado: 20,
            valorVarejo: 30,
            quantEstoque: 50
        })

        const { produto: produto2 } = await createProdutoUseCase.execute({
            numeracao: '1002',
            nome: 'Produto B',
            descricao: 'Descrição B',
            unidadeMedida: 'METRICA',
            valorAtacado: 25,
            valorVarejo: 35,
            quantEstoque: 60
        })

        // Tentativa de atualizar a numeração do produto2 para a numeração do produto1
        await expect(() =>
            sut.execute({
                id: produto2.id,
                numeracao: '1001', // Numeração já existente
            })
        ).rejects.toBeInstanceOf(ProdutoAlreadyExistsError)
    })

})
