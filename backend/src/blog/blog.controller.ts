import Elysia from "elysia";
import { BlogService } from "./blog.service";
import jwt from "@elysiajs/jwt";
import { blogModels } from "./blog.model";

export const blogController = new Elysia()
    .use(blogModels)
    .use(jwt({ name: "jwt", secret: process.env.JWT_SECRET!! }))
    .decorate({ "blog": BlogService })
    .get("/blogs", async ({ blog, jwt, cookie: { auth }, query }) => 
        await blog.get(jwt, auth, query), 
        { response: "blog-thumbnails", query: "get-blog-dto" })
    .get("/blogs/tag", async ({ blog, jwt, cookie: { auth }, query }) => 
        await blog.getByTag(jwt, auth, query),
        { query: "get-blog-by-tag-dto" })
    .get("/blog/article", async ({ blog, jwt, cookie: { auth }, query }) => 
        await blog.getArticle(jwt, auth, query), 
        { query: "get-blog-article-dto" })
    .post("/blog", async ({ blog, jwt, cookie: { auth }, body }) => 
        await blog.create(jwt, auth, body), 
        { body: "create-blog-dto" })
    .patch("/blog", async ({ blog, jwt, cookie: { auth }, body }) => 
        await blog.patch(jwt, auth, body),
        { body: "patch-blog-content-dto" })