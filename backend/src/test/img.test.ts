import { describe, test, expect, beforeAll, beforeEach, spyOn } from "bun:test";
import { mockClient } from "aws-sdk-client-mock";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { ImgService } from "../img/img.service.js";
import { AuthModule } from "../auth/auth.module.js";
import { sdkStreamMixin } from "@aws-sdk/util-stream-node";
import { Readable } from "stream";

// S3Clientのモックを作成
const s3Mock = mockClient(S3Client);

describe("ImgService R2 Integration Tests", () => {
    beforeEach(() => {
        s3Mock.reset();
        // 認証を常にパスするようにスパイを設定
        spyOn(AuthModule, "verify").mockResolvedValue(true as any);
    });

    test("post() should upload image to R2", async () => {
        s3Mock.on(PutObjectCommand).resolves({});

        // ダミーの画像データ
        const mockImage = new File(["dummy content"], "test.png", { type: "image/png" });
        const mockJwt = {};
        const mockAuth = { value: "valid-token" } as any;
        const mockQuery = { id: "test-image-id" };
        const mockBody = { image: mockImage };

        await ImgService.post(mockJwt, mockAuth, mockQuery, mockBody);

        expect(s3Mock.calls()).toHaveLength(1);
        const call = s3Mock.call(0);
        expect(call.args[0].input).toMatchObject({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: "test-image-id",
            ContentType: "image/png",
        });
    });

    test("get() should fetch image from R2", async () => {
        // GetObjectのレスポンスをモック
        const stream = new Readable();
        stream.push("dummy image data");
        stream.push(null);
        const sdkStream = sdkStreamMixin(stream);

        s3Mock.on(GetObjectCommand).resolves({
            Body: sdkStream,
            ContentType: "image/png",
        });

        const result = await ImgService.get("test-image-id");

        expect(result).not.toBeNull();
        expect(result?.contentType).toBe("image/png");
        expect(s3Mock.calls()).toHaveLength(1);
        expect(s3Mock.call(0).args[0].input).toMatchObject({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: "test-image-id",
        });
    });
});
