"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MarkdownEditor from "./MarkdownEditor";
import BlogContentItem from "../blog/BlogContentItem";
import TUIButton from "@/components/common/TUIButton";

const BlogCreateForm: React.FC = () => {
    const router = useRouter();
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("UNPUBLISHED");
    const [tags, setTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState("");
    const [content, setContent] = useState("");
    const [coverImgId, setCoverImgId] = useState("");
    const [saving, setSaving] = useState(false);
    const [thumbnail, setThumbnail] = useState(false);

    const handleAddTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            setTags([...tags, newTag.trim()]);
            setNewTag("");
        }
    };

    const handleRemoveTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const handleCreateThumbnail = (v: boolean) => {
        setThumbnail(v);
    }

    const handleSave = async () => {
        if (!id.trim() || !title.trim()) {
            alert("IDとタイトルは必須です");
            return;
        }

        setSaving(true);
        try {
            const payload = {
                id: id.trim(),
                title,
                category,
                status,
                tag: tags,
                content: content,
                coverImgId: coverImgId
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/blog`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(payload)
            });

            if (response.ok) {

                if (thumbnail) {
                    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/img/blog`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        credentials: "include",
                        body: JSON.stringify({
                            "blogId": payload.id
                        })
                    });
                }

                router.push("/admin/dashboard");
            } else {
                alert("保存に失敗しました");
            }
        } catch {
            alert("保存に失敗しました");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-foreground-light mb-2">
                            ID
                        </label>
                        <input
                            type="text"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            placeholder="blog-post-url"
                            className="w-full px-4 py-2 bg-background-light border border-foreground-dark/20 rounded text-foreground-light focus:border-accent-primary focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground-light mb-2">
                            タイトル
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 bg-background-light border border-foreground-dark/20 rounded text-foreground-light focus:border-accent-primary focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground-light mb-2">
                            カテゴリ
                        </label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-2 bg-background-light border border-foreground-dark/20 rounded text-foreground-light focus:border-accent-primary focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground-light mb-2">
                            カバー画像ID
                        </label>
                        <input
                            type="text"
                            value={coverImgId}
                            onChange={(e) => setCoverImgId(e.target.value)}
                            placeholder="image.png"
                            className="w-full px-4 py-2 bg-background-light border border-foreground-dark/20 rounded text-foreground-light focus:border-accent-primary focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground-light mb-2">
                            ステータス
                        </label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full px-4 py-2 bg-background-light border border-foreground-dark/20 rounded text-foreground-light focus:border-accent-primary focus:outline-none"
                        >
                            <option value="PUBLISHED" className="bg-background">PUBLISHED</option>
                            <option value="ONLYKNOWSURL" className="bg-background">ONLYKNOWSURL</option>
                            <option value="UNPUBLISHED" className="bg-background">UNPUBLISHED</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground-light mb-2">
                            タグ
                        </label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                                placeholder="新しいタグ"
                                className="flex-grow px-4 py-2 bg-background-light border border-foreground-dark/20 rounded text-foreground-light focus:border-accent-primary focus:outline-none"
                            />
                            <TUIButton
                                onClick={handleAddTag}
                                variant="underlined"
                                className="text-foreground-light"
                            >
                                追加
                            </TUIButton>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-accent-primary/10 text-accent-primary rounded flex items-center gap-2"
                                >
                                    #{tag}
                                    <TUIButton
                                        onClick={() => handleRemoveTag(index)}
                                        variant="underlined"
                                        className="text-foreground-light hover:text-red-400"
                                    >
                                        x
                                    </TUIButton>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground-light mb-2">
                            コンテンツ
                        </label>
                        <MarkdownEditor
                            value={content}
                            onChange={setContent}
                            placeholder="Markdownを入力してください"
                        />
                    </div>
                </div>

                <div>
                    <div className="sticky top-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-foreground-light">プレビュー</h2>
                        </div>

                        
                        <div className="bg-background-light border border-foreground-dark/20 rounded-lg p-6">
                            <h1 className="text-3xl font-bold text-foreground-light mb-4">{title || "(タイトル未入力)"}</h1>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {tags.map((tag, index) => (
                                    <span key={index} className="px-2 py-1 bg-accent-primary/10 text-accent-primary text-sm rounded">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                            <div className="prose prose-lg max-w-none text-foreground-light">
                                <BlogContentItem content={content} />
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-foreground-dark/20">
                <TUIButton
                    onClick={handleSave}
                    disabled={saving}
                    variant="underlined"
                    className="text-accent-primary font-medium"
                >
                    {saving ? "保存中..." : "作成"}
                </TUIButton>
                <div className="flex items-center gap-2">
                    サムネイル画像を作成
                    <input 
                        className="w-4 h-4 border bg-accent-primary"
                        type="checkbox"
                        checked={thumbnail}
                        onChange={(e) => handleCreateThumbnail(e.target.checked)}/>
                </div>
                
                <TUIButton
                    onClick={() => router.push("/admin/dashboard")}
                    variant="underlined"
                    className="text-foreground-light"
                >
                    キャンセル
                </TUIButton>
            </div>
        </div>
    );
};

export default BlogCreateForm;
