import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import { testPrisma, cleanupTestDatabase } from "./setup.js";

describe("KeyValue Service Tests", () => {
    const testKey1 = "test-key-1-" + Date.now();
    const testKey2 = "test-key-2-" + Date.now();

    beforeAll(async () => {
        await testPrisma.keyValuePair.deleteMany({
            where: {
                key: { in: [testKey1, testKey2] }
            }
        });
    });

    afterAll(async () => {
        await testPrisma.keyValuePair.deleteMany({
            where: {
                key: { in: [testKey1, testKey2] }
            }
        });
    });

    test("should create a new key-value pair", async () => {
        const kvPair = await testPrisma.keyValuePair.create({
            data: {
                key: testKey1,
                value: "test-value-1"
            }
        });

        expect(kvPair).toBeDefined();
        expect(kvPair.key).toBe(testKey1);
        expect(kvPair.value).toBe("test-value-1");
    });

    test("should read a key-value pair", async () => {
        const kvPair = await testPrisma.keyValuePair.findUnique({
            where: { key: testKey1 }
        });

        expect(kvPair).not.toBeNull();
        expect(kvPair?.value).toBe("test-value-1");
    });

    test("should update a key-value pair using upsert", async () => {
        const updatedKvPair = await testPrisma.keyValuePair.upsert({
            where: { key: testKey1 },
            update: { value: "updated-value-1" },
            create: { key: testKey1, value: "updated-value-1" }
        });

        expect(updatedKvPair.value).toBe("updated-value-1");
    });

    test("should create new pair if key doesn't exist with upsert", async () => {
        const newKvPair = await testPrisma.keyValuePair.upsert({
            where: { key: testKey2 },
            update: { value: "new-value-2" },
            create: { key: testKey2, value: "new-value-2" }
        });

        expect(newKvPair.key).toBe(testKey2);
        expect(newKvPair.value).toBe("new-value-2");
    });

    test("should find all key-value pairs", async () => {
        const allPairs = await testPrisma.keyValuePair.findMany({
            where: {
                key: { in: [testKey1, testKey2] }
            }
        });

        expect(allPairs.length).toBe(2);
    });

    test("should order key-value pairs by updatedAt", async () => {
        // Update testKey1 to make it newer than testKey2
        await testPrisma.keyValuePair.update({
            where: { key: testKey1 },
            data: { value: "latest-value" }
        });

        const orderedPairs = await testPrisma.keyValuePair.findMany({
            where: {
                key: { in: [testKey1, testKey2] }
            },
            orderBy: {
                updatedAt: "desc"
            }
        });

        expect(orderedPairs[0]?.key).toBe(testKey1);
    });

    test("should delete a key-value pair", async () => {
        await testPrisma.keyValuePair.delete({
            where: { key: testKey1 }
        });

        const deletedPair = await testPrisma.keyValuePair.findUnique({
            where: { key: testKey1 }
        });

        expect(deletedPair).toBeNull();
    });

    test("should throw error when finding non-existent key with findUniqueOrThrow", async () => {
        try {
            await testPrisma.keyValuePair.findUniqueOrThrow({
                where: { key: "non-existent-key" }
            });
            expect(true).toBe(false); // Should not reach here
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    test("should count key-value pairs", async () => {
        const count = await testPrisma.keyValuePair.count({
            where: {
                key: { in: [testKey1, testKey2] }
            }
        });
        expect(count).toBe(1); // testKey1 deleted, testKey2 remains
    });
});
