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
        console.log(`Blog create: Starting request for id="${body.id}"`);

        const res = await AuthModule.verify(jwt, auth);
        if (!res) {
            console.log("Blog create: Authentication failed");
            return status(403);
        }

        try {
            console.log(`Blog create: Checking if blog id="${body.id}" already exists`);
            const existing = await prisma.blog.count({ where: { id: { equals: body.id } } });
            if (existing !== 0) {
                console.error(`Error: Blog create failed - Blog id="${body.id}" already exists`);
                return status(400);
            }

            console.log(`Blog create: Creating blog id="${body.id}", title="${body.title}"`);
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

            console.log(`Blog create: Successfully created blog id="${body.id}"`);
            return status(200);
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            console.error(`Error: Blog create failed for id="${body.id}" - ${errorMessage}`);
            return status(500);
        }
    },

    async patch(jwt: any, auth: Cookie<unknown>, body: PatchBlogContentDto) {
        console.log(`Blog patch: Starting request for id="${body.id}"`);

        const res = await AuthModule.verify(jwt, auth);
        if (!res) {
            console.log("Blog patch: Authentication failed");
            return status(403);
        }

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

                let newContent = target.content;
                if (body.contents && body.contents.length > 0) {
                    const firstContent = body.contents[0];
                    if (firstContent && firstContent.content !== target.content) {
                        newContent = firstContent.content;
                        all.push({
                            type: "CONTENTS",
                            line: 0,
                            before: target.content,
                            after: newContent
                        });
                    }
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
            const errorMessage = err instanceof Error ? err.message : String(err);
            console.error(`Error: Blog patch failed for id="${body.id}" - ${errorMessage}`);
            return status(500);
        }
    }
}