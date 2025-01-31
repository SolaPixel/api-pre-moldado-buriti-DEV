/* Arquivo com único objetivo de exportar plugins com rotas http declaradas */

import { register } from "./controllers/register";
import { FastifyInstance } from "fastify";

//função com rota post (instancia de fastify) com função de registrar categorias vindo de controller
export async function appRoutes(app: FastifyInstance) {
    app.post('/categorias', register)
}
