import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { ProdutoAlreadyExistsError } from "@/use-cases/errors/produto-already-exists";
import { makeUpdateProdutoUseCase } from "@/use-cases/factories/make-update-produto";


// Controller para criar um novo produto
export async function updateProduto(request: FastifyRequest, reply: FastifyReply) {
    // Validação dos dados com Zod
    const updateProdutoBodySchema = z.object({
        id: z.string(),
        numeracao: z.string().optional(),
        nome: z.string().optional(),
        descricao: z.string().nullable().optional(),
        categoriaId: z.string().nullable().optional(),
        unidadeMedida: z.enum(["METRICA", "UNITARIA"]).optional(),
        valorAtacado: z.number().optional(),
        valorVarejo: z.number().optional(),
    });


    // Faz o parse e valida os dados recebidos
    const {
        id,
        numeracao,
        nome,
        descricao,
        categoriaId,
        unidadeMedida,
        valorAtacado,
        valorVarejo,
    } = updateProdutoBodySchema.parse(request.body);


    try {
        //instancia dos reposotórios
        const updateProdutoUseCase = makeUpdateProdutoUseCase()

        // Executa o caso de uso para criar o Produto
        await updateProdutoUseCase.execute({
            id,
            numeracao,
            nome,
            descricao,
            categoriaId,
            unidadeMedida,
            valorAtacado,
            valorVarejo,
        });

    } catch (err) {

        if (err instanceof ProdutoAlreadyExistsError) {
            return reply.status(409).send({ message: err.message });
        }

        throw err
    }

    //retorno caso tudo de certo
    return reply.status(204).send()
}