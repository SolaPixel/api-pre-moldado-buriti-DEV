// REPOSITÓRIO DE ORÇAMENTOS
import { Orcamento, Prisma } from "@prisma/client";

export interface OrcamentosRepository {
    findById(id: string): Promise<Orcamento | null>; //para buscar um produto por id
    findByNumeracao(numeracao: string): Promise<Orcamento | null>; // Buscar orçamento pela numeração
    create(data: Prisma.OrcamentoUncheckedCreateInput): Promise<Orcamento>; // Criar um novo orçamento
    findAll(): Promise<Orcamento[]>; // listar todos os orçamentos
    update(id: string, data: Prisma.OrcamentoUncheckedUpdateInput): Promise<Orcamento>;
    updateSituacao(id: string, data: Prisma.OrcamentoUncheckedUpdateInput): Promise<Orcamento>
}