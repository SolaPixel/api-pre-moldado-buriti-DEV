import { InMemoryLotesRepository } from '@/repositories/in-memory/in-memory-lotes-repository';
import { InMemoryProdutosRepository } from '@/repositories/in-memory/in-memory-produtos-repository';
import { expect, describe, it, beforeEach } from 'vitest';
import { CreateLoteUseCase } from './create-lote';
import { LoteAlreadyExistsError } from './errors/lote-already-exists';
import { CreateProdutoUseCase } from './create-produto';

// Criando variáveis globais tipadas com os devidos repositórios
let lotesRepository: InMemoryLotesRepository;
let produtosRepository: InMemoryProdutosRepository;
let sut: CreateLoteUseCase;
let createProdutoUseCase: CreateProdutoUseCase;

describe('Create Lote Use Case', () => {
  
    beforeEach(() => {
        // Instancia os repositórios em memória
        lotesRepository = new InMemoryLotesRepository();
        produtosRepository = new InMemoryProdutosRepository();

        // Cria os casos de uso
        sut = new CreateLoteUseCase(lotesRepository, produtosRepository);
        createProdutoUseCase = new CreateProdutoUseCase(produtosRepository);
    });

    // Deve ser possível cadastrar um lote
    it('Should be able to register a lote', async () => {
        // Criando um produto antes de cadastrar um lote
        const { produto } = await createProdutoUseCase.execute({
            numeracao: 'P123',
            nome: 'Produto Teste',
            descricao: 'Descrição do produto',
            unidadeMedida: 'UNIDADE',
            valorAtacado: 20,
            valorVarejo: 25,
            quantEstoque: 0
        });

        // Criando o lote
        const { lote } = await sut.execute({
            numeracao: 'L001',
            quantAdquirida: 50,
            quantAtual: 50,
            dataAquisicao: new Date(),
            valorGasto: 500,
            produtoId: produto.id
        });

        // Verifica se o lote foi criado com sucesso
        expect(lote.id).toEqual(expect.any(String));
        expect(lote.produtoId).toEqual(produto.id);
    });

    // Não deve ser possível cadastrar um lote com a mesma numeração
    it('Should not be able to register a lote with the same numeracao', async () => {
        const { produto } = await createProdutoUseCase.execute({
            numeracao: 'P123',
            nome: 'Produto Teste',
            descricao: 'Descrição do produto',
            unidadeMedida: 'UNIDADE',
            valorAtacado: 20,
            valorVarejo: 25,
            quantEstoque: 0
        });

        const numeracao = 'L001';

        await sut.execute({
            numeracao,
            quantAdquirida: 50,
            quantAtual: 50,
            dataAquisicao: new Date(),
            valorGasto: 500,
            produtoId: produto.id
        });

        // Deve lançar um erro ao tentar cadastrar um lote com a mesma numeração
        await expect(() =>
            sut.execute({
                numeracao,
                quantAdquirida: 30,
                quantAtual: 30,
                dataAquisicao: new Date(),
                valorGasto: 300,
                produtoId: produto.id
            })
        ).rejects.toBeInstanceOf(LoteAlreadyExistsError);
    });

    // // Deve atualizar o estoque do produto ao adicionar um lote
    // it('Should update produto quantEstoque when adding a lote', async () => {
    //     // Criando um produto antes de cadastrar um lote
    //     const { produto } = await createProdutoUseCase.execute({
    //         numeracao: 'P123',
    //         nome: 'Produto Teste',
    //         descricao: 'Descrição do produto',
    //         unidadeMedida: 'UNIDADE',
    //         valorAtacado: 20,
    //         valorVarejo: 25,
    //         quantEstoque: 0
    //     });

    //     // Criando o primeiro lote
    //     await sut.execute({
    //         numeracao: 'L001',
    //         quantAdquirida: 50,
    //         quantAtual: 50,
    //         dataAquisicao: new Date(),
    //         valorGasto: 500,
    //         produtoId: produto.id
    //     });

    //     // Criando um segundo lote
    //     await sut.execute({
    //         numeracao: 'L002',
    //         quantAdquirida: 30,
    //         quantAtual: 30,
    //         dataAquisicao: new Date(),
    //         valorGasto: 300,
    //         produtoId: produto.id
    //     });

    //     // Busca o produto atualizado para verificar o estoque
    //     const updatedProduto = await produtosRepository.findById(produto.id);

    //     // O estoque total do produto deve ser a soma dos lotes (50 + 30 = 80)
    //     expect(updatedProduto?.quantEstoque).toEqual(80);
    // });

});
