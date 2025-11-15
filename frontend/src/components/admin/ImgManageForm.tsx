"use client";

import { useState } from "react";
import TUIButton from "@/components/common/TUIButton";

const ImgManageForm: React.FC = () => {
    const [uploadId, setUploadId] = useState("");
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const [blogId, setBlogId] = useState("");
    const [generatingBlog, setGeneratingBlog] = useState(false);

    const [repositoryId, setRepositoryId] = useState("");
    const [fetchingRepo, setFetchingRepo] = useState(false);

    const handleUpload = async () => {
        if (!uploadId.trim() || !uploadFile) {
            alert("ID and file are required");
            return;
        }

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("image", uploadFile);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/img?id=${encodeURIComponent(uploadId.trim())}`,
                {
                    method: "POST",
                    credentials: "include",
                    body: formData
                }
            );

            if (response.ok) {
                alert("Image uploaded successfully");
                setUploadId("");
                setUploadFile(null);
            } else {
                alert("Failed to upload image");
            }
        } catch {
            alert("Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    const handleGenerateBlogThumbnail = async () => {
        if (!blogId.trim()) {
            alert("Blog ID is required");
            return;
        }

        setGeneratingBlog(true);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/img/blog`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({ blogId: blogId.trim() })
                }
            );

            if (response.ok) {
                alert("Blog thumbnail generated successfully");
                setBlogId("");
            } else {
                alert("Failed to generate blog thumbnail");
            }
        } catch {
            alert("Failed to generate blog thumbnail");
        } finally {
            setGeneratingBlog(false);
        }
    };

    const handleFetchRepositoryImage = async () => {
        if (!repositoryId.trim()) {
            alert("Repository ID is required");
            return;
        }

        setFetchingRepo(true);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/img/repository`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({ repositoryId: repositoryId.trim() })
                }
            );

            if (response.ok) {
                alert("Repository image fetched successfully");
                setRepositoryId("");
            } else {
                alert("Failed to fetch repository image");
            }
        } catch {
            alert("Failed to fetch repository image");
        } finally {
            setFetchingRepo(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="bg-background-light border border-foreground-dark/20 rounded-lg p-6">
                <h2 className="text-xl font-bold text-foreground-light mb-4">画像アップロード</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground-light mb-2">
                            Image ID
                        </label>
                        <input
                            type="text"
                            value={uploadId}
                            onChange={(e) => setUploadId(e.target.value)}
                            placeholder="image.png"
                            className="w-full px-4 py-2 bg-background-light border border-foreground-dark/20 rounded text-foreground-light focus:border-accent-primary focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground-light mb-2">
                            Image File
                        </label>
                        <input
                            type="file"
                            accept="image/jpeg,image/png,image/gif,image/webp,image/avif"
                            onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                            placeholder="aaa"
                            className="w-full px-4 py-2 bg-background-light border border-foreground-dark/20 rounded text-foreground-light focus:border-accent-primary focus:outline-none"
                        />
                    </div>
                    <TUIButton
                        onClick={handleUpload}
                        disabled={uploading}
                        variant="underlined"
                        className="text-accent-primary font-medium"
                    >
                        {uploading ? "Uploading..." : "Upload"}
                    </TUIButton>
                </div>
            </div>

            <div className="bg-background-light border border-foreground-dark/20 rounded-lg p-6">
                <h2 className="text-xl font-bold text-foreground-light mb-4">記事サムネイル生成</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground-light mb-2">
                            Blog ID
                        </label>
                        <input
                            type="text"
                            value={blogId}
                            onChange={(e) => setBlogId(e.target.value)}
                            placeholder="blog-post-id"
                            className="w-full px-4 py-2 bg-background-light border border-foreground-dark/20 rounded text-foreground-light focus:border-accent-primary focus:outline-none"
                        />
                    </div>
                    <TUIButton
                        onClick={handleGenerateBlogThumbnail}
                        disabled={generatingBlog}
                        variant="underlined"
                        className="text-accent-primary font-medium"
                    >
                        {generatingBlog ? "Generating..." : "生成"}
                    </TUIButton>
                </div>
            </div>

            <div className="bg-background-light border border-foreground-dark/20 rounded-lg p-6">
                <h2 className="text-xl font-bold text-foreground-light mb-4">Github OGP画像取得</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground-light mb-2">
                            Repository ID
                        </label>
                        <input
                            type="text"
                            value={repositoryId}
                            onChange={(e) => setRepositoryId(e.target.value)}
                            placeholder="repository-name"
                            className="w-full px-4 py-2 bg-background-light border border-foreground-dark/20 rounded text-foreground-light focus:border-accent-primary focus:outline-none"
                        />
                    </div>
                    <TUIButton
                        onClick={handleFetchRepositoryImage}
                        disabled={fetchingRepo}
                        variant="underlined"
                        className="text-accent-primary font-medium"
                    >
                        {fetchingRepo ? "Fetching..." : "取得"}
                    </TUIButton>
                </div>
            </div>
        </div>
    );
};

export default ImgManageForm;
