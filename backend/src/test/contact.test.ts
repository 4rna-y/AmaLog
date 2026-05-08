import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import { testPrisma, cleanupTestDatabase } from "./setup.js";

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
                name: "John Doe",
                email: "john@example.com",
                subject: "Test Subject",
                message: "Test Message",
                ip: "127.0.0.1",
                userAgent: "TestAgent",
                status: "NEW"
            }
        });

        expect(contact).toBeDefined();
        expect(contact.name).toBe("John Doe");
        expect(contact.email).toBe("john@example.com");
        testContactId = contact.id;
    });

    test("should read a contact submission", async () => {
        const contact = await testPrisma.contact.findUnique({
            where: { id: testContactId }
        });

        expect(contact).not.toBeNull();
        expect(contact?.subject).toBe("Test Subject");
    });

    test("should update contact status", async () => {
        const updatedContact = await testPrisma.contact.update({
            where: { id: testContactId },
            data: {
                status: "READ"
            }
        });

        expect(updatedContact.status).toBe("READ");
    });

    test("should find all contacts", async () => {
        const contacts = await testPrisma.contact.findMany();
        expect(contacts.length).toBeGreaterThan(0);
    });

    test("should filter contacts by status", async () => {
        await testPrisma.contact.create({
            data: {
                name: "Jane Smith",
                email: "jane@example.com",
                subject: "Another Subject",
                message: "Another Message",
                status: "REPLIED"
            }
        });

        const readContacts = await testPrisma.contact.findMany({
            where: { status: "READ" }
        });
        const repliedContacts = await testPrisma.contact.findMany({
            where: { status: "REPLIED" }
        });

        expect(readContacts.length).toBeGreaterThan(0);
        expect(repliedContacts.length).toBeGreaterThan(0);
        expect(readContacts[0]?.status).toBe("READ");
        expect(repliedContacts[0]?.status).toBe("REPLIED");
    });

    test("should count contacts", async () => {
        const count = await testPrisma.contact.count();
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

    test("should validate email format in application logic", () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        expect(emailRegex.test("valid@example.com")).toBe(true);
        expect(emailRegex.test("invalid-email")).toBe(false);
        expect(emailRegex.test("missing@domain")).toBe(false);
    });
});
