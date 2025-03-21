import { DevolucoesRepository } from "@/repositories/devolucoes-repository";
import { LotesRepository } from "@/repositories/lotes-repository";
import { Devolucao, Lote } from "@prisma/client";
import { LoteDoNotExistsError } from "./errors/lote-do-not-exists";

interface CreateDevolucaoUseCaseRequest {
    vendaId: string,
    quantidade: number,
    valorReembolso: number,
    produtoId: string // pegar id de produto primário
}

interface CreateDevolucaoUseCaseResponse {
    devolucao: Devolucao;
    loteAtualizado?: Lote;
}

export class CreateDevolucaoUseCase {
    constructor(
        private devolucoesRepository: DevolucoesRepository,
        private lotesRepository: LotesRepository
    ) {}

    async execute({
        vendaId,
        quantidade,
        valorReembolso,
        produtoId
    }: CreateDevolucaoUseCaseRequest): Promise<CreateDevolucaoUseCaseResponse> {


        // Buscar o lote mais recente do produto
        const loteMaisRecente = await this.lotesRepository.findMostRecentByProductId(produtoId);

        if (!loteMaisRecente) {
            throw new LoteDoNotExistsError()
        }

        // Atualizar a quantidade atual do lote
        const loteAtualizado = await this.lotesRepository.update(loteMaisRecente.id, {
            quantAtual: loteMaisRecente.quantAtual + quantidade,
        });

        // Criar o registro de devolução
        const devolucao = await this.devolucoesRepository.create({
            vendaId,
            quantidade,
            valorReembolso,
            produtoId
        });

        return { devolucao, loteAtualizado };
    }
}
