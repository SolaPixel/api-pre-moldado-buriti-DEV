import { OrcamentosRepository } from "@/repositories/orcamentos-repository";
import { LotesRepository } from "@/repositories/lotes-repository";
import { Orcamento, OrcamentoProduto, Lote } from "@prisma/client";
import { ResourseNotFoundError } from "./errors/resourse-not-found-error";

// Define um tipo que inclui os produtos dentro do orçamento
type OrcamentoComProdutos = Orcamento & {
    produtos: OrcamentoProduto[];
  };

// Interface que define os dados que serão passados para a atualização do orçamento
interface UpdateSituacaoOrcamentoUseCaseRequest {
    id: string, // ID do orçamento a ser atualizado
    situacao: string, // Nova situação do orçamento (CANCELADO, PENDENTE, APROVADO)
}

// Interface que define a resposta do caso de uso
interface UpdateSituacaoOrcamentoUseCaseResponse {
    orcamento: OrcamentoComProdutos
    lotesAtualizados: Lote[]; // Lista de lotes que tiveram suas quantidades ajustadas
}



// Classe responsável pela lógica de atualização do orçamento
export class UpdateSituacaoOrcamentoUseCase {
    constructor(
        private orcamentosRepository: OrcamentosRepository, // Repositório para manipulação dos orçamentos
        private lotesRepository: LotesRepository // Repositório para manipulação dos lotes
    ) { }

    async execute({
        id,
        situacao
    }: UpdateSituacaoOrcamentoUseCaseRequest): Promise<UpdateSituacaoOrcamentoUseCaseResponse> {

        // Busca o orçamento pelo ID no banco de dados
        const orcamento = await this.orcamentosRepository.findById(id) as OrcamentoComProdutos;
        
        
        if (!orcamento) {
            throw new ResourseNotFoundError(); // Lança erro caso o orçamento não seja encontrado
        }
        

        let lotesAtualizados: Lote[] = []; // Lista para armazenar os lotes modificados

      

        // **1ª Regra: Se a nova situação for "APROVADO" e antes não era, descontar estoque**
        if (situacao === "APROVADO") {
            for (const produto of orcamento.produtos) {
                let quantidadeRestante = produto.quantidade; // Quantidade a ser descontada dos lotes

                // Busca os lotes do produto ordenados do mais antigo para o mais novo (FIFO - First In, First Out)
                const lotes = await this.lotesRepository.findByProduto(produto.produtoId);
                const lotesOrdenados = lotes.sort((a, b) => a.dataAquisicao.getTime() - b.dataAquisicao.getTime());

                // Percorre os lotes até que toda a quantidade seja descontada
                for (const lote of lotesOrdenados) {
                    if (quantidadeRestante <= 0) break; // Se não há mais o que descontar, encerra o loop

                    if (lote.quantAtual >= quantidadeRestante) {
                        // O lote tem estoque suficiente para atender a quantidade necessária
                        lote.quantAtual -= quantidadeRestante;
                        quantidadeRestante = 0;
                    } else {
                        // O lote tem menos estoque do que o necessário, zera esse lote e desconta o restante nos próximos
                        quantidadeRestante -= lote.quantAtual;
                        lote.quantAtual = 0;
                    }

                    // Atualiza o lote no banco de dados
                    const loteAtualizado = await this.lotesRepository.update(lote.id, { quantAtual: lote.quantAtual });
                    lotesAtualizados.push(loteAtualizado); // Adiciona o lote atualizado à lista
                }

                // Se ainda restar quantidade a ser descontada, todos os lotes são zerados
                if (quantidadeRestante > 0) {
                    for (const lote of lotesAtualizados) {
                        await this.lotesRepository.update(lote.id, { quantAtual: 0 });
                    }
                    break;
                }
            }
        }

        // **2ª Regra: Se o orçamento era "APROVADO" e agora NÃO É MAIS, devolver estoque**
        if (orcamento.situacao === "APROVADO") {
            for (const produto of orcamento.produtos) {
                let quantidadeRestante = produto.quantidade; // Quantidade a ser devolvida ao estoque

                // Busca os lotes do produto ordenados do mais novo para o mais antigo (LIFO - Last In, First Out)
                const lotes = await this.lotesRepository.findByProduto(produto.produtoId);
                const lotesOrdenados = lotes.sort((a, b) => b.dataAquisicao.getTime() - a.dataAquisicao.getTime());

                // Percorre os lotes adicionando de volta a quantidade estornada
                for (const lote of lotesOrdenados) {
                    if (quantidadeRestante <= 0) break; // Se já devolveu tudo, encerra o loop

                    lote.quantAtual += quantidadeRestante;
                    quantidadeRestante = 0;

                    // Atualiza o lote no banco de dados
                    const loteAtualizado = await this.lotesRepository.update(lote.id, { quantAtual: lote.quantAtual });
                    lotesAtualizados.push(loteAtualizado); // Adiciona o lote atualizado à lista
                }
            }
        }

        // **Atualiza a situação do orçamento no banco de dados**
        const updatedOrcamento = await this.orcamentosRepository.update(id, {
            situacao: situacao as any // Atualiza apenas a situação do orçamento
        });

        // Retorna o orçamento atualizado e os lotes que sofreram alteração
        return { 
            orcamento: updatedOrcamento as OrcamentoComProdutos,
            lotesAtualizados
        };
    }
}
