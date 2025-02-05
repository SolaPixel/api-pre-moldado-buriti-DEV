import { ProdutosRepository } from "@/repositories/produtos-repository";
import { Produto } from "@prisma/client";
import { ProdutoAlreadyExistsError } from "./errors/produto-already-exists";
import { ResourseNotFoundError } from "./errors/resourse-not-found-error";

// Tipagem da requisição para edição do produto
interface UpdateProdutoUseCaseRequest {
    id: string;
    numeracao?: string;
    nome?: string;
    descricao?: string;
    categoriaId?: string;
    unidadeMedida?: string;
    valorAtacado?: number;
    valorVarejo?: number;
    quantEstoque?: number;
}

// Tipagem do retorno da atualização do produto
interface UpdateProdutoUseCaseResponse {
    produto: Produto;
}

// Classe responsável pelo caso de uso de edição do produto
export class UpdateProdutoUseCase {
    constructor(private produtosRepository: ProdutosRepository) { }

    async execute({
        id,
        numeracao,
        nome,
        descricao,
        categoriaId,
        unidadeMedida,
        valorAtacado,
        valorVarejo,
        quantEstoque,
    }: UpdateProdutoUseCaseRequest): Promise<UpdateProdutoUseCaseResponse> {

        // Busca o produto pelo ID
        const produto = await this.produtosRepository.findById(id);

        if (!produto) {
            throw new ResourseNotFoundError();
        }


        if (numeracao) {
            // Verifica se a nova numeração já pertence a outro produto
            const produtoWithSameNumeracao = await this.produtosRepository.findByNumeracao(numeracao);

            if (produtoWithSameNumeracao && produtoWithSameNumeracao.id !== id) {
                throw new ProdutoAlreadyExistsError();
            }
        }


        // Atualiza os dados do produto
        const updatedProduto = await this.produtosRepository.update(id, {
            numeracao,
            nome,
            descricao,
            categoriaId,
            unidadeMedida: unidadeMedida as any, // Conversão para ENUM
            valorAtacado,
            valorVarejo,
            quantEstoque
        });

        return { produto: updatedProduto };
    }
}
