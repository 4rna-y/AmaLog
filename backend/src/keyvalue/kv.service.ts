import { Cookie, status } from "elysia";
import { AuthModule } from "../auth/auth.module";
import { GetDto, SetDto } from "./kv.model";
import { prisma } from "../prisma";

export const KeyValuePairService = {
    async getAll(jwt: any, auth: Cookie<unknown>) {
        const res = await AuthModule.verify(jwt, auth);
        if (!res) return status(403);

        try {
            const result = await prisma.keyValuePair.findMany({
                orderBy: {
                    updatedAt: 'desc'
                }
            });
            return result;
        }
        catch (err) {
            console.error("Failed to get all key-value pairs: ", err);
            return status(500);
        }
    },

    async set(jwt: any, auth: Cookie<unknown>, param: SetDto) {
        const res = await AuthModule.verify(jwt, auth);
        if (!res) return status(403);

        await prisma.keyValuePair.upsert({
            create: {
                key: param.key,
                value: param.value
            },
            where: {
                key: param.key
            },
            update: {
                value: param.value
            }
        });

        return status(200);
    },

    async get(param: GetDto) {
        try {
            const res = await prisma.keyValuePair.findUniqueOrThrow({ where: { key: param.key } });
            return res.value;
        }
        catch (err) {
            console.error("Failed to get value: ", err);
            return status(404);
        }
    }
} 