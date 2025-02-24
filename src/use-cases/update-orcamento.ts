// CASO DE USO PARA CRIAÇÃO DE ORÇAMENTO
import { OrcamentosRepository } from "@/repositories/orcamentos-repository";
import { Orcamento } from "@prisma/client";
import { OrcamentoAlreadyExistsError } from "./errors/orcamento-already-exists";
import { ResourseNotFoundError } from "./errors/resourse-not-found-error";
import { CannotToOperateOrcamentoAprovadoError } from "./errors/cannot-to-operate-orcameto-aprovado";

interface UpdateOrcamentoUseCaseRequest {
    id: string,
    numeracao?: string;
    clienteId?: string;
    produtos?: {
        id?: string;
        produtoId?: string;
        quantidade?: number;
        modalidade?: "ATACADO" | "VAREJO";
        valorUnitario?: number;
        valorTotal?: number;
    }[];
    valorTotal?: number;
    desconto?: number | null,
    valorComDesconto?: number
}

interface UpdateOrcamentoUseCaseResponse {
    orcamento: Orcamento;
}

export class UpdateOrcamentoUseCase {
    constructor(private orcamentosRepository: OrcamentosRepository) { }

    async execute({
        id,
        numeracao,
        clienteId,
        produtos,
        valorTotal,
        desconto,
        valorComDesconto
    }: UpdateOrcamentoUseCaseRequest): Promise<UpdateOrcamentoUseCaseResponse> {

        const orcamento = await this.orcamentosRepository.findById(id);

        if (!orcamento) {
            throw new ResourseNotFoundError();
        }

        if (orcamento.situacao === "APROVADO") {
            throw new CannotToOperateOrcamentoAprovadoError()
        }

        if (numeracao) {

            const orcamentoWithSameNumeracao = await this.orcamentosRepository.findByNumeracao(numeracao);

            if (orcamentoWithSameNumeracao && orcamentoWithSameNumeracao.id !== id) {
                throw new OrcamentoAlreadyExistsError();
            }
        }


        const updatedOrcamento = await this.orcamentosRepository.update(id, {
            numeracao,
            clienteId,
            produtos: produtos ? {
                updateMany: produtos
                .filter(produto => produto.id)
                .map(produto => ({
                    where: { id: produto.id },
                    data: {
                        produtoId: produto.produtoId,
                        quantidade: produto.quantidade,
                        modalidade: produto.modalidade,
                        valorUnitario: produto.valorUnitario,
                        valorTotal: produto.valorTotal,
                    },
                })),
                create: produtos
                .filter(produto => !produto.id)
                .map(produto => ({
                    produtoId: produto.produtoId ?? "", // Garante que produtoId não seja undefined
                    quantidade: produto.quantidade ?? 0,
                    modalidade: produto.modalidade ?? "VAREJO",
                    valorUnitario: produto.valorUnitario ?? 0,
                    valorTotal: produto.valorTotal ?? 0,
                })),
            } : undefined,
            valorTotal,
            desconto,
            valorComDesconto,
        });

        return { orcamento: updatedOrcamento };
    }
}