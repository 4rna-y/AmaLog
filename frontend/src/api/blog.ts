import { IBlogModel, IBlogThumbnailCollection } from "@/dto/blog.dto";

export const BlogApi = {
    async getBlogs(amount: number, page: number, tag?: string) : Promise<IBlogThumbnailCollection | undefined> {
        try {
            let url: string;
            if (tag) {
                url = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/blogs/tag?tag=${encodeURIComponent(tag)}&amount=${amount}&page=${page}`;
            } else {
                url = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/blogs?amount=${amount}&page=${page}`;
            }
            const data = await fetch(url, {
                credentials: "include",
                next: { revalidate: 60 }
            });
            const json = await data.json();

            return {
                blogs: json.thumbnails,
                amount: json.amount
            }
        }
        catch(err) {
            console.error(err);
            return undefined;
        }

    },

    async getBlog(id: string, cookieHeader?: string) : Promise<IBlogModel | undefined> {
        try {
            const headers: HeadersInit = cookieHeader ? { 'Cookie': cookieHeader } : {};

            const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/blog/article?id=${id}`, {
                credentials: "include",
                headers,
                next: { revalidate: 300 }
            });

            if (data.status !== 200) {
                console.log(data.statusText);
                return undefined;
            }

            const json = await data.json();

            return json as IBlogModel;
        }
        catch(err) {
            console.error(err);
            return undefined;
        }

    }
}