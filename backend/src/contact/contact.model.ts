import Elysia, { Static, t } from "elysia";

const submitContactDto = t.Object({
    name: t.String({ minLength: 1, maxLength: 255 }),
    email: t.String({ format: "email", maxLength: 255 }),
    subject: t.String({ minLength: 1, maxLength: 500 }),
    message: t.String({ minLength: 1, maxLength: 5000 }),
    website: t.Optional(t.String())
});

const contactResponse = t.Object({
    success: t.Boolean(),
    message: t.String()
});

const app = new Elysia();

export type SubmitContactDto = Static<typeof submitContactDto>;
export type ContactResponse = Static<typeof contactResponse>;

export const contactModels = app.model({
    "submit-contact-dto": submitContactDto,
    "contact-response": contactResponse
});
