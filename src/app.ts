import fastify from "fastify"; // importando fastify
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";

export const app = fastify() // instanciando funções do fastify no objeto app

//ativação das rotas importadas
app.register(appRoutes)

//função que trata erros globais da aplicação
app.setErrorHandler((error, _request, reply )=>{

    //caso seja erro de validação zod
    if (error instanceof ZodError) {
        return reply
        .status(400)
        .send({ message: 'Validation error.', issues: error.format()})
    }

    // fazer log de erro caso ambiente não for produção
    if (env.NODE_ENV !== "production") {
        console.error(error)
    } else {
        // futuramente: fazer log para ferramente especializada
    }

    //caso seja um erro realmente desconhecido 
    return reply.status(500).send({message: 'Internal server error.'})
})