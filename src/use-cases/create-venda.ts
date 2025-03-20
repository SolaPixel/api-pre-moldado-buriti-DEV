import { VendasRepository } from "@/repositories/vendas-repository";
import { Venda } from "@prisma/client";
import { VendaAlreadyExistsError } from "./errors/venda-already-exists";


//para tipar parametro do execute com todos os dados que virão para o caso de uso
interface CreateVendaUseCaseRequest {
    numeracao: string;
    orcamentoId: string,
    formaPagamento: string,
    parcelas: {
        valorParcela: number;
        dataVencimento: Date,
        dataPagamento: Date | null
    }[];
}

//tipando o retorno
interface CreateVendaUseCaseResponse {
    venda: Venda;
}

//classe contendo caso de uso independente responsável por receber dados do controller 
// e encamhinhar para devidos repositórios
export class CreateVendaUseCase {

    //construtor para receber repositório via parâmetro
    constructor(private vendasRepository: VendasRepository) { }

    //execução do caso de uso com suas devidas tipagens
    async execute({
        numeracao,
        orcamentoId,
        formaPagamento,
        parcelas

    }: CreateVendaUseCaseRequest): Promise<CreateVendaUseCaseResponse> {

        //encaminha venda para repositório geral para verificar possível numeração duplicada
        const vendaWithSameNumeracao = await this.vendasRepository.findByNumeracao(numeracao);

        if (vendaWithSameNumeracao) {
            throw new VendaAlreadyExistsError(); // Lança erro caso o venda já exista
        }

        //caso tudo dê certo, função que vem do repositório para adicionar venda no banco, incluindo parcelas
        const venda = await this.vendasRepository.create({
            numeracao,
            orcamentoId,
            formaPagamento: formaPagamento as any,
            parcelas: {
                create: parcelas.map(parcela => ({
                    valorParcela: parcela.valorParcela,
                    dataVencimento: parcela.dataVencimento,
                    dataPagamento: parcela.dataPagamento 
                })),
            },
        });

        

        //devolvendo venda para possíveis testes
        return {
            venda
        };
    }

}