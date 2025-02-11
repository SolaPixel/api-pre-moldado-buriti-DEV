import { LotesRepository } from "@/repositories/lotes-repository";
import { Lote, Produto } from "@prisma/client";
import { LoteAlreadyExistsError } from "./errors/lote-already-exists";
import { ResourseNotFoundError } from "./errors/resourse-not-found-error";
import { ProdutosRepository } from "@/repositories/produtos-repository";

//para tipar parametro do execute com todos os dados que virão para o caso de uso
interface UpdateLoteUseCaseRequest {
    id: string;
    numeracao?: string;
    quantAdquirida?: number;
    quantAtual?: number;
    dataAquisicao?: Date;
    valorGasto?: number;
    validade?: Date | null;
    produtoId: string
}

//tipando o retorno
interface UpdateLoteUseCaseResponse {
    lote: Lote;
    produto: Produto
}


//classe contendo caso de uso independente responsável por receber dados do controller 
// e encamhinhar para devidos repositórios
export class UpdateLoteUseCase {

    //construtor para receber repositório via parâmetro
    constructor(
        private lotesRepository: LotesRepository,
        private produtosRepository: ProdutosRepository
    ) { }



    //execução do caso de uso com suas devidas tipagens
    async execute({
        id,
        numeracao,
        quantAdquirida,
        quantAtual,
        dataAquisicao,
        valorGasto,
        validade,
        produtoId
    }: UpdateLoteUseCaseRequest): Promise<UpdateLoteUseCaseResponse> {


        // Busca o produto pelo ID
        const lote = await this.lotesRepository.findById(id);

        if (!lote) {
            throw new ResourseNotFoundError();
        }



        if (numeracao && numeracao !== lote.numeracao) {
            // Verifica se a nova numeração já pertence a outro lote
            const loteWithSameNumeracao = await this.lotesRepository.findByNumeracao(numeracao, produtoId);

            if (loteWithSameNumeracao) {
                throw new LoteAlreadyExistsError();
            }
        }

        //caso tudo dê certo, função que vem do repositório para adicionar dados no banco
        const updateLote = await this.lotesRepository.update(id, {
            numeracao,
            quantAdquirida,
            quantAtual,
            dataAquisicao,
            valorGasto,
            validade,
        });

        // Atualiza o estoque do produto após a criação do lote
        const produto = await this.produtosRepository.atualizarQuantEstoque(produtoId);

        //devolvendo lote para possíveis testes
        return {
            lote: updateLote,
            produto
        };
    }

}