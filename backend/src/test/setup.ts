import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";

const testDatabaseUrl = process.env.DATABASE_URL || "postgresql://user:postgres@db:5432/mydb_test";
process.env.DATABASE_URL = testDatabaseUrl;

export const testPrisma = new PrismaClient({
    datasources: {
        db: {
            url: testDatabaseUrl
        }
    }
});

export async function setupTestDatabase() {
    try {
        execSync(`cd /workspace/backend && DATABASE_URL=${testDatabaseUrl} bunx prisma db push --skip-generate`, {
            stdio: "inherit"
        });
        console.log("Test database setup completed");
    } catch (error) {
        console.error("Failed to setup test database:", error);
        throw error;
    }
}

export async function cleanupTestDatabase() {
    try {
        await testPrisma.blogUpdateContent.deleteMany();
        await testPrisma.blogUpdate.deleteMany();
        await testPrisma.blog.deleteMany();
        await testPrisma.contact.deleteMany();
        await testPrisma.keyValuePair.deleteMany();
        await testPrisma.repository.deleteMany();
        console.log("Test database cleaned up");
    } catch (error) {
        console.error("Failed to cleanup test database:", error);
        throw error;
    }
}

export async function disconnectTestDatabase() {
    await testPrisma.$disconnect();
}
