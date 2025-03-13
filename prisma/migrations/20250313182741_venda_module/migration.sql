-- CreateEnum
CREATE TYPE "FormaPagamento" AS ENUM ('AVISTA', 'APRAZO');

-- CreateTable
CREATE TABLE "vendas" (
    "id" TEXT NOT NULL,
    "numeracao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orcamentoId" TEXT NOT NULL,
    "formaPagamento" "FormaPagamento" NOT NULL,

    CONSTRAINT "vendas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parcelas" (
    "id" TEXT NOT NULL,
    "vendaId" TEXT NOT NULL,
    "valorParcela" DECIMAL(10,2) NOT NULL,
    "dataVencimento" TIMESTAMP(3) NOT NULL,
    "dataPagamento" TIMESTAMP(3),

    CONSTRAINT "parcelas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "devolucoes" (
    "id" TEXT NOT NULL,
    "vendaId" TEXT NOT NULL,

    CONSTRAINT "devolucoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "devolucao_produtos" (
    "id" TEXT NOT NULL,
    "devolucaoId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "valorReembolso" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "devolucao_produtos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vendas_numeracao_key" ON "vendas"("numeracao");

-- CreateIndex
CREATE UNIQUE INDEX "vendas_orcamentoId_key" ON "vendas"("orcamentoId");

-- AddForeignKey
ALTER TABLE "vendas" ADD CONSTRAINT "vendas_orcamentoId_fkey" FOREIGN KEY ("orcamentoId") REFERENCES "orcamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parcelas" ADD CONSTRAINT "parcelas_vendaId_fkey" FOREIGN KEY ("vendaId") REFERENCES "vendas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devolucoes" ADD CONSTRAINT "devolucoes_vendaId_fkey" FOREIGN KEY ("vendaId") REFERENCES "vendas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devolucao_produtos" ADD CONSTRAINT "devolucao_produtos_devolucaoId_fkey" FOREIGN KEY ("devolucaoId") REFERENCES "devolucoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devolucao_produtos" ADD CONSTRAINT "devolucao_produtos_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "orcamento_produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
