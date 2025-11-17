import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import { testPrisma, cleanupTestDatabase } from "./setup";

describe("Blog Service Tests", () => {
    const testBlogId = "test-blog-" + Date.now();

    beforeAll(async () => {
        await cleanupTestDatabase();
    });

    afterAll(async () => {
        await cleanupTestDatabase();
    });

    test("should create a new blog post", async () => {
        const blog = await testPrisma.blog.create({
            data: {
                id: testBlogId,
                category: "Technology",
                tag: ["typescript", "testing"],
                coverImgId: "cover123",
                status: "PUBLISHED",
                title: "Test Blog Post",
                content: ["This is test content", "Second line of content"],
                likes: 0,
                views: 0
            }
        });

        expect(blog).toBeDefined();
        expect(blog.id).toBe(testBlogId);
        expect(blog.title).toBe("Test Blog Post");
        expect(blog.category).toBe("Technology");
        expect(blog.tag).toEqual(["typescript", "testing"]);
        expect(blog.status).toBe("PUBLISHED");
    });

    test("should read a blog post", async () => {
        const blog = await testPrisma.blog.findUnique({
            where: { id: testBlogId }
        });

        expect(blog).not.toBeNull();
        expect(blog?.title).toBe("Test Blog Post");
        expect(blog?.category).toBe("Technology");
    });

    test("should update a blog post", async () => {
        const updatedBlog = await testPrisma.blog.update({
            where: { id: testBlogId },
            data: {
                title: "Updated Test Blog Post",
                category: "Updated Technology",
                tag: ["typescript", "testing", "updated"]
            }
        });

        expect(updatedBlog.title).toBe("Updated Test Blog Post");
        expect(updatedBlog.category).toBe("Updated Technology");
        expect(updatedBlog.tag).toEqual(["typescript", "testing", "updated"]);
    });

    test("should increment blog views", async () => {
        const beforeUpdate = await testPrisma.blog.findUnique({
            where: { id: testBlogId }
        });

        await testPrisma.blog.update({
            where: { id: testBlogId },
            data: { views: { increment: 1 } }
        });

        const afterUpdate = await testPrisma.blog.findUnique({
            where: { id: testBlogId }
        });

        expect(afterUpdate?.views).toBe((beforeUpdate?.views || 0) + 1);
    });

    test("should find blogs by tag", async () => {
        const blogs = await testPrisma.blog.findMany({
            where: {
                tag: { has: "typescript" }
            }
        });

        expect(blogs.length).toBeGreaterThan(0);
        expect(blogs.every(b => b.tag.includes("typescript"))).toBe(true);
    });

    test("should find published blogs only", async () => {
        await testPrisma.blog.create({
            data: {
                id: testBlogId + "-unpublished",
                category: "Tech",
                tag: ["test"],
                coverImgId: "cover456",
                status: "UNPUBLISHED",
                title: "Unpublished Post",
                content: ["Content"],
                likes: 0,
                views: 0
            }
        });

        const publishedBlogs = await testPrisma.blog.findMany({
            where: { status: "PUBLISHED" }
        });

        expect(publishedBlogs.every(b => b.status === "PUBLISHED")).toBe(true);
    });

    test("should delete a blog post", async () => {
        await testPrisma.blog.delete({
            where: { id: testBlogId }
        });

        const deletedBlog = await testPrisma.blog.findUnique({
            where: { id: testBlogId }
        });

        expect(deletedBlog).toBeNull();
    });

    test("should count blogs", async () => {
        const count = await testPrisma.blog.count();
        expect(typeof count).toBe("number");
        expect(count).toBeGreaterThanOrEqual(0);
    });
});
