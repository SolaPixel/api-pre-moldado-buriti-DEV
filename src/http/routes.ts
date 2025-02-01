/* Arquivo com único objetivo de exportar plugins com rotas http declaradas */

import { createCategoria } from "./controllers/create-categoria";
import { FastifyInstance } from "fastify";

//função com rota post (instancia de fastify) com função de registrar categorias vindo de controller
export async function appRoutes(app: FastifyInstance) {
    app.post('/categorias', createCategoria)
}
