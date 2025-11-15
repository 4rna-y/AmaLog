import Elysia, { Static, t } from "elysia";

const setDto = t.Object({
    key: t.String(),
    value: t.String()
});

const getDto = t.Object({
    key: t.String()
});

export type SetDto = Static<typeof setDto>;
export type GetDto = Static<typeof getDto>;

const app = new Elysia();

export const kvModel = app.model({
    "set-dto": setDto,
    "get-dto": getDto
});