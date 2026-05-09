import { describe, test, expect, beforeAll, afterAll, spyOn } from "bun:test";
import { BlogService } from "../blog/blog.service";
import { AuthModule } from "../auth/auth.module";
import { testPrisma, cleanupTestDatabase } from "./setup.js";
import { mockJwt, mockCookie } from "./mock_utils";

describe("Blog Service Logic Tests", () => {
    const publishedId = "published-blog";
    const unpublishedId = "unpublished-blog";

    beforeAll(async () => {
        await cleanupTestDatabase();
        
        await testPrisma.blog.create({
            data: {
                id: publishedId,
                category: "Tech",
                tag: ["test"],
                coverImgId: "img1",
                status: "PUBLISHED",
                title: "Published Post",
                content: "Content",
                likes: 0,
                views: 0
            }
        });

        await testPrisma.blog.create({
            data: {
                id: unpublishedId,
                category: "Tech",
                tag: ["test"],
                coverImgId: "img2",
                status: "UNPUBLISHED",
                title: "Unpublished Post",
                content: "Content",
                likes: 0,
                views: 0
            }
        });
    });

    afterAll(async () => {
        await cleanupTestDatabase();
    });

    describe("getArticle", () => {
        test("should return 404 for non-existent blog", async () => {
            const res = await BlogService.getArticle(mockJwt, mockCookie(undefined), { id: "non-existent" });
            expect(res.code).toBe(404);
        });

        test("should return 403 for unpublished blog if not admin", async () => {
            const verifySpy = spyOn(AuthModule, "verify").mockImplementation(async () => false);
            
            try {
                const res = await BlogService.getArticle(mockJwt, mockCookie("valid-user-token"), { id: unpublishedId });
                expect(res.code).toBe(403);
            } finally {
                verifySpy.mockRestore();
            }
        });

        test("should return 200 for unpublished blog if admin", async () => {
            const verifySpy = spyOn(AuthModule, "verify").mockImplementation(async () => true);

            try {
                const res = await BlogService.getArticle(mockJwt, mockCookie("valid-admin-token"), { id: unpublishedId });
                expect(res).not.toBeNull();
                if (typeof res === 'object' && 'code' in res) {
                    expect(res.code).toBe(200);
                } else {
                    expect(res.id).toBe(unpublishedId);
                }
            } finally {
                verifySpy.mockRestore();
            }
        });

        test("should increment views when getting a published article", async () => {
            const before = await testPrisma.blog.findUnique({ where: { id: publishedId } });
            await BlogService.getArticle(mockJwt, mockCookie(undefined), { id: publishedId });
            const after = await testPrisma.blog.findUnique({ where: { id: publishedId } });
            expect(after?.views).toBe((before?.views || 0) + 1);
        });
    });

    describe("patch", () => {
        test("should create a blogUpdate record when content is updated", async () => {
            const verifySpy = spyOn(AuthModule, "verify").mockImplementation(async () => true);

            try {
                const updateTitle = "Update Title " + Date.now();
                const res = await BlogService.patch(mockJwt, mockCookie("valid-admin-token"), {
                    id: publishedId,
                    updateTitle: updateTitle,
                    category: "New Category",
                    tag: ["new-tag"],
                    coverImgId: "new-img",
                    status: "PUBLISHED",
                    title: "New Title",
                    contents: [{ line: 0, content: "New Content", delete: false }]
                }) as any;

                expect(res.code).toBe(200);

                const blog = await testPrisma.blog.findUnique({
                    where: { id: publishedId },
                    include: { blogUpdate: { include: { contents: true } } }
                });

                expect(blog?.title).toBe("New Title");
                expect(blog?.blogUpdate.length).toBeGreaterThan(0);
                const latestUpdate = blog?.blogUpdate.find(u => u.title === updateTitle);
                expect(latestUpdate).toBeDefined();
                expect(latestUpdate?.contents.length).toBeGreaterThan(0);
            } finally {
                verifySpy.mockRestore();
            }
        });

        test("should return 403 if not admin", async () => {
            const verifySpy = spyOn(AuthModule, "verify").mockImplementation(async () => false);

            try {
                const res = await BlogService.patch(mockJwt, mockCookie("valid-user-token"), {
                    id: publishedId,
                    updateTitle: "Unauthorized Update",
                    category: null,
                    tag: null,
                    coverImgId: null,
                    status: null,
                    title: "Unauthorized Title",
                    contents: null
                }) as any;
                expect(res.code).toBe(403);
            } finally {
                verifySpy.mockRestore();
            }
        });
    });
});
