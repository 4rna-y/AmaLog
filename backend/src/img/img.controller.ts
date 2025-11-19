import jwt from "@elysiajs/jwt";
import Elysia from "elysia";
import { imgModels } from "./img.model";
import { ImgService } from "./img.service";
import staticPlugin from "@elysiajs/static";

const uploadsPath = process.env.NODE_ENV === "production" ? "/app/uploads" : "./uploads";

export const imgController = new Elysia()
    .use(jwt({ name: "jwt", secret: process.env.JWT_SECRET!! }))
    .use(imgModels)
    .use(staticPlugin({
        assets: uploadsPath,
        prefix: "/static",
        alwaysStatic: true
    }))
    .decorate({ "img": ImgService })
    .post("/img", async ({ img, jwt, cookie: { auth }, query, body }) =>
        await img.post(jwt, auth, query, body),
        { query: "get-img-dto", body: "post-img-dto"})
    .post("/img/blog", async ({ img, jwt, cookie: { auth }, body }) =>
        await img.generateBlogCoverImage(jwt, auth, body),
        { body: "generate-cover-image-dto" })
    .post("/img/repository", async ({ img, jwt, cookie: { auth }, body }) =>
        await img.generateRepositoryOgpImage(jwt, auth, body),
        { body: "generate-repo-image-dto" });