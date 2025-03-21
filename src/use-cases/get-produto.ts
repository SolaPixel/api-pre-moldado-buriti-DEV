import { ProdutosRepository } from "@/repositories/produtos-repository";
import { Produto, Lote, OrcamentoProduto, Orcamento, Devolucao } from "@prisma/client";
import { ResourseNotFoundError } from "./errors/resourse-not-found-error";

// Interface para tipar os parâmetros da requisição
interface GetProdutoUseCaseRequest {
    produtoId: string;
}

// Interface para tipar a resposta, incluindo os cálculos adicionais
interface GetProdutoUseCaseResponse {
    produto: ProdutoComEstoque;
}

// Definição de um tipo que inclui os relacionamentos da tabela Produto
type ProdutoComRelacionamentos = Produto & {
    lotes: Lote[]; // Lista de lotes do produto
    orcamentos: (OrcamentoProduto & { orcamento: Orcamento })[]; // Lista de produtos em orçamentos, incluindo os orçamentos relacionados
    devolucoes: Devolucao[];
};

// Tipo do retorno do produto com os cálculos adicionais
type ProdutoComEstoque = ProdutoComRelacionamentos & {
    totalQuantAdquirida: number;
    totalQuantVendido: number;
    quantEstoque: number;
};

// Classe do caso de uso para buscar um único produto
export class GetProdutoUseCase {
    constructor(private produtosRepository: ProdutosRepository) {} // Injeta o repositório de produtos

    async execute({ produtoId }: GetProdutoUseCaseRequest): Promise<GetProdutoUseCaseResponse> {
        // Busca o produto no repositório, garantindo que os relacionamentos estejam incluídos
        const produto = await this.produtosRepository.findById(produtoId) as ProdutoComRelacionamentos;

        // Caso o produto não seja encontrado, lança um erro
        if (!produto) {
            throw new ResourseNotFoundError();
        }

        // Calcula a quantidade total adquirida nos lotes do produto
        const totalQuantAdquirida = produto.lotes.reduce((total, lote) => total + lote.quantAdquirida, 0);

        // Calcula a quantidade total vendida considerando apenas orçamentos aprovados
        const totalQuantVendido = produto.orcamentos
            .filter(op => op.orcamento.situacao === "APROVADO") // Filtra apenas orçamentos aprovados
            .reduce((total, op) => total + op.quantidade, 0); // Soma as quantidades vendidas

         // Soma total das devoluções do produto
         const totalDevolvido = produto.devolucoes.reduce((total, devolucao) => total + devolucao.quantidade, 0);

        // Calcula a quantidade disponível em estoque
        const quantEstoque = totalQuantAdquirida - totalQuantVendido + totalDevolvido;

        // Retorna o produto com os novos campos calculados
        return {
            produto: {
                ...produto, // Mantém os dados originais do produto
                totalQuantAdquirida, // Adiciona o total adquirido
                totalQuantVendido, // Adiciona o total vendido
                quantEstoque // Adiciona a quantidade disponível em estoque
            }
        };
    }
}
