import { Cookie, ElysiaCustomStatusResponse, file, status } from "elysia";
import { GenerateCoverImageDto, GenerateRepoImageDto, GetImgDto, Img, PostImgDto, } from "./img.model";
import { AuthModule } from "../auth/auth.module";
import { prisma } from "../prisma"
import satori from "satori";
import { imgSvgNode } from "./img.svg";
import { Resvg } from "@resvg/resvg-js";
import { readdirSync, statSync } from "fs";

const mime2Ext: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/gif": ".gif",
    "image/webp": ".webp",
    "image/avif": ".avif"
}

export const ImgService = {
    async post(jwt: any, auth: Cookie<unknown>, query: GetImgDto, body: PostImgDto) {
        const res = await AuthModule.verify(jwt, auth);
        if (!res) return status(403);
        if (!body.image) return status(400);

        try {
            const buf = await body.image.arrayBuffer();
            await Bun.write(`./uploads/${query.id}`, buf, { createPath: true /*わあ！*/ });
        }
        catch (err) {
            console.error("Failed to save img: ", err);
            return status(500);
        }

        return status(200);
    },

    async generateBlogCoverImage(jwt: any, auth: Cookie<unknown>, body: GenerateCoverImageDto) {
        const res = AuthModule.verify(jwt, auth);
        if (!res) return status(403);

        const blog = await prisma.blog.findFirst({ where: { id: body.blogId } })
        if (!blog) return status(400);

        const fontData = await Bun.file("./fonts/CaskaydiaMonoNerdFontMono-Regular.ttf");
        const boldFontData = await Bun.file("./fonts/NotoSansJP-SemiBold.ttf")

        const svg = await satori(
            imgSvgNode(blog.title), 
            {
                width: 1280,
                height: 800,
                fonts: [
                    {
                        name: "CaskaydiaMono Nerd Font",
                        data: await fontData.arrayBuffer(),
                        weight: 400,
                        style: "normal"
                    },
                    {
                        name: "Noto Sans JP",
                        data: await boldFontData.arrayBuffer(),
                        weight: 600,
                        style: "normal"
                    },
                ]
            });

        const resvg = new Resvg(svg, {
            fitTo: { mode: "width", value: 1200 }
        });

        await Bun.write(`./uploads/${blog.coverImgId}`, resvg.render().asPng());

        return status(200);
    },

    async generateRepositoryOgpImage(jwt: any, auth: Cookie<unknown>, body: GenerateRepoImageDto) {
        const res = AuthModule.verify(jwt, auth);
        if (!res) return status(403);

        const repository = await prisma.repository.findFirst({ where: { id: body.repositoryId } })
        if (!repository) return status(400);

        try {
            const imageUrl = `https://opengraph.githubassets.com/1/4rna-y/${body.repositoryId}`;
            const imageResponse = await fetch(imageUrl);

            if (!imageResponse.ok) return status(500);

            const imageBuffer = await imageResponse.arrayBuffer();
            await Bun.write(`./uploads/${body.repositoryId}.png`, imageBuffer);

            return status(200);
        } catch (err) {
            console.error("Failed to fetch GitHub OGP image: ", err);
            return status(500);
        }
    }
}