import { ProdutosRepository } from "@/repositories/produtos-repository";
import { Produto } from "@prisma/client";
import { ProdutoAlreadyExistsError } from "./errors/produto-already-exists";

//para tipar parametro do execute com todos os dados que virão para o caso de uso
interface CreateProdutoUseCaseRequest {
    numeracao: string;
    nome: string;
    descricao?: string;
    categoriaId?: string;
    unidadeMedida: string;
    valorAtacado: number;
    valorVarejo: number;
}

//tipando o retorno
interface CreateProdutoUseCaseResponse {
    produto: Produto;
}

//classe contendo caso de uso independente responsável por receber dados do controller 
// e encamhinhar para devidos repositórios
export class CreateProdutoUseCase {

    //construtor para receber repositório via parâmetro
    constructor(private produtosRepository: ProdutosRepository) { }

    //execução do caso de uso com suas devidas tipagens
    async execute({
        numeracao,
        nome,
        descricao,
        categoriaId,
        unidadeMedida,
        valorAtacado,
        valorVarejo,

    }: CreateProdutoUseCaseRequest): Promise<CreateProdutoUseCaseResponse> {

        //encaminha produto para repositório geral para verificar possível numeração duplicada
        const produtoWithSameNumeracao = await this.produtosRepository.findByNumeracao(numeracao);

        if (produtoWithSameNumeracao) {
            throw new ProdutoAlreadyExistsError(); // Lança erro caso o produto já exista
        }

        //caso tudo dê certo, função que vem do repositório para adicionar dados no banco
        const produto = await this.produtosRepository.create({
            numeracao,
            nome,
            descricao,
            categoriaId: categoriaId,
            unidadeMedida: unidadeMedida as any, // Conversão para ENUM,
            valorAtacado,
            valorVarejo,
        });

        //devolvendo produto para possíveis testes
        return {
            produto
        };
    }

}