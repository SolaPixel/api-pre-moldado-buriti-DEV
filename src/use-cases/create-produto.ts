import { ProdutosRepository } from "@/repositories/produtos-repository";
import { Produto } from "@prisma/client";
import { ProdutoAlreadyExistsError } from "./errors/produto-already-exists";

//para tipar o dado
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
    async execute(data: CreateProdutoUseCaseRequest): Promise<CreateProdutoUseCaseResponse> {

        //encaminha produto para repositório geral para verificar possível numeração duplicada
        const produtoWithSameNumeracao = await this.produtosRepository.findByNumeracao(data.numeracao);

        if (produtoWithSameNumeracao) {
            throw new ProdutoAlreadyExistsError(); // Lança erro caso o produto já exista
        }

        //caso tudo dê certo, função que vem do repositório para adicionar dados no banco
        const produto = await this.produtosRepository.create({
            numeracao: data.numeracao,
            nome: data.nome,
            descricao: data.descricao,
            categoria: data.categoriaId ? { connect: { id: data.categoriaId } } : undefined, // Se categoriaId não foi informado, atribui undefined
            unidadeMedida: data.unidadeMedida as any, // Conversão para ENUM
            valorAtacado: data.valorAtacado,
            valorVarejo: data.valorVarejo,
        });

        //devolvendo produto para possíveis testes
        return {
            produto
        };
    }

}