import { PrismaClient } from "@prisma/client";

const globalInst = global as unknown as { prisma: PrismaClient };

export const prisma = globalInst.prisma || new PrismaClient();