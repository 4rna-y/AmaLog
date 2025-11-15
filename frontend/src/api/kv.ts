import { IKeyValueModel } from "@/dto/keyvalue.dto";

export const KeyValueApi = {
    async getAll(cookieHeader?: string): Promise<IKeyValueModel[] | undefined> {
        try {
            const headers: HeadersInit = cookieHeader ? { 'Cookie': cookieHeader } : {};
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/keyvalues`, {
                credentials: "include",
                headers
            });
            if (res.status !== 200) {
                console.log(res.statusText);
                return undefined;
            }
            const json = await res.json();
            return json as IKeyValueModel[];
        }
        catch (err) {
            console.error(err);
            return undefined;
        }
    },

    async get(id: string): Promise<string> {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/keyvalue?key=${id}`);
        return await res.text();
    },

    async set(key: string, value: string): Promise<boolean> {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/keyvalue`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ key, value })
            });
            return res.ok;
        }
        catch (err) {
            console.error(err);
            return false;
        }
    }
}