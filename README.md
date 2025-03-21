# App

Pré moldado Buriti App

## RFs

- [x] Deve ser possível cadastrar um produto
- [x] Deve ser possível cadastrar uma categoria relacionada à algum produto 
- [x] Deve ser possível obter todos os produtos cadastrados
- [x] Deve ser possível obter todos os produtos cadastrados de uma única categoria
- [x] Deve ser possível obter um único produto cadastrado
- [x] Deve ser possível Excluir um produto
- [x] Deve ser possível editar qualquer informação de um produto
- [x] Deve ser possível obter todas as categorias cadastradas
- [x] Deve ser possível editar e excluir uma categoria
- [x] Deve ser possível cadastrar um ou mais lotes no estoque de um produto
- [X] Deve ser possível obter todos os lotes de um produto
- [x] Deve ser possível editar e excluir um lote

- [x] Deve ser possível cadastrar um orçamento
- [x] Deve ser possível cadastrar um cliente
- [x] Deve ser possível obter todos os orçamentos
- [x] Deve ser possível alterar situação do orçamento
- [x] Deve ser possível editar ou excluir um orçamento 
- [ ] Deve ser possível salvar o orçamento em pdf, para assinatura do cliente e vendedor ||

- [x] Deve ser possível cadastrar uma venda
- [x] Deve ser possível cadastrar devoluções relacionadas a uma venda
- [x] Deve ser possível obter todas as vendas cadastradas
- [x] Deve ser possível obter todas as devoluções de uma venda



## RNs

- [x] Não se pode cadastrar um produto com numeração duplicada
- [x] Não deve ser possível cadastrar duas ou mais categorias com o mesmo nome
- [x] Cada registro de produto deve obter um campo "estoque" somando a quantidade cadastrada em cada lote
- [x] Não se pode cadastrar um lote com numeração duplicada relacionado a um mesmo produto

- [x] Deve ser possível selecionar um cliente previamente cadastrado durante o registro de um orçamento. 
- [x] Não deve ser possível cadastrar um orçamento com numeração duplicada
- [x] Ao aprovar um orçamento, a quantidade dos produtos inseridos devem ser descontados do estoque.
- [x] toda listagem de produto deve conter o total de unidades adquiridas em todos os lotes do produto
- [x] toda listagem de produto deve conter o total de unidades relacionadas aos orçamentos aprovados
- [x] toda listagem de produto deve conter a quantidade de estoque disponível
- [x] Não deve ser possível editar ou excluir um orçamento aprovado

- [x] O orçamento somente será aprovado junto com a criação de uma nova venda
- [x] Não deve ser possível cadastrar vendas com numeração duplicada
- [x] Não deve ser possível editar ou excluir uma venda
- [ ] a quantidade de produtos a serem devolvidos, não deve ultrapassar a quantidade adicionada ao orçamento ||
- [x] ao devolver um produto, a quantidade deve retornar ao seu estoque em seu lote mais recente
- [x] Não deve ser possível editar ou excluir o registro de uma devolução


## RNFs

- [x] Ao cadastrar um lote, o campo "quantAtual" deve ser igual a quantInicial 
- [x] Os dados da aplicação precisam estar persistidos em um banco postgreSQL
- [x] Todos os casos de uso referentes ao módulo de produtos deverão ser acessados via requisição http
- [ ] Todos os casos de uso deverão receber testes unitários recebendo repositórios em meória como parâmetros

- [X] Todos os casos de uso referentes ao módulo de orçamentos deverão ser acessados via requisição http

- [x] Todos os casos de uso referentes ao módulo de vendas deverão ser acessados via requisição http
