import { ProdutosRepository } from "@/repositories/produtos-repository"
import { Produto, Lote, OrcamentoProduto, Orcamento } from "@prisma/client"

// Definição de um tipo que inclui os relacionamentos da tabela Produto
type ProdutoComRelacionamentos = Produto & {
    lotes: Lote[]; // Lista de lotes relacionados ao produto
    orcamentos: (OrcamentoProduto & { orcamento: Orcamento })[]; // Lista de produtos em orçamentos, incluindo o orçamento relacionado
};

export class GetAllProdutos {
    constructor(private produtosRepository: ProdutosRepository) {} 

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

            // Calcula o estoque disponível
            const quantEstoque = totalQuantAdquirida - totalQuantVendido;

            // Retorna o produto com os novos campos calculados
            return {
                ...produto,
                totalQuantAdquirida, 
                totalQuantVendido, 
                quantEstoque 
            };
        });

        return { produtos: produtosComEstoque }; // Retorna os produtos com os cálculos adicionais
    }
}
