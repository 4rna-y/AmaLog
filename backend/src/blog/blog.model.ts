import Elysia, { Static, t } from "elysia";

const status = t.Union([t.Literal("PUBLISHED"), t.Literal("ONLYKNOWSURL"), t.Literal("UNPUBLISHED")]);

const blog = t.Object({
    id: t.String(),
    category: t.String(),
    tag: t.Array(t.String()),
    coverImgId: t.String(),
    status,
    title: t.String(),
    content: t.Array(t.String()),
    likes: t.Integer(),
    views: t.Integer(),
    createdAt: t.Date(),
    updatedAt: t.Date()
});

const blogs = t.Object({
    amount: t.Integer(),
    blogs: t.Array(blog)
});

const createBlogDto = t.Object({
    id: t.String(),
    category: t.String(),
    tag: t.Array(t.String()),
    coverImgId: t.String(),
    status,
    title: t.String(),
    content: t.Array(t.String())
});

const getBlogDto = t.Object({
    amount: t.Integer(),
    page: t.Integer()
});

const getBlogByTagDto = t.Object({
    tag: t.String(),
    amount: t.Integer(),
    page: t.Integer()
});

const getBlogArticleDto = t.Object({
    id: t.String()
});

const blogThumbnail = t.Object({
    id: t.String(),
    category: t.String(),
    tag: t.Array(t.String()),
    coverImgId: t.String(),
    status,
    title: t.String(),
    createdAt: t.Date(),
    updatedAt: t.Date()
});

const blogThumbnails = t.Object({
    amount: t.Integer(),
    thumbnails: t.Array(blogThumbnail)
});

const patchBlogContent = t.Object({
    line: t.Number(),
    content: t.String(),
    delete: t.Nullable(t.Boolean())
});

const patchBlogContentDto = t.Object({
    id: t.String(),
    updateTitle: t.String(),
    category: t.Nullable(t.String()),    
    tag: t.Nullable(t.Array(t.String())),
    coverImgId: t.Nullable(t.String()),
    status: t.Nullable(status),
    title: t.Nullable(t.String()),
    contents: t.Nullable(t.Array(patchBlogContent))
});

const app = new Elysia();

export type Blog = Static<typeof blog>;
export type Blogs = Static<typeof blogs>;
export type BlogThumbnail = Static<typeof blogThumbnail>;
export type BlogThumbnails = Static<typeof blogThumbnails>;
export type CreateBlogDto = Static<typeof createBlogDto>;
export type GetBlogDto = Static<typeof getBlogDto>;
export type GetBlogByTagDto = Static<typeof getBlogByTagDto>;
export type GetBlogArticleDto = Static<typeof getBlogArticleDto>;
export type PatchBlogContent = Static<typeof patchBlogContent>;
export type PatchBlogContentDto = Static<typeof patchBlogContentDto>;

export const blogModels = app.model({
    "blog": blog,
    "blogs": blogs,
    "blog-thumbnails": blogThumbnails,
    "create-blog-dto": createBlogDto,
    "get-blog-dto": getBlogDto,
    "get-blog-by-tag-dto": getBlogByTagDto,
    "get-blog-article-dto": getBlogArticleDto,
    "patch-blog-content-dto": patchBlogContentDto,
});
