import Elysia from "elysia";
import { ContactService } from "./contact.service";
import { contactModels } from "./contact.model";
import jwt from "@elysiajs/jwt";

async function verifyTurnstileToken(token: string, remoteIp: string): Promise<boolean> {
    const secretKey = process.env.TURNSTILE_SECRET_KEY;

    if (!secretKey) {
        console.error("TURNSTILE_SECRET_KEY is not set in environment variables");
        return false;
    }

    try {
        const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                secret: secretKey,
                response: token,
                remoteip: remoteIp
            })
        });

        const data = await response.json() as { success: boolean; "error-codes"?: string[] };

        if (!data.success) {
            console.error("Turnstile verification failed:", data["error-codes"]);
        }

        return data.success;
    } catch (err) {
        console.error("Turnstile verification error:", err);
        return false;
    }
}

export const contactController = new Elysia()
    .use(contactModels)
    .use(jwt({ name: "jwt", secret: process.env.JWT_SECRET!! }))
    .decorate({ contact: ContactService })
    .post("/contact", async ({ contact, body, request, set }) => {
        console.log("Contact controller: Received POST /contact request");

        try {
            const ip = request.headers.get("x-real-ip") ||
                       request.headers.get("x-forwarded-for") ||
                       "unknown";
            const userAgent = request.headers.get("user-agent") || undefined;

            console.log(`Contact controller: Processing request from ip="${ip}"`);

            const isTurnstileValid = await verifyTurnstileToken(body.turnstileToken, ip);

            if (!isTurnstileValid) {
                console.log("Contact controller: Turnstile verification failed");
                set.status = 403;
                return {
                    success: false,
                    message: "不正なリクエストです。ページを再読み込みしてもう一度お試しください。"
                };
            }

            console.log("Contact controller: Turnstile verification successful");


            const result = await contact.submit({
                name: body.name,
                email: body.email,
                subject: body.subject,
                message: body.message,
                website: body.website,
                turnstileToken: body.turnstileToken,
                ip: ip,
                userAgent: userAgent
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
        response: "contact-response"
    })
    .get("/contact", async ({ contact, jwt, cookie: { auth } }) =>
        await contact.get(jwt, auth));
