import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import { testPrisma, cleanupTestDatabase } from "./setup";

describe("Repository Service Tests", () => {
    const testRepoId = "test-repo-" + Date.now();

    beforeAll(async () => {
        await testPrisma.repository.deleteMany({
            where: {
                id: {
                    startsWith: "test-repo"
                }
            }
        });
    });

    afterAll(async () => {
        await testPrisma.repository.deleteMany({
            where: {
                id: {
                    startsWith: "test-repo"
                }
            }
        });
    });

    test("should create a new repository", async () => {
        const repository = await testPrisma.repository.create({
            data: {
                id: testRepoId,
                name: "Test Repository",
                isProduct: true,
                langs: ["TypeScript", "JavaScript"],
                content: "# Test Repository\n\nLine 1 of content\n\nLine 2 of content"
            }
        });

        expect(repository).toBeDefined();
        expect(repository.id).toBe(testRepoId);
        expect(repository.name).toBe("Test Repository");
        expect(repository.isProduct).toBe(true);
        expect(repository.langs).toEqual(["TypeScript", "JavaScript"]);
        expect(repository.content).toBe("# Test Repository\n\nLine 1 of content\n\nLine 2 of content");
    });

    test("should read a repository", async () => {
        const repository = await testPrisma.repository.findUnique({
            where: { id: testRepoId }
        });

        expect(repository).not.toBeNull();
        expect(repository?.name).toBe("Test Repository");
        expect(repository?.isProduct).toBe(true);
    });

    test("should update repository basic fields", async () => {
        const updatedRepo = await testPrisma.repository.update({
            where: { id: testRepoId },
            data: {
                name: "Updated Repository Name",
                isProduct: false,
                langs: ["TypeScript", "Go", "Rust"]
            }
        });

        expect(updatedRepo.name).toBe("Updated Repository Name");
        expect(updatedRepo.isProduct).toBe(false);
        expect(updatedRepo.langs).toEqual(["TypeScript", "Go", "Rust"]);
    });

    test("should update repository content", async () => {
        const updatedRepo = await testPrisma.repository.update({
            where: { id: testRepoId },
            data: {
                content: "# Updated Repository\n\nUpdated line 1\n\nUpdated line 2\n\nNew line 3"
            }
        });

        expect(updatedRepo.content).toBe("# Updated Repository\n\nUpdated line 1\n\nUpdated line 2\n\nNew line 3");
    });

    test("should find repositories by isProduct flag", async () => {
        await testPrisma.repository.create({
            data: {
                id: testRepoId + "-product",
                name: "Product Repo",
                isProduct: true,
                langs: ["Python"],
                content: "# Product Repo\n\nThis is a product repository."
            }
        });

        const productRepos = await testPrisma.repository.findMany({
            where: { isProduct: true }
        });

        const nonProductRepos = await testPrisma.repository.findMany({
            where: { isProduct: false }
        });

        expect(productRepos.every(r => r.isProduct === true)).toBe(true);
        expect(nonProductRepos.every(r => r.isProduct === false)).toBe(true);
    });

    test("should find repositories with specific language", async () => {
        const typescriptRepos = await testPrisma.repository.findMany({
            where: {
                langs: {
                    has: "TypeScript"
                }
            }
        });

        expect(typescriptRepos.every(r => r.langs.includes("TypeScript"))).toBe(true);
    });

    test("should get repository with select fields", async () => {
        const repository = await testPrisma.repository.findFirst({
            where: { id: testRepoId },
            select: {
                id: true,
                name: true,
                isProduct: true,
                langs: true
            }
        });

        expect(repository).not.toBeNull();
        expect(repository).toHaveProperty("id");
        expect(repository).toHaveProperty("name");
        expect(repository).toHaveProperty("isProduct");
        expect(repository).toHaveProperty("langs");
        expect(repository).not.toHaveProperty("content");
    });

    test("should count repositories", async () => {
        const count = await testPrisma.repository.count({
            where: {
                id: {
                    startsWith: "test-repo"
                }
            }
        });

        expect(typeof count).toBe("number");
        expect(count).toBeGreaterThanOrEqual(2);
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
        const allRepos = await testPrisma.repository.findMany({
            where: {
                id: {
                    startsWith: "test-repo"
                }
            }
        });

        expect(Array.isArray(allRepos)).toBe(true);
    });
});
