/*
  Warnings:

  - You are about to drop the `devolucao_produtos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `produtoId` to the `devolucoes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantidade` to the `devolucoes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorReembolso` to the `devolucoes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "devolucao_produtos" DROP CONSTRAINT "devolucao_produtos_devolucaoId_fkey";

-- AlterTable
ALTER TABLE "devolucoes" ADD COLUMN     "produtoId" TEXT NOT NULL,
ADD COLUMN     "quantidade" INTEGER NOT NULL,
ADD COLUMN     "valorReembolso" DECIMAL(10,2) NOT NULL;

-- DropTable
DROP TABLE "devolucao_produtos";
