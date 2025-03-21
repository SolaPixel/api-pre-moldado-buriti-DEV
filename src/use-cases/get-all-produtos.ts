import { ProdutosRepository } from "@/repositories/produtos-repository"
import { Produto, Lote, OrcamentoProduto, Orcamento, Devolucao } from "@prisma/client"

// Definição de um tipo que inclui os relacionamentos da tabela Produto
type ProdutoComRelacionamentos = Produto & {
    lotes: Lote[]; // Lista de lotes relacionados ao produto
    orcamentos: (OrcamentoProduto & { orcamento: Orcamento })[]; // Lista de produtos em orçamentos, incluindo o orçamento relacionado
    devolucoes: Devolucao[]; // Lista de devoluções relacionadas ao produto
};

export class GetAllProdutos {
    constructor(private produtosRepository: ProdutosRepository) { }

    async execute(): Promise<{ produtos: ProdutoComRelacionamentos[] }> {
        // Busca os produtos no repositório, garantindo que os relacionamentos estejam incluídos
        const produtos = await this.produtosRepository.findAll() as ProdutoComRelacionamentos[];

        // Processa cada produto para calcular quantidades e estoque
        const produtosComEstoque = produtos.map(produto => {

            // Soma total de unidades adquiridas em todos os lotes do produto
            const totalQuantAdquirida = produto.lotes.reduce((total, lote) => total + lote.quantAdquirida, 0);

            // Soma total de unidades vendidas apenas dos orçamentos que foram aprovados
            const totalQuantVendido = produto.orcamentos
                .filter(op => op.orcamento.situacao === "APROVADO")
                .reduce((total, op) => total + op.quantidade, 0);

            // Soma total das devoluções do produto
            const totalDevolvido = produto.devolucoes.reduce((total, devolucao) => total + devolucao.quantidade, 0);

            // Calcula o estoque disponível
            const quantEstoque = totalQuantAdquirida - totalQuantVendido + totalDevolvido;

            // Retorna o produto com os novos campos calculados
            return {
                ...produto,
                totalQuantAdquirida,
                totalQuantVendido,
                totalDevolvido,
                quantEstoque
            };
        });

        return { produtos: produtosComEstoque }; // Retorna os produtos com os cálculos adicionais
    }
}
