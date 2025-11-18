import Elysia from "elysia";
import { ContactService } from "./contact.service";
import { contactModels } from "./contact.model";
import { contact } from "../../prisma/prismabox/contact";
import jwt from "@elysiajs/jwt";
import { rateLimit } from "elysia-rate-limit";

export const contactController = new Elysia()
    .use(contactModels)
    .use(jwt({ name: "jwt", secret: process.env.JWT_SECRET!! }))
    .decorate({ contact: ContactService })
    .post("/contact", async ({ contact, body, request }) => {
        console.log("Contact controller: Received POST /contact request");

        try {
            const ip = request.headers.get("x-real-ip") ||
                       request.headers.get("x-forwarded-for") ||
                       "unknown";
            const userAgent = request.headers.get("user-agent") || undefined;

            console.log(`Contact controller: Processing request from ip="${ip}"`);

            const result = await contact.submit({
                ...body,
                ip,
                userAgent
            });

            console.log(`Contact controller: Request processed, success=${result.success}`);
            return result;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            console.error(`Error: Contact controller failed - ${errorMessage}`);
            return {
                success: false,
                message: "送信に失敗しました"
            };
        }
    }, {
        body: "submit-contact-dto",
        response: "contact-response",
        beforeHandle: rateLimit({
            duration: 60 * 60 * 1000,
            max: 3,
            generator: (req) => req.headers.get("x-real-ip") ||
                               req.headers.get("x-forwarded-for") ||
                               "unknown"
        })
    })
    .get("/contact", async ({ contact, jwt, cookie: { auth } }) =>
        await contact.get(jwt, auth));
