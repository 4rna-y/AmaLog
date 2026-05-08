import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import { testPrisma, cleanupTestDatabase } from "./setup.js";

describe("Repository Service Tests", () => {
    const testRepoId = "test-repo-" + Date.now();

    beforeAll(async () => {
        await testPrisma.repository.deleteMany({
            where: { id: testRepoId }
        });
    });

    afterAll(async () => {
        await testPrisma.repository.deleteMany({
            where: { id: testRepoId }
        });
    });

    test("should create a new repository", async () => {
        const repository = await testPrisma.repository.create({
            data: {
                id: testRepoId,
                name: "Test Repository",
                isProduct: true,
                langs: ["typescript", "javascript"],
                content: "This is a test repository content."
            }
        });

        expect(repository).toBeDefined();
        expect(repository.id).toBe(testRepoId);
        expect(repository.name).toBe("Test Repository");
    });

    test("should read a repository", async () => {
        const repository = await testPrisma.repository.findUnique({
            where: { id: testRepoId }
        });

        expect(repository).not.toBeNull();
        expect(repository?.name).toBe("Test Repository");
    });

    test("should update repository basic fields", async () => {
        const updatedRepo = await testPrisma.repository.update({
            where: { id: testRepoId },
            data: {
                name: "Updated Repository Name",
                isProduct: false
            }
        });

        expect(updatedRepo.name).toBe("Updated Repository Name");
        expect(updatedRepo.isProduct).toBe(false);
    });

    test("should update repository content", async () => {
        const updatedRepo = await testPrisma.repository.update({
            where: { id: testRepoId },
            data: {
                content: "Updated test repository content."
            }
        });

        expect(updatedRepo.content).toBe("Updated test repository content.");
    });

    test("should find repositories by isProduct flag", async () => {
        const productRepos = await testPrisma.repository.findMany({
            where: { isProduct: false }
        });

        expect(productRepos.length).toBeGreaterThan(0);
        expect(productRepos.every(r => r.isProduct === false)).toBe(true);
    });

    test("should find repositories with specific language", async () => {
        const typescriptRepos = await testPrisma.repository.findMany({
            where: {
                langs: { has: "typescript" }
            }
        });

        expect(typescriptRepos.length).toBeGreaterThan(0);
        expect(typescriptRepos.every(r => r.langs.includes("typescript"))).toBe(true);
    });

    test("should get repository with select fields", async () => {
        const repository = await testPrisma.repository.findFirst({
            where: { id: testRepoId },
            select: {
                id: true,
                name: true
            }
        });

        expect(repository).toBeDefined();
        expect(Object.keys(repository as object)).toEqual(["id", "name"]);
    });

    test("should count repositories", async () => {
        const count = await testPrisma.repository.count({
            where: { id: testRepoId }
        });
        expect(count).toBe(1);
    });

    test("should delete a repository", async () => {
        await testPrisma.repository.delete({
            where: { id: testRepoId }
        });

        const deletedRepo = await testPrisma.repository.findUnique({
            where: { id: testRepoId }
        });

        expect(deletedRepo).toBeNull();
    });

    test("should find all repositories", async () => {
        const allRepos = await testPrisma.repository.findMany();
        expect(Array.isArray(allRepos)).toBe(true);
    });
});
