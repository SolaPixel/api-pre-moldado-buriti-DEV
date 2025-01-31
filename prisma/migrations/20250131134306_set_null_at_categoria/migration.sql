-- DropForeignKey
ALTER TABLE "produtos" DROP CONSTRAINT "produtos_categoriaId_fkey";

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE SET NULL ON UPDATE CASCADE;
