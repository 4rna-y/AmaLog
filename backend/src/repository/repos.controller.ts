import jwt from "@elysiajs/jwt";
import Elysia from "elysia";
import { RepositoryService } from "./repos.service";
import { reposModel } from "./repos.model";

export const reposController = new Elysia()
    .use(reposModel)
    .use(jwt({ name: "jwt", secret: process.env.JWT_SECRET!! }))
    .decorate({ "repos": RepositoryService })
    .get("/repos", async ({ repos }) => await repos.get())
    .get("/repos/:id", async ({ repos, params }) => 
        await repos.getById(params),
        { params: "get-repos-dto" })
    .post("/repos", async ({ repos, jwt, cookie: { auth }, body }) =>
        await repos.post(jwt, auth, body),
        { body: "post-repos-dto" })
    .patch("/repos", async ({ repos, jwt, cookie: { auth }, body }) => 
        await repos.patch(jwt, auth, body),
        { body: "patch-repos-dto" });