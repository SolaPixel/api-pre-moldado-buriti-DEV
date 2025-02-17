-- CreateEnum
CREATE TYPE "ModalidadeCompra" AS ENUM ('ATACADO', 'VAREJO');

-- CreateEnum
CREATE TYPE "SituacaoOrcamento" AS ENUM ('CANCELADO', 'PENDENTE', 'APROVADO');

-- CreateTable
CREATE TABLE "clientes" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "cpf" TEXT,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orcamentos" (
    "id" TEXT NOT NULL,
    "numeracao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modalidade" "ModalidadeCompra" NOT NULL,
    "clienteId" TEXT NOT NULL,
    "valorTotal" DECIMAL(10,2) NOT NULL,
    "desconto" DECIMAL(10,2),
    "valorComDesconto" DECIMAL(10,2) NOT NULL,
    "situacao" "SituacaoOrcamento" NOT NULL,

    CONSTRAINT "orcamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orcamento_produtos" (
    "id" TEXT NOT NULL,
    "orcamentoId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "modalidade" "ModalidadeCompra" NOT NULL,
    "valorUnitario" DECIMAL(10,2) NOT NULL,
    "valorTotal" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "orcamento_produtos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_cpf_key" ON "clientes"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "orcamentos_numeracao_key" ON "orcamentos"("numeracao");

-- AddForeignKey
ALTER TABLE "orcamentos" ADD CONSTRAINT "orcamentos_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orcamento_produtos" ADD CONSTRAINT "orcamento_produtos_orcamentoId_fkey" FOREIGN KEY ("orcamentoId") REFERENCES "orcamentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orcamento_produtos" ADD CONSTRAINT "orcamento_produtos_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
