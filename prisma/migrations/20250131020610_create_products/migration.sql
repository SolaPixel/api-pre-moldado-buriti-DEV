-- CreateEnum
CREATE TYPE "UnidadeMedida" AS ENUM ('UNITARIA', 'METRICA');

-- CreateTable
CREATE TABLE "categorias" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" TEXT NOT NULL,
    "numeracao" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "categoriaId" TEXT,
    "unidadeMedida" "UnidadeMedida" NOT NULL,
    "valorAtacado" DECIMAL(10,2) NOT NULL,
    "valorVarejo" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lotes" (
    "id" TEXT NOT NULL,
    "numeracao" TEXT NOT NULL,
    "quantAdquirida" INTEGER NOT NULL,
    "quantAtual" INTEGER NOT NULL,
    "dataAquisicao" TIMESTAMP(3) NOT NULL,
    "valorGasto" DECIMAL(10,2) NOT NULL,
    "validade" TIMESTAMP(3),
    "produtoId" TEXT NOT NULL,

    CONSTRAINT "lotes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categorias_nome_key" ON "categorias"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "produtos_numeracao_key" ON "produtos"("numeracao");

-- CreateIndex
CREATE UNIQUE INDEX "lotes_numeracao_key" ON "lotes"("numeracao");

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lotes" ADD CONSTRAINT "lotes_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
