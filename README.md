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


## RNs

- [x] Não se pode cadastrar um produto com numeração duplicada
- [x] Não deve ser possível cadastrar duas ou mais categorias com o mesmo nome
- [x] Cada registro de produto deve obter um campo "estoque" somando a quantidade cadastrada em cada lote
- [x] Não se pode cadastrar um lote com numeração duplicada
- [x] Ao cadastrar um lote, o campo "quantAtual" deve ser igual a quantInicial 

## RNFs

- [x] Os dados da aplicação precisam estar persistidos em um banco postgreSQL
- [ ] Toda entidade será listada por ordem de numeração
- [ ] Todos os casos de uso deverão ser acessados via requisição http
- [ ] Todos os casos de uso deverão receber testes unitários recebendo repositórios em meória como parâmetros
