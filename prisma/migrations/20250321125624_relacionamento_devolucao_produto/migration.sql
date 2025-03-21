-- AddForeignKey
ALTER TABLE "devolucoes" ADD CONSTRAINT "devolucoes_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
