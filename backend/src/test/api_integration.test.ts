import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import { app } from "../index";
import { testPrisma, cleanupTestDatabase } from "./setup.js";

describe("API Integration Tests", () => {
    beforeAll(async () => {
        await cleanupTestDatabase();
        
        // Create initial data
        await testPrisma.blog.create({
            data: {
                id: "api-test-blog",
                category: "Tech",
                tag: ["api"],
                coverImgId: "img1",
                status: "PUBLISHED",
                title: "API Test Blog",
                content: "Content",
                likes: 0,
                views: 0
            }
        });
    });

    afterAll(async () => {
        await cleanupTestDatabase();
    });

    test("GET /health should return 200 and status ok", async () => {
        const response = await app.handle(new Request("http://localhost/health"));
        expect(response.status).toBe(200);
        const body = await response.json();
        expect(body.status).toBe("ok");
    });

    test("GET /blog should return list of thumbnails", async () => {
        const response = await app.handle(new Request("http://localhost/blog?page=1&amount=10"));
        expect(response.status).toBe(200);
        const body = await response.json();
        expect(body.thumbnails).toBeDefined();
        expect(body.thumbnails.length).toBeGreaterThan(0);
        expect(body.thumbnails[0].id).toBe("api-test-blog");
    });

    test("GET /blog/:id should return the article and increment views", async () => {
        const response = await app.handle(new Request("http://localhost/blog/api-test-blog"));
        expect(response.status).toBe(200);
        const body = await response.json();
        expect(body.id).toBe("api-test-blog");
        expect(body.title).toBe("API Test Blog");

        // Check if views incremented
        const blog = await testPrisma.blog.findUnique({ where: { id: "api-test-blog" } });
        expect(blog?.views).toBe(1);
    });

    test("GET /blog/:id should return 404 for non-existent blog", async () => {
        const response = await app.handle(new Request("http://localhost/blog/non-existent"));
        expect(response.status).toBe(404);
    });
});
