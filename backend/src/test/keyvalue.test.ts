import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import { testPrisma, cleanupTestDatabase } from "./setup";

describe("KeyValue Service Tests", () => {
    const testKey = "test-key-" + Date.now();
    const testKey2 = "test-key-2-" + Date.now();

    beforeAll(async () => {
        await testPrisma.keyValuePair.deleteMany({
            where: {
                key: {
                    startsWith: "test-key"
                }
            }
        });
    });

    afterAll(async () => {
        await testPrisma.keyValuePair.deleteMany({
            where: {
                key: {
                    startsWith: "test-key"
                }
            }
        });
    });

    test("should create a new key-value pair", async () => {
        const kvPair = await testPrisma.keyValuePair.create({
            data: {
                key: testKey,
                value: "test value"
            }
        });

        expect(kvPair).toBeDefined();
        expect(kvPair.key).toBe(testKey);
        expect(kvPair.value).toBe("test value");
    });

    test("should read a key-value pair", async () => {
        const kvPair = await testPrisma.keyValuePair.findUnique({
            where: { key: testKey }
        });

        expect(kvPair).not.toBeNull();
        expect(kvPair?.key).toBe(testKey);
        expect(kvPair?.value).toBe("test value");
    });

    test("should update a key-value pair using upsert", async () => {
        const updatedKvPair = await testPrisma.keyValuePair.upsert({
            where: { key: testKey },
            create: {
                key: testKey,
                value: "new value"
            },
            update: {
                value: "updated value"
            }
        });

        expect(updatedKvPair.value).toBe("updated value");
    });

    test("should create new pair if key doesn't exist with upsert", async () => {
        const newKvPair = await testPrisma.keyValuePair.upsert({
            where: { key: testKey2 },
            create: {
                key: testKey2,
                value: "another value"
            },
            update: {
                value: "should not be used"
            }
        });

        expect(newKvPair.key).toBe(testKey2);
        expect(newKvPair.value).toBe("another value");
    });

    test("should find all key-value pairs", async () => {
        const allPairs = await testPrisma.keyValuePair.findMany({
            where: {
                key: {
                    startsWith: "test-key"
                }
            }
        });

        expect(Array.isArray(allPairs)).toBe(true);
        expect(allPairs.length).toBeGreaterThanOrEqual(2);
    });

    test("should order key-value pairs by updatedAt", async () => {
        await testPrisma.keyValuePair.update({
            where: { key: testKey },
            data: { value: "newly updated" }
        });

        const orderedPairs = await testPrisma.keyValuePair.findMany({
            where: {
                key: {
                    startsWith: "test-key"
                }
            },
            orderBy: {
                updatedAt: "desc"
            }
        });

        expect(orderedPairs[0].key).toBe(testKey);
    });

    test("should delete a key-value pair", async () => {
        await testPrisma.keyValuePair.delete({
            where: { key: testKey }
        });

        const deletedPair = await testPrisma.keyValuePair.findUnique({
            where: { key: testKey }
        });

        expect(deletedPair).toBeNull();
    });

    test("should throw error when finding non-existent key with findUniqueOrThrow", async () => {
        expect(async () => {
            await testPrisma.keyValuePair.findUniqueOrThrow({
                where: { key: "non-existent-key" }
            });
        }).toThrow();
    });

    test("should count key-value pairs", async () => {
        const count = await testPrisma.keyValuePair.count({
            where: {
                key: {
                    startsWith: "test-key"
                }
            }
        });

        expect(typeof count).toBe("number");
        expect(count).toBeGreaterThanOrEqual(1);
    });
});
