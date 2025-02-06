/* Arquivo com único objetivo de exportar plugins com rotas http declaradas */

import { createCategoria } from "./controllers/create-categoria";
import { FastifyInstance } from "fastify";
import { getAllCategorias } from "./controllers/get-all-categorias";
import { createProduto } from "./controllers/create-produto";
import { getAllProdutos } from "./controllers/get-all-produtos";
import { createLote } from "./controllers/create-lote";
import { getProdutosCategoria } from "./controllers/get-produtos-categoria";

//função com rota post (instancia de fastify) com função de registrar categorias vindo de controller
export async function appRoutes(app: FastifyInstance) {

    app.post('/categorias', createCategoria)
    app.get('/allCategorias', getAllCategorias)

    app.post('/produtos', createProduto)
    app.get('/allProdutos', getAllProdutos)
    app.get('/produtosCategoria/:categoriaId', getProdutosCategoria)

    app.post('/lotes', createLote)
}
