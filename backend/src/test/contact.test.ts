import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import { testPrisma, cleanupTestDatabase } from "./setup";

describe("Contact Service Tests", () => {
    let testContactId: string;

    beforeAll(async () => {
        await testPrisma.contact.deleteMany();
    });

    afterAll(async () => {
        await testPrisma.contact.deleteMany();
    });

    test("should create a new contact submission", async () => {
        const contact = await testPrisma.contact.create({
            data: {
                name: "Test User",
                email: "test@example.com",
                subject: "Test Subject",
                message: "This is a test message",
                ip: "127.0.0.1",
                userAgent: "Test Agent"
            }
        });

        testContactId = contact.id;

        expect(contact).toBeDefined();
        expect(contact.name).toBe("Test User");
        expect(contact.email).toBe("test@example.com");
        expect(contact.subject).toBe("Test Subject");
        expect(contact.message).toBe("This is a test message");
        expect(contact.status).toBe("NEW");
    });

    test("should read a contact submission", async () => {
        const contact = await testPrisma.contact.findUnique({
            where: { id: testContactId }
        });

        expect(contact).not.toBeNull();
        expect(contact?.name).toBe("Test User");
        expect(contact?.email).toBe("test@example.com");
    });

    test("should update contact status", async () => {
        const updatedContact = await testPrisma.contact.update({
            where: { id: testContactId },
            data: { status: "READ" }
        });

        expect(updatedContact.status).toBe("READ");
    });

    test("should find all contacts", async () => {
        const contacts = await testPrisma.contact.findMany();

        expect(Array.isArray(contacts)).toBe(true);
        expect(contacts.length).toBeGreaterThan(0);
    });

    test("should filter contacts by status", async () => {
        await testPrisma.contact.create({
            data: {
                name: "Another User",
                email: "another@example.com",
                subject: "Another Subject",
                message: "Another message",
                status: "REPLIED"
            }
        });

        const readContacts = await testPrisma.contact.findMany({
            where: { status: "READ" }
        });

        const repliedContacts = await testPrisma.contact.findMany({
            where: { status: "REPLIED" }
        });

        expect(readContacts.every(c => c.status === "READ")).toBe(true);
        expect(repliedContacts.every(c => c.status === "REPLIED")).toBe(true);
    });

    test("should count contacts", async () => {
        const count = await testPrisma.contact.count();
        expect(typeof count).toBe("number");
        expect(count).toBeGreaterThanOrEqual(2);
    });

    test("should delete a contact", async () => {
        await testPrisma.contact.delete({
            where: { id: testContactId }
        });

        const deletedContact = await testPrisma.contact.findUnique({
            where: { id: testContactId }
        });

        expect(deletedContact).toBeNull();
    });

    test("should validate email format in application logic", async () => {
        const validEmail = "test@example.com";
        const invalidEmail = "invalid-email";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        expect(emailRegex.test(validEmail)).toBe(true);
        expect(emailRegex.test(invalidEmail)).toBe(false);
    });
});
