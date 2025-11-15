import Elysia from "elysia";
import { KeyValuePairService } from "./kv.service";
import { AuthModule } from "../auth/auth.module";
import { kvModel } from "./kv.model";
import jwt from "@elysiajs/jwt";

export const kvController = new Elysia()
    .use(kvModel)
    .use(jwt({ name: "jwt", secret: process.env.JWT_SECRET!! }))
    .decorate({ "kvService": KeyValuePairService })
    .get("/keyvalues", async ({ kvService, jwt, cookie: { auth } }) =>
        await kvService.getAll(jwt, auth))
    .post("/keyvalue", async ({ kvService, jwt, cookie: { auth }, body }) =>
        await kvService.set(jwt, auth, body),
        { body: "set-dto" })
    .get("/keyvalue", async ({ kvService, query }) =>
        await kvService.get(query),
        { query: "get-dto" })