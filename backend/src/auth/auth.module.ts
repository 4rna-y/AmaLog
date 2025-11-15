import { Cookie } from "elysia";

export const AuthModule = {
    async verify(jwt: any, auth: Cookie<unknown>) {
        const token = auth.value;
        if (!token) return false;
        
        const payload = await jwt.verify(token);
        if (!payload) return false;
        
        if (payload.email !== process.env.ADMIN_EMAIL) return {};

        return true;
    },
}