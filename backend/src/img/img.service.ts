import { Cookie, ElysiaCustomStatusResponse, file, status } from "elysia";
import { GenerateCoverImageDto, GenerateRepoImageDto, GetImgDto, Img, PostImgDto, } from "./img.model.js";
import { AuthModule } from "../auth/auth.module.js";
import { prisma } from "../prisma.js"
import satori from "satori";
import { imgSvgNode } from "./img.svg.js";
import { Resvg } from "@resvg/resvg-js";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

let _s3: S3Client | null = null;
const getS3 = () => {
    if (!_s3) {
        _s3 = new S3Client({
            region: "auto",
            endpoint: process.env.R2_ENDPOINT,
            credentials: {
                accessKeyId: process.env.R2_ACCESS_KEY_ID!,
                secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
            },
        });
    }
    return _s3;
};

const getBucketName = () => process.env.R2_BUCKET_NAME!;

export const ImgService = {
    async get(id: string) {
        try {
            const response = await getS3().send(new GetObjectCommand({
                Bucket: getBucketName(),
                Key: id,
            }));

            if (!response.Body) return null;

            return {
                data: response.Body,
                contentType: response.ContentType
            };
        } catch (err) {
            console.error(`Failed to get img ${id} from R2: `, err);
            return null;
        }
    },

    async post(jwt: any, auth: Cookie<unknown>, query: GetImgDto, body: PostImgDto) {
        const res = await AuthModule.verify(jwt, auth);
        if (!res) return status(403);
        if (!body.image) return status(400);

        try {
            const buf = await body.image.arrayBuffer();
            await getS3().send(new PutObjectCommand({
                Bucket: getBucketName(),
                Key: query.id,
                Body: Buffer.from(buf),
                ContentType: body.image.type,
            }));
        }
        catch (err) {
            console.error("Failed to save img to R2: ", err);
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

        const pngBuffer = resvg.render().asPng();

        try {
            await getS3().send(new PutObjectCommand({
                Bucket: getBucketName(),
                Key: blog.coverImgId,
                Body: pngBuffer,
                ContentType: "image/png",
            }));
        } catch (err) {
            console.error("Failed to upload blog cover to R2: ", err);
            return status(500);
        }

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
            
            await getS3().send(new PutObjectCommand({
                Bucket: getBucketName(),
                Key: `${body.repositoryId}.png`,
                Body: Buffer.from(imageBuffer),
                ContentType: "image/png",
            }));

            return status(200);
        } catch (err) {
            console.error("Failed to fetch/upload GitHub OGP image to R2: ", err);
            return status(500);
        }
    }
}
