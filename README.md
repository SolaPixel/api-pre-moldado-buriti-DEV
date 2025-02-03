# App

Pré moldado Buriti App

## RFs

- [ ] Deve ser possível cadastrar um produto
- [x] Deve ser possível cadastrar uma categoria relacionada à algum produto 
- [ ] Deve ser possível obter todos os produtos cadastrados
- [ ] Deve ser possível obter todos os produtos cadastrados de uma única categoria
- [ ] Deve ser possível obter um único produto cadastrado
- [ ] Deve ser possível Excluir um produto
- [ ] Deve ser possível editar qualquer informação de um produto
- [ ] Deve ser possível editar e excluir uma categoria
- [ ] Deve ser possível cadastrar um ou mais lotes no estoque de um produto
- [ ] Deve ser possível editar e excluir um lote


## RNs

- [ ] Não se pode cadastrar um produto com numeração duplicada
- [x] Não deve ser possível cadastrar duas ou mais categorias com o mesmo nome
- [ ] A numeração do produto será sugerida automaticamente, e poderá ser auterada pelo usuário
- [ ] Não se pode cadastrar um lote com numeração duplicada

## RNFs

- [ ] Os dados da aplicação precisam estar persistidos em um banco postgreSQL
- [ ] Toda entidade será listada por ordem de numeração
- [ ] O campo "estoque" deve mostrar a quantidade total do produto somando todos os lotes cadastrados.