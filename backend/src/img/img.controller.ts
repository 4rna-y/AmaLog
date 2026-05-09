import jwt from "@elysiajs/jwt";
import Elysia, { NotFoundError } from "elysia";
import { imgModels } from "./img.model.js";
import { ImgService } from "./img.service.js";

const uploadsPath = process.env.NODE_ENV === "production" ? "/app/uploads" : "./uploads";

export const imgController = new Elysia()
    .use(jwt({ name: "jwt", secret: process.env.JWT_SECRET!! }))
    .use(imgModels)
    .decorate({ "img": ImgService })
    .get("/static/*", async ({ params, img, set }) => {
        const filePath = (params as any)['*'];
        
        // Try R2 first
        const image = await img.get(filePath);
        if (image) {
            if (image.contentType) {
                set.headers['Content-Type'] = image.contentType;
            }
            return image.data;
        }

        // Fallback to local (for existing images not yet migrated)
        const file = Bun.file(`${uploadsPath}/${filePath}`);
        if (await file.exists()) {
            return file;
        }

        throw new NotFoundError();
    })
    .post("/img", async ({ img, jwt, cookie: { auth }, query, body }) =>
        await img.post(jwt, auth, query, body),
        { query: "get-img-dto", body: "post-img-dto"})
    .post("/img/blog", async ({ img, jwt, cookie: { auth }, body }) =>
        await img.generateBlogCoverImage(jwt, auth, body),
        { body: "generate-cover-image-dto" })
    .post("/img/repository", async ({ img, jwt, cookie: { auth }, body }) =>
        await img.generateRepositoryOgpImage(jwt, auth, body),
        { body: "generate-repo-image-dto" });