import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { PrismaProdutosRepository } from "@/repositories/prisma/prisma-produtos-repository";
import { CreateProdutoUseCase } from "@/use-cases/create-produto";
import { ProdutoAlreadyExistsError } from "@/use-cases/errors/produto-already-exists";

// Controller para criar um novo produto
export async function createProduto(request: FastifyRequest, reply: FastifyReply) {
    // Validação dos dados com Zod
    const createProdutoBodySchema = z.object({
        numeracao: z.string().min(1, "A numeração é obrigatória."),
        nome: z.string().min(1, "O nome do produto é obrigatório."),
        descricao: z.string().optional(),
        categoriaId: z.string().optional(),
        unidadeMedida: z.enum(["METRICA", "UNITARIA"]), // Suporte a enum
        valorAtacado: z.number(),
        valorVarejo: z.number()
    });

    // Faz o parse e valida os dados recebidos
    const {
        numeracao,
        nome,
        descricao,
        categoriaId,
        unidadeMedida,
        valorAtacado,
        valorVarejo
    } = createProdutoBodySchema.parse(request.body);

    try {
        //instancia dos reposotórios
        const produtosRepository = new PrismaProdutosRepository();
        const createProdutoUseCase = new CreateProdutoUseCase(produtosRepository);

        // Executa o caso de uso para criar o produto
        await createProdutoUseCase.execute({
            numeracao,
            nome,
            descricao,
            categoriaId,
            unidadeMedida,
            valorAtacado,
            valorVarejo
        });

    } catch (err) {
        if (err instanceof ProdutoAlreadyExistsError) {
            return reply.status(409).send({ message: err.message });
        }

        throw err
    }

    //retorno caso tudo de certo
    return reply.status(201).send()
}