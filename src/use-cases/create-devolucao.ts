import { DevolucoesRepository } from "@/repositories/devolucoes-repository";
import { LotesRepository } from "@/repositories/lotes-repository";
import { Devolucao, Lote } from "@prisma/client";

interface CreateDevolucaoUseCaseRequest {
    vendaId: string,
    produtos: {
        produtoId: string,
        quantidade: number,
        valorReembolso: number
    }[];
}

interface CreateDevolucaoUseCaseResponse {
    devolucao: Devolucao;
    lotesAtualizados: Lote[];
}

export class CreateDevolucaoUseCase {
    constructor(
        private devolucoesRepository: DevolucoesRepository,
        private lotesRepository: LotesRepository
    ) {}

    async execute({
        vendaId,
        produtos
    }: CreateDevolucaoUseCaseRequest): Promise<CreateDevolucaoUseCaseResponse> {
        
        let lotesAtualizados: Lote[] = []; // Lista para armazenar os lotes atualizados

        // Para cada produto devolvido, adicionamos a quantidade ao lote mais recente
        for (const produto of produtos) {
            let quantidadeRestante = produto.quantidade;
            
            // Busca os lotes do produto ordenados do mais recente para o mais antigo (LIFO)
            const lotes = await this.lotesRepository.findByProduto(produto.produtoId);
            const lotesOrdenados = lotes.sort((a, b) => b.dataAquisicao.getTime() - a.dataAquisicao.getTime());
            
            for (const lote of lotesOrdenados) {
                if (quantidadeRestante <= 0) break;
                
                lote.quantAtual += quantidadeRestante;
                quantidadeRestante = 0;
                
                // Atualiza o lote no banco de dados
                const loteAtualizado = await this.lotesRepository.update(lote.id, { quantAtual: lote.quantAtual });
                lotesAtualizados.push(loteAtualizado);
            }
        }

        // Criação do registro de devolução
        const devolucao = await this.devolucoesRepository.create({
            vendaId,
            produtos: {
                create: produtos.map(produto => ({
                    produtoId: produto.produtoId,
                    quantidade: produto.quantidade,
                    valorReembolso: produto.valorReembolso
                })),
            },
        });

        return { devolucao, lotesAtualizados };
    }
}
