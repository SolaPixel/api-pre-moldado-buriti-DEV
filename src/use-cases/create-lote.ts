import { LotesRepository } from "@/repositories/lotes-repository";
import { Lote } from "@prisma/client";
import { LoteAlreadyExistsError } from "./errors/lote-already-exists";

//para tipar parametro do execute com todos os dados que virão para o caso de uso
interface CreateLoteUseCaseRequest {
    numeracao: string;
    quantAdquirida: number;
    quantAtual: number;
    dataAquisicao: Date;
    valorGasto: number;
    validade: Date | null;
    produtoId: string;
}

//tipando o retorno
interface CreateLoteUseCaseResponse {
    lote: Lote;
}


//classe contendo caso de uso independente responsável por receber dados do controller 
// e encamhinhar para devidos repositórios
export class CreateLoteUseCase {

    //construtor para receber repositório via parâmetro
    constructor(
        private lotesRepository: LotesRepository,
        // private produtosRepository: ProdutosRepository
    ) { }

    //construtor para receber repositório via parâmetro
  

    //execução do caso de uso com suas devidas tipagens
    async execute({
        numeracao,
        quantAdquirida,
        quantAtual,
        dataAquisicao,
        valorGasto,
        validade,
        produtoId,
    }: CreateLoteUseCaseRequest): Promise<CreateLoteUseCaseResponse> {

        //encaminha lote para repositório geral para verificar possível numeração duplicada
        const loteWithSameNumeracao = await this.lotesRepository.findByNumeracao(numeracao, produtoId);

        if (loteWithSameNumeracao) {
            throw new LoteAlreadyExistsError(); // Lança erro caso o lote já exista
        }

        //caso tudo dê certo, função que vem do repositório para adicionar dados no banco
        const lote = await this.lotesRepository.create({
            numeracao,
            quantAdquirida,
            quantAtual,
            dataAquisicao,
            valorGasto,
            validade,
            produtoId,
        });

        // Atualiza o estoque do produto após a criação do lote
        // const produto = await this.produtosRepository.atualizarQuantEstoque(produtoId);

        //devolvendo lote para possíveis testes
        return {
            lote
        };
    }

}