import jwt from "@elysiajs/jwt";
import Elysia, { NotFoundError } from "elysia";
import { imgModels } from "./img.model";
import { ImgService } from "./img.service";

const uploadsPath = process.env.NODE_ENV === "production" ? "/app/uploads" : "./uploads";

export const imgController = new Elysia()
    .use(jwt({ name: "jwt", secret: process.env.JWT_SECRET!! }))
    .use(imgModels)
    .decorate({ "img": ImgService })
    .get("/static/*", async ({ params }) => {
        const filePath = (params as any)['*'];
        const file = Bun.file(`${uploadsPath}/${filePath}`);

        if (!(await file.exists())) {
            throw new NotFoundError();
        }

        return file;
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