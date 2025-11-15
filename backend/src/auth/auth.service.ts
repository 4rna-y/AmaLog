import { Cookie, redirect, status } from "elysia";

export const AuthService = {
    authRedirect(): Response {
        const params = new URLSearchParams({
            client_id: process.env.CLIENT_ID!,
            redirect_uri: process.env.REDIRECT_URI!,
            response_type: 'code',
            scope: 'openid email profile',
            access_type: 'offline',
            prompt: 'consent'
        });

        return redirect(
            `${process.env.OAUTH2_URI}?${params}`
        );
    },

    async authCallback(
        query: Record<string, string>,
        jwt: any,
        auth: Cookie<unknown>
    ): Promise<any> {
        const { code } = query;

        const tokenResp = await fetch(process.env.TOKEN_URI!, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                code: code as string,
                client_id: process.env.CLIENT_ID!,
                client_secret: process.env.CLIENT_SECRET!,
                redirect_uri: process.env.REDIRECT_URI!,
                grant_type: "authorization_code"
            })
        });

        const tokens = await tokenResp.json();
        const userResp = await fetch(process.env.USER_URI!, {
            headers: { Authorization: `Bearer ${tokens.access_token}` }
        });

        const user = await userResp.json();

        if (user.email !== process.env.ADMIN_EMAIL) {
            console.log(user);

            return status(403);
        }

        const token = await jwt.sign({
            email: user.email,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
        });

        auth.set({
            value: token,
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/"
        });

        return redirect(process.env.ADMIN_REDIRECT_URI!);
    },

    async verify(jwt: any, auth: Cookie<unknown>) {
        const token = auth.value;
        if (!token) return {};
        
        const payload = await jwt.verify(token);
        if (!payload) return {};
        
        if (payload.email !== process.env.ADMIN_EMAIL) return {};

        return { user: payload };
    },

    logout(auth: Cookie<unknown>) {
        auth.remove();
        return redirect(process.env.ADMIN_REDIRECT_URI!);
    }
}