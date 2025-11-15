import Elysia, { Static, t } from "elysia";

const getRepositoryDto = t.Object({
    id: t.String()
});

const postRepositoryDto = t.Object({
    id: t.String(),
    name: t.String(),
    langs: t.Array(t.String()),
    isProduct: t.Boolean(),
    content: t.Array(t.String())
});

const patchRepositoryContent = t.Object({
    line: t.Number(),
    content: t.String(),
    delete: t.Nullable(t.Boolean())
});

const patchRepositoryDto = t.Object({
    id: t.String(),
    name: t.Nullable(t.String()),
    langs: t.Nullable(t.Array(t.String())),
    isProduct: t.Nullable(t.Boolean()),
    content: t.Nullable(t.Array(patchRepositoryContent))
});

export type GetRepositoryDto = Static<typeof getRepositoryDto>;
export type PostRepositoryDto = Static<typeof postRepositoryDto>;
export type PatchRepositoryDto = Static<typeof patchRepositoryDto>;

const app = new Elysia();

export const reposModel = app.model({
    "get-repos-dto": getRepositoryDto,
    "post-repos-dto": postRepositoryDto,
    "patch-repos-dto": patchRepositoryDto
});