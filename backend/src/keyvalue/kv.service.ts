import { Cookie, status } from "elysia";
import { AuthModule } from "../auth/auth.module";
import { GetDto, SetDto } from "./kv.model";
import { prisma } from "../prisma";

export const KeyValuePairService = {
    async getAll(jwt: any, auth: Cookie<unknown>) {
        console.log("KeyValue getAll: Starting request");

        const res = await AuthModule.verify(jwt, auth);
        if (!res) {
            console.log("KeyValue getAll: Authentication failed");
            return status(403);
        }

        try {
            console.log("KeyValue getAll: Fetching all key-value pairs");
            const result = await prisma.keyValuePair.findMany({
                orderBy: {
                    updatedAt: 'desc'
                }
            });
            console.log(`KeyValue getAll: Successfully fetched ${result.length} pairs`);
            return result;
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            console.error(`Error: KeyValue getAll failed - ${errorMessage}`);
            return status(500);
        }
    },

    async set(jwt: any, auth: Cookie<unknown>, param: SetDto) {
        console.log(`KeyValue set: Starting request for key="${param.key}"`);

        const res = await AuthModule.verify(jwt, auth);
        if (!res) {
            console.log("KeyValue set: Authentication failed");
            return status(403);
        }

        try {
            console.log(`KeyValue set: Validating input - key="${param.key}", value length=${param.value.length}`);

            if (!param.key || param.key.trim() === "") {
                console.error("Error: KeyValue set failed - Key is empty");
                return status(400);
            }

            console.log(`KeyValue set: Executing upsert for key="${param.key}"`);
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

            console.log(`KeyValue set: Successfully saved key="${param.key}"`);
            return status(200);
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            const errorStack = err instanceof Error ? err.stack : "";
            console.error(`Error: KeyValue set failed for key="${param.key}" - ${errorMessage}`);
            if (errorStack) {
                console.error(`Error: Stack trace - ${errorStack}`);
            }
            return status(500);
        }
    },

    async get(param: GetDto) {
        console.log(`KeyValue get: Starting request for key="${param.key}"`);

        try {
            const res = await prisma.keyValuePair.findUniqueOrThrow({ where: { key: param.key } });
            console.log(`KeyValue get: Successfully fetched key="${param.key}"`);
            return res.value;
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            console.error(`Error: KeyValue get failed for key="${param.key}" - ${errorMessage}`);
            return status(404);
        }
    }
} 