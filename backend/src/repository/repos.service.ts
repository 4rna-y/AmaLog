import { Cookie, status } from "elysia";
import { prisma } from "../prisma"
import { GetRepositoryDto, PatchRepositoryDto, PostRepositoryDto } from "./repos.model";
import { AuthModule } from "../auth/auth.module";

export const RepositoryService = {
    async get() {
        const res = await prisma.repository.findMany({ select: { id: true, name: true, isProduct: true, langs: true } });
        return res;
    },

    async getById(query: GetRepositoryDto) {
        const res = await prisma.repository.findFirst({ where: { id: { equals: query.id } } });
        if (!res) return status(404);

        return res;
    },

    async post(jwt: any, auth: Cookie<unknown>, body: PostRepositoryDto) {
        const res = await AuthModule.verify(jwt, auth);
        if (!res) return status(403);

        const existing = await prisma.repository.count({ where: { id: { equals: body.id } } });
        if (existing !== 0) return status(400);

        await prisma.repository.create({
            data: {
                id: body.id,
                name: body.name,
                langs: body.langs,
                isProduct: body.isProduct,
                content: body.content
            }
        });

        return status(200);
    },

    async patch(jwt: any, auth: Cookie<unknown>, body: PatchRepositoryDto) {
        const res = await AuthModule.verify(jwt, auth);
        if (!res) return status(403);

        try {
            const txres = await prisma.$transaction(async (tx) => {
                const target = await tx.repository.findUnique({
                    where: { id: body.id }
                });

                if (!target) return status(404);

                const update: any = {};

                if (body.name !== null && body.name !== target.name) {
                    update.name = body.name;
                }

                if (body.langs !== null) {
                    const eq =
                        body.langs.length === target.langs.length &&
                        body.langs.every((v, i) => v === target.langs[i]);
                    if (!eq) {
                        update.langs = body.langs;
                    }
                }

                if (body.isProduct !== null && body.isProduct !== target.isProduct) {
                    update.isProduct = body.isProduct;
                }

                let newContent = [...target.content];
                if (body.content) {
                    for (const item of body.content) {
                        if (item.line < 0) return status(400);
                        if (item.line > target.content.length + 100) return status(400);
                    }

                    const ops = new Map<number, "delete" | string>();
                    const additions: string[] = [];

                    body.content.forEach((item) => {
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
                        } else if (op && op !== "delete") {
                            newContent.push(op);
                        } else {
                            newContent.push(target.content[i]);
                        }
                    }

                    additions.forEach((content) => {
                        newContent.push(content);
                    });

                    update.content = newContent;
                }

                if (Object.keys(update).length === 0) return status(200);

                await tx.repository.update({
                    where: { id: body.id },
                    data: update
                });

                return status(200);
            });

            return txres;
        }
        catch (err) {
            console.error("Failed to modify repository: ", err);
            return status(500);
        }
    }
}