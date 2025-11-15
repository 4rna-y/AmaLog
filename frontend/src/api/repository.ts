import { IRepositoryModel } from "@/dto/repository.dto";

export const RepositoryApi = {
    async getRepositories() : Promise<IRepositoryModel[] | undefined> {
        try {
            const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/repos`, {
                credentials: "include",
                next: { revalidate: 300 }
            });
            const json = await data.json();

            return json as IRepositoryModel[];
        }
        catch(err) {
            console.error(err);
            return undefined;
        }
    },

    async getRepository(id: string, cookieHeader?: string) : Promise<IRepositoryModel | undefined> {
        try {
            const headers: HeadersInit = cookieHeader ? { 'Cookie': cookieHeader } : {};

            const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/repos/${id}`, {
                credentials: "include",
                headers,
                next: { revalidate: 300 }
            });

            if (data.status !== 200) {
                console.log(data.statusText);
                return undefined;
            }

            const json = await data.json();

            return json as IRepositoryModel;
        }
        catch(err) {
            console.error(err);
            return undefined;
        }
    }
}
