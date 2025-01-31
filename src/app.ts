import fastify from "fastify"; // importando fastify
import { PrismaClient } from "@prisma/client";

export const app = fastify() // instanciando funções do fastify no objeto app

const prisma = new PrismaClient()


