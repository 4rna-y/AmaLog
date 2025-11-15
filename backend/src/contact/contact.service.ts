import { Cookie, status } from "elysia";
import { ContactResponse, SubmitContactDto } from "./contact.model";
import { prisma } from "../prisma";
import { AuthModule } from "../auth/auth.module";

export const ContactService = {
    async submit(data: SubmitContactDto & { ip?: string; userAgent?: string }): Promise<ContactResponse> {
        try {
            if (data.website) {
                return {
                    success: false,
                    message: "送信に失敗しました"
                };
            }

            this.validateEmail(data.email);
            this.validateLength(data.name, 1, 255);
            this.validateLength(data.subject, 1, 500);
            this.validateLength(data.message, 1, 5000);

            await prisma.contact.create({
                data: {
                    name: data.name,
                    email: data.email,
                    subject: data.subject,
                    message: data.message,
                    ip: data.ip,
                    userAgent: data.userAgent
                }
            });

            await this.sendEmail(data);

            return {
                success: true,
                message: "お問い合わせを受け付けました"
            };
        } catch (err) {
            console.error("Contact submission error:", err);
            return {
                success: false,
                message: "送信に失敗しました"
            };
        }
    },

    validateEmail(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email");
        }
    },

    validateLength(value: string, min: number, max: number) {
        if (value.length < min || value.length > max) {
            throw new Error(`Length must be between ${min} and ${max}`);
        }
    },

    async sendEmail(data: SubmitContactDto) {
        const resendApiKey = process.env.RESEND_API_KEY;
        const adminEmail = process.env.CONTACT_EMAIL;
        const fromEmail = process.env.MAIL_FROM;

        if (!resendApiKey || !adminEmail || !fromEmail) {
            console.error("RESEND_API_KEY or CONTACT_EMAIL or MAIL_FROM not configured");
            return;
        }

        try {
            await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${resendApiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    from: fromEmail,
                    to: adminEmail,
                    reply_to: data.email,
                    subject: `【お問い合わせ】${data.subject}`,
                    text: `名前: ${data.name}\nメール: ${data.email}\n件名: ${data.subject}\n\n━━━━━━━━━━━━━━━━━━\n${data.message}\n━━━━━━━━━━━━━━━━━━\n\n`
                })
            });

            await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${resendApiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    from: fromEmail,
                    to: data.email,
                    subject: "お問い合わせを受け付けました",
                    text: `${data.name} 様\n\nお問い合わせいただき、ありがとうございます。\n以下の内容で受け付けました。\n\n件名: ${data.subject}\nメッセージ:\n${data.message}\n\n━━━━━━━━━━━━━━━━━━\n確認次第、ご連絡いたします。\n\nこのメールは自動送信されています。`
                })
            });
        } catch (err) {
            console.error("Email sending error:", err);
        }
    },
    
    async get(jwt: any, auth: Cookie<unknown>) {
        const res = await AuthModule.verify(jwt, auth);
        if (!res) return status(403);

        const contacts = await prisma.contact.findMany({ 
            select: {
                id: true,
                name: true,
                email: true,
                subject: true,
                message: true,
                ip: true,
                userAgent: true,
                createdAt: true
            }
        });

        return contacts;
    }
};
