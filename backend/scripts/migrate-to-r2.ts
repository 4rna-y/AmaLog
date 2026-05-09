import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { readdirSync } from "fs";
import { join } from "path";

const s3 = new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
});

const bucketName = process.env.R2_BUCKET_NAME!;
const uploadsPath = "./uploads";

async function migrate() {
    console.log("Starting migration to R2...");
    
    try {
        const files = readdirSync(uploadsPath);
        console.log(`Found ${files.length} files in ${uploadsPath}`);

        for (const filename of files) {
            const filePath = join(uploadsPath, filename);
            const file = Bun.file(filePath);
            
            if (!(await file.exists())) continue;

            const buffer = await file.arrayBuffer();
            const contentType = file.type || "application/octet-stream";

            console.log(`Uploading ${filename} (${contentType})...`);

            await s3.send(new PutObjectCommand({
                Bucket: bucketName,
                Key: filename,
                Body: Buffer.from(buffer),
                ContentType: contentType,
            }));
            
            console.log(`Successfully uploaded ${filename}`);
        }

        console.log("Migration completed successfully!");
    } catch (err) {
        console.error("Migration failed:", err);
    }
}

migrate();
