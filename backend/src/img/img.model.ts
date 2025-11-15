import Elysia, { Static, t } from "elysia";

const postImgDto = t.Object({
    image: t.File({type: ["image/jpeg", "image/png", "image/gif", "image/webp", "image/avif"]})
});

const getImgDto = t.Object({
    id: t.String()
});

const getImgManyDto = t.Object({
    ids: t.Array(t.String())
})

const generateCoverImageDto = t.Object({
    blogId: t.String()
})

const generateRepoImageDto = t.Object({
    repositoryId: t.String()
})

const img = t.Object({
    id: t.String(),
    ext: t.String(),
    image: t.File({type: ["image/jpeg", "image/png", "image/gif", "image/webp", "image/avif"]})
});

const app = new Elysia();

export type PostImgDto = Static<typeof postImgDto>;
export type GetImgDto = Static<typeof getImgDto>;
export type GetImgManyDto = Static<typeof getImgManyDto>;
export type GenerateCoverImageDto = Static<typeof generateCoverImageDto>;
export type GenerateRepoImageDto = Static<typeof generateRepoImageDto>;
export type Img = Static<typeof img>;

export const imgModels = app.model({
    "post-img-dto": postImgDto,
    "get-img-dto": getImgDto,
    "get-img-many-dto": getImgManyDto,
    "generate-cover-image-dto": generateCoverImageDto,
    "generate-repo-image-dto": generateRepoImageDto,
    "img": img
});