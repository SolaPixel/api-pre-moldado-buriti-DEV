import { ProdutosRepository } from "@/repositories/produtos-repository";
import { CategoriasRepository } from "@/repositories/categorias-repository";
import { Categoria, Produto, Lote, OrcamentoProduto, Orcamento } from "@prisma/client";
import { ResourseNotFoundError } from "./errors/resourse-not-found-error";

// Interface para tipar os parâmetros da requisição
interface GetProdutosCategoriaUseCaseRequest {
    categoriaId: string;
}

// Interface para tipar a resposta, incluindo os cálculos adicionais
interface GetProdutosCategoriaUseCaseResponse {
    produtos: ProdutoComEstoque[];
    categoria: Categoria;
}

// Definição de um tipo que inclui os relacionamentos da tabela Produto
type ProdutoComRelacionamentos = Produto & {
    lotes: Lote[]; // Lista de lotes do produto
    orcamentos: (OrcamentoProduto & { orcamento: Orcamento })[]; // Lista de produtos em orçamentos, incluindo os orçamentos relacionados
};

// Tipo do retorno do produto com os cálculos adicionais
type ProdutoComEstoque = ProdutoComRelacionamentos & {
    totalQuantAdquirida: number;
    totalQuantVendido: number;
    quantEstoque: number;
};

// Classe do caso de uso para buscar produtos de uma categoria
export class GetProdutosCategoriaUseCase {
    constructor(
        private produtosRepository: ProdutosRepository,
        private categoriasRepository: CategoriasRepository
    ) {}

    async execute({ categoriaId }: GetProdutosCategoriaUseCaseRequest): Promise<GetProdutosCategoriaUseCaseResponse> {
        // Busca a categoria no repositório
        const categoria = await this.categoriasRepository.findById(categoriaId);

        // Caso a categoria não seja encontrada, lança um erro
        if (!categoria) {
            throw new ResourseNotFoundError();
        }

        // Busca os produtos da categoria no repositório
        const produtos = await this.produtosRepository.findByCategoria(categoriaId) as ProdutoComRelacionamentos[];

        // Mapeia os produtos, adicionando os cálculos de estoque
        const produtosComEstoque = produtos.map(produto => {
            // Calcula a quantidade total adquirida nos lotes do produto
            const totalQuantAdquirida = produto.lotes.reduce((total, lote) => total + lote.quantAdquirida, 0);

            // Calcula a quantidade total vendida considerando apenas orçamentos aprovados
            const totalQuantVendido = produto.orcamentos
                .filter(op => op.orcamento.situacao === "APROVADO") // Filtra apenas orçamentos aprovados
                .reduce((total, op) => total + op.quantidade, 0); // Soma as quantidades vendidas

            // Calcula a quantidade disponível em estoque
            const quantEstoque = totalQuantAdquirida - totalQuantVendido;

            // Retorna o produto com os novos campos calculados
            return {
                ...produto, 
                totalQuantAdquirida, 
                totalQuantVendido, 
                quantEstoque
            };
        });

        // Retorna a lista de produtos com os cálculos e a categoria
        return {
            produtos: produtosComEstoque,
            categoria
        };
    }
}
