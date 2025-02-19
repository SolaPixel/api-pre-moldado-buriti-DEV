// CASO DE USO PARA CRIAÇÃO DE ORÇAMENTO
import { OrcamentosRepository } from "@/repositories/orcamentos-repository";
import { Orcamento } from "@prisma/client";
import { OrcamentoAlreadyExistsError } from "./errors/orcamento-already-exists";

interface CreateOrcamentoUseCaseRequest {
    numeracao: string;
    clienteId: string;
    produtos: {
        produtoId: string;
        quantidade: number;
        modalidade: "ATACADO" | "VAREJO";
        valorUnitario: number;
        valorTotal: number;
    }[];
    valorTotal: number;
    desconto: number | null,
    valorComDesconto: number
}

interface CreateOrcamentoUseCaseResponse {
    orcamento: Orcamento;
}

export class CreateOrcamentoUseCase {
    constructor(private orcamentosRepository: OrcamentosRepository) {}

    async execute({
        numeracao,
        clienteId,
        produtos,
        valorTotal,
        desconto,
        valorComDesconto
    }: CreateOrcamentoUseCaseRequest): Promise<CreateOrcamentoUseCaseResponse> {

        const orcamentoWithSameNumeracao = await this.orcamentosRepository.findByNumeracao(numeracao);

        if (orcamentoWithSameNumeracao) {
            throw new OrcamentoAlreadyExistsError();
        }

       

        const orcamento = await this.orcamentosRepository.create({
            numeracao,
            clienteId,
            produtos: {
                create: produtos.map(produto => ({
                    produtoId: produto.produtoId,
                    quantidade: produto.quantidade,
                    modalidade: produto.modalidade,
                    valorUnitario: produto.valorUnitario,
                    valorTotal: produto.valorTotal,
                })),
            },
            valorTotal,
            desconto,
            valorComDesconto,
        });

        return { orcamento };
    }
}