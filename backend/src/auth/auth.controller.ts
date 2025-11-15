import Elysia, { status } from "elysia";
import jwt from "@elysiajs/jwt"
import { AuthService } from "./auth.service";
import { AuthModule } from "./auth.module";

export const authController = new Elysia()
    .decorate({ authService: AuthService, authModule: AuthModule })
    .use(jwt({ name: "jwt", secret: process.env.JWT_SECRET!! }))
    .get("/admin/auth/google", ({authService}) => authService.authRedirect())
    .get("/admin/auth/google/callback", async ({ authService, query, jwt, cookie: { auth } }) =>
        await authService.authCallback(query, jwt, auth))
    .get("/admin/auth/logout", ({ authService, cookie: { auth } }) => authService.logout(auth))
    .get("/admin/auth/verify", async ({ authModule, jwt, cookie: { auth } }) => {
        const isValid = await authModule.verify(jwt, auth);
        return isValid ? status(200) : status(401);
    })