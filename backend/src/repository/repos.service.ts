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
        console.log(`Repository post: Starting request for id="${body.id}"`);

        const res = await AuthModule.verify(jwt, auth);
        if (!res) {
            console.log("Repository post: Authentication failed");
            return status(403);
        }

        try {
            console.log(`Repository post: Checking if repository id="${body.id}" already exists`);
            const existing = await prisma.repository.count({ where: { id: { equals: body.id } } });
            if (existing !== 0) {
                console.error(`Error: Repository post failed - Repository id="${body.id}" already exists`);
                return status(400);
            }

            console.log(`Repository post: Creating repository id="${body.id}", name="${body.name}"`);
            await prisma.repository.create({
                data: {
                    id: body.id,
                    name: body.name,
                    langs: body.langs,
                    isProduct: body.isProduct,
                    content: body.content
                }
            });

            console.log(`Repository post: Successfully created repository id="${body.id}"`);
            return status(200);
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            console.error(`Error: Repository post failed for id="${body.id}" - ${errorMessage}`);
            return status(500);
        }
    },

    async patch(jwt: any, auth: Cookie<unknown>, body: PatchRepositoryDto) {
        console.log(`Repository patch: Starting request for id="${body.id}"`);

        const res = await AuthModule.verify(jwt, auth);
        if (!res) {
            console.log("Repository patch: Authentication failed");
            return status(403);
        }

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

                if (body.content && body.content.length > 0) {
                    const firstContent = body.content[0];
                    if (firstContent && firstContent.content !== target.content) {
                        update.content = firstContent.content;
                    }
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
            const errorMessage = err instanceof Error ? err.message : String(err);
            console.error(`Error: Repository patch failed for id="${body.id}" - ${errorMessage}`);
            return status(500);
        }
    }
}