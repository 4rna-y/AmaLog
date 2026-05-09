export const mockJwt = {
    verify: async (token: string) => {
        if (token === "valid-admin-token") {
            return { email: process.env.ADMIN_EMAIL };
        }
        if (token === "valid-user-token") {
            return { email: "user@example.com" };
        }
        return null;
    }
};

export const mockCookie = (value: string | undefined) => ({
    value: value
}) as any;
