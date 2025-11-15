import { IContactModel } from "@/dto/contact.dto";

export const ContactApi = {
    async getContacts(cookieHeader?: string): Promise<IContactModel[] | undefined> {
        try {
            const headers: HeadersInit = cookieHeader ? { 'Cookie': cookieHeader } : {};
            const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/contact`, { "credentials": "include", headers });
            const json = await data.json();

            return json;
        }
        catch (err) {
            console.error(err);
            return undefined;
        }
    }
}