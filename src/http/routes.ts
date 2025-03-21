/* Arquivo com único objetivo de exportar plugins com rotas http declaradas */

import { createCategoria } from "./controllers/create-categoria";
import { FastifyInstance } from "fastify";
import { getAllCategorias } from "./controllers/get-all-categorias";
import { createProduto } from "./controllers/create-produto";
import { getAllProdutos } from "./controllers/get-all-produtos";
import { createLote } from "./controllers/create-lote";
import { getProdutosCategoria } from "./controllers/get-produtos-categoria";
import { updateLote } from "./controllers/update-lote";
import { deleteLote } from "./controllers/delete-lote";
import { updateCategoria } from "./controllers/update-categoria";
import { deleteCategoria } from "./controllers/delete-categoria";
import { getProduto } from "./controllers/get-produto";
import { updateProduto } from "./controllers/update-produto";
import { deleteProduto } from "./controllers/delete-produto";
import { getLotesProduto } from "./controllers/get-lotes-produto";
import { createCliente } from "./controllers/create-cliente";
import { createOrcamento } from "./controllers/create-orcamento";
import { updateOrcamento } from "./controllers/update-orcamento";
import { updateSituacaoOrcamento } from "./controllers/update-siruacao-orcamento";
import { getAllOrcamentos } from "./controllers/get-all-orcamentos";
import { deleteOrcamento } from "./controllers/delete-orcamento";
import { createVenda } from "./controllers/create-venda";
import { getAllVendas } from "./controllers/get-all-vendas";
import { createDevolucao } from "./controllers/create-devolucao";

//função responsável por instanciar rotas vindo de controller
export async function appRoutes(app: FastifyInstance) {

    app.get('/', async (request, reply) => {
        return { message: "Servidor está rodando!" };
    });

    app.post('/categorias', createCategoria)
    app.get('/allCategorias', getAllCategorias)
    app.put('/categoriaInfo', updateCategoria )
    app.delete('/categoria/:id', deleteCategoria )

    app.post('/produtos', createProduto)
    app.get('/allProdutos', getAllProdutos)
    app.get('/oneProduto/:produtoId', getProduto)
    app.get('/produtosCategoria/:categoriaId', getProdutosCategoria)
    app.put('/produtoInfo', updateProduto)
    app.delete('/produto/:id', deleteProduto)

    app.get('/lotesProduto/:produtoId', getLotesProduto)
    app.post('/lotes', createLote)
    app.put('/loteInfo', updateLote)
    app.delete('/lote/:id', deleteLote)

    app.post('/clientes', createCliente)

    app.post('/orcamentos', createOrcamento)
    app.get('/allOrcamentos', getAllOrcamentos)
    app.put('/orcamentoInfo', updateOrcamento)
    app.patch('/orcamentoSituacao', updateSituacaoOrcamento)
    app.delete('/orcamento/:id', deleteOrcamento)

    app.post('/vendas', createVenda)
    app.get('/allVendas', getAllVendas)

    app.post('/devolucoes', createDevolucao)

}
