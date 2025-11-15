export const ImgApi = {
    get(id: string) : string {
        return `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/static/${id}`;
    }
}