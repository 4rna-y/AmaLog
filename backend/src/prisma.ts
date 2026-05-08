import { PrismaClient } from "./generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

const globalInst = global as unknown as { prisma: PrismaClient };

export const prisma = globalInst.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalInst.prisma = prisma;