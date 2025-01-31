/*arquivo dedicado à conexão com o banco através do prisma*/

import { env } from "@/env";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
    log: env.NODE_ENV === 'dev' ? ['query'] : [], //mostrar no log das querys em ambiente de dev
})