import { Cookie, status } from "elysia";
import { AuthModule } from "../auth/auth.module";
import { BlogThumbnails, CreateBlogDto, GetBlogArticleDto, GetBlogByTagDto, GetBlogDto, PatchBlogContentDto } from "./blog.model";
import { prisma } from "../prisma"
import { Prisma } from "@prisma/client";

export const BlogService = {
    async get(jwt: any, auth: Cookie<unknown>, query: GetBlogDto) : Promise<BlogThumbnails> {
        const res = await AuthModule.verify(jwt, auth);
        if (res) { 
            return {
                amount: await prisma.blog.count(),
                thumbnails: await prisma.blog.findMany({
                    select: { id: true, category: true, tag: true, coverImgId: true, status: true, title: true, createdAt: true, updatedAt: true },
                    skip: (query.page - 1) * query.amount,
                    take: query.amount,
                    orderBy: { createdAt: "desc" }
                })
            };
        }
        else {
            return {
                amount: await prisma.blog.count({ where: { status: "PUBLISHED" } }),
                thumbnails: await prisma.blog.findMany({
                    select: { id: true, category: true, tag: true, coverImgId: true, status: true, title: true, createdAt: true, updatedAt: true },
                    where: { status: "PUBLISHED" },
                    skip: (query.page - 1) * query.amount,
                    take: query.amount,
                    orderBy: { createdAt: "desc" }
                })
            };
        }
    },

    async getByTag(jwt: any, auth: Cookie<unknown>, query: GetBlogByTagDto) {
        const res = await AuthModule.verify(jwt, auth);
        if (res) { 
            return {
                amount: await prisma.blog.count({ where: { tag: { has: query.tag } } }),
                thumbnails: await prisma.blog.findMany({
                    select: { id: true, category: true, tag: true, coverImgId: true, status: true, title: true, createdAt: true, updatedAt: true },
                    where: { tag: { has: query.tag } },
                    skip: (query.page - 1) * query.amount,
                    take: query.amount,
                    orderBy: { createdAt: "desc" }
                })
            };
        }
        else {
            return {
                amount: await prisma.blog.count({ where: { status: "PUBLISHED", tag: { has: query.tag } } }),
                thumbnails: await prisma.blog.findMany({
                    select: { id: true, category: true, tag: true, coverImgId: true, status: true, title: true, createdAt: true, updatedAt: true },
                    where: { status: "PUBLISHED", tag: { has: query.tag } },
                    skip: (query.page - 1) * query.amount,
                    take: query.amount,
                    orderBy: { createdAt: "desc" }
                })
            };
        }
    },

    async getArticle(jwt: any, auth: Cookie<unknown>, query: GetBlogArticleDto) {
        const res = await AuthModule.verify(jwt, auth);

        const id = query.id;
        const article = await prisma.blog.findFirst({
            select: {
                id: true, 
                category: true, 
                tag: true, 
                coverImgId: true, 
                status: true,
                title: true, 
                content: true, 
                views: true, 
                likes: true, 
                createdAt: true,
                updatedAt: true,
                blogUpdate: {
                    select: {
                        id: true,
                        blogId: true,
                        title: true,
                        contents: true,
                        createdAt: true
                    }
                } 
            },
            where: { 
                id: { equals: id } 
            } 
        });
        
        if (article === null) return status(404);
        if (article.status === "UNPUBLISHED" && res === false) return status(403);

        await prisma.blog.update({ 
            where: { id: id },
            data: { views: { increment: 1 }} 
        });
        
        return article;
    },

    async create(jwt: any, auth: Cookie<unknown>, body: CreateBlogDto) {
        const res = await AuthModule.verify(jwt, auth);
        if (!res) return status(403);

        const existing = await prisma.blog.count({ where: { id: { equals: body.id } } });
        if (existing !== 0) return status(400);

        await prisma.blog.create({ 
            data: {
                id: body.id,
                category: body.category,
                tag: body.tag,
                coverImgId: body.coverImgId,
                status: body.status,
                title: body.title,
                content: body.content,
                likes: 0,
                views: 0,
            } 
        });

        return status(200);
    },

    async patch(jwt: any, auth: Cookie<unknown>, body: PatchBlogContentDto) {
        const res = await AuthModule.verify(jwt, auth);
        if (!res) return status(403);
        
        try {
            const txres = await prisma.$transaction(async (tx) => {
                const target = await tx.blog.findUnique({
                    where: { id: body.id }
                });

                if (!target) return status(404);

                const all: Array<{
                    type: "CATEGORY" | "TAG" | "COVERIMGID" | "STATUS" | "TITLE" | "CONTENTS",
                    line: number;
                    before: string;
                    after: string;
                }> = [];
                
                if (body.category !== null && body.category !== target.category) {
                    all.push({
                        type: "CATEGORY",
                        line: 0,
                        before: target.category,
                        after: body.category
                    });
                }

                if (body.tag !== null) {
                    const eq = 
                        body.tag.length === target.tag.length &&
                        body.tag.every((v, i) => v === target.tag[i]);
                    if (!eq) {
                        all.push({
                            type: "TAG",
                            line: 0,
                            before: target.tag.join(", "),
                            after: body.tag.join(", ")
                        });
                    }
                }

                if (body.coverImgId !== null && body.coverImgId !== target.coverImgId) {
                    all.push({
                        type: "COVERIMGID",
                        line: 0,
                        before: target.coverImgId,
                        after: body.coverImgId
                    });
                }

                if (body.status !== null && body.status !== target.status) {
                    all.push({
                        type: "STATUS",
                        line: 0,
                        before: target.status,
                        after: body.status
                    });
                }

                if (body.title !== null && body.title !== target.title) {
                    all.push({
                        type: "TITLE",
                        line: 0,
                        before: target.title,
                        after: body.title
                    });
                }

                let newContent = [...target.content];
                if (body.contents) {
                    for (const item of body.contents) {
                        if (item.line < 0) return status(400);
                        if (item.line > target.content.length + 100) return status(400);
                    }

                    const ops = new Map<number, "delete" | string>();
                    const additions: string[] = [];

                    body.contents.forEach((item) => {
                        if (item.line < target.content.length) {
                            if (item.delete === true) {
                                ops.set(item.line, "delete");
                            } else {
                                ops.set(item.line, item.content);
                            }
                        } else {
                            if (item.delete !== true) {
                                additions.push(item.content);
                            }
                        }
                    });

                    newContent = [];
                    for (let i = 0; i < target.content.length; i++) {
                        const op = ops.get(i);

                        if (op === "delete") {
                            all.push({
                                type: "CONTENTS",
                                line: i,
                                before: target.content[i],
                                after: ""
                            });
                        } else if (op && op !== "delete") {
                            if (target.content[i] !== op) {
                                all.push({
                                    type: "CONTENTS",
                                    line: i,
                                    before: target.content[i],
                                    after: op
                                });
                            }
                            newContent.push(op);
                        } else {
                            newContent.push(target.content[i]);
                        }
                    }

                    additions.forEach((content) => {
                        const line = newContent.length;
                        newContent.push(content);
                        all.push({
                            type: "CONTENTS",
                            line: line,
                            before: "",
                            after: content
                        });
                    });
                }

                if (all.length === 0) return status(200);

                const update: Prisma.blogUpdateInput = {};
                if (body.category !== null) update.category = body.category;
                if (body.tag !== null) update.tag = body.tag;
                if (body.coverImgId !== null) update.coverImgId = body.coverImgId;
                if (body.status !== null) update.status = body.status;
                if (body.title !== null) update.title = body.title;
                if (body.contents !== null) update.content = newContent;

                await tx.blog.update({
                    where: { id: body.id },
                    data: update
                });

                await tx.blogUpdate.create({
                    data: {
                        blogId: body.id,
                        title: body.updateTitle,
                        contents: {
                            create: all
                        }
                    }
                });

                return status(200);
            });

            return txres;
        }
        catch (err) {
            console.error("Failed to modify blog: ", err);
            return status(500);
        }
    }
}