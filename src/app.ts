import fastify from "fastify"; // importando fastify
import { appRoutes } from "./http/routes";

export const app = fastify() // instanciando funções do fastify no objeto app

//ativação das rotas importadas
app.register(appRoutes)