/* 
Arquivo dedicado exclusivamente a operações diretas no banco de 
dados envolvendo CATEGORIAS através do PRISMA 
*/

import { prisma } from "@/lib/prisma";
import { Categoria, Prisma } from "@prisma/client"; //método com tipagens personalizadas e automáticas do prisma
import { CategoriasRepository } from "../categorias-repository";

//classe com operações que utiliza métodos do repositório genérico e adiciona dado diretamente no banco
export class PrismaCategoriasRepository implements CategoriasRepository {

    //tipando "data" com tipagem personalizadda do prisma própria pro metodo create
    async create(data: Prisma.CategoriaCreateInput) {

        //insere o dado no banco e retorna categoria
        const categoria = await prisma.categoria.create({
            data,
        })

        return categoria
    }

    async findAll() {
        return await prisma.categoria.findMany({
            orderBy: { createdAt: 'desc' },
        })
    }

    async findById(id: string) {
        const categoria = await prisma.categoria.findUnique({
            where: { id },
        });

        return categoria
    }

    async findByNome(nome: string) {

        // busca no banco se há um registro "nome" com o mesmo valor, conforme repositório genérico
        const categoria = await prisma.categoria.findUnique({
            where: {
                nome
            }
        })

        return categoria
    }

    async update(id: string, data: Prisma.CategoriaUpdateInput) {

        const categoria = prisma.categoria.update({ where: { id }, data });

        return categoria
    }

    async delete(id: string){
        await prisma.categoria.delete({ where: { id } });
    }
    
}