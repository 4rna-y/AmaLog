'use client';

import { ImgApi } from "@/api/img";
import Image from "next/image";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { generateHeadingId } from "@/utils/extractHeadings";
interface BlogContentItemProps
{
    className?: string;
    rawText: string;
}

function getTypedContent(text: string): { type: "img" | "md" | "error", content: string, contentName?: string }
{
    const strIdx = text.indexOf("(");
    const endIdx = text.lastIndexOf(")");

    if (strIdx === -1) return { type: "error", content: "Invalid item signature of start index" }
    if (endIdx === -1) return { type: "error", content: "Invalid item signature of end index" }

    const ctype = text.slice(0, strIdx);
    const content = text.slice(strIdx + 1, endIdx);


    const typeMap: Record<string, "img" | "md"> = {
        img: "img",
        md: "md"
    };

    if (ctype in typeMap) {
        if (ctype === "img") {

            const c = content.split(",");

            if (c.length !== 2) return { type: "error", content: "" };

            return {
                type: "img",
                content: c[0],
                contentName: c[1]
            };
        }

        return { type: typeMap[ctype], content: content };
    }

    return { type: "error", content: `Invalid format (${ctype}, ${content})` };
}

const BlogContentItem: React.FC<BlogContentItemProps> = (
{
    rawText
}) =>
{
    const content = getTypedContent(rawText);

    if (content.type == "md")
    {
        return (
            <div className="markdown">
                <Markdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                        h1: ({ children, ...props }) => {
                            const text = String(children);
                            const id = generateHeadingId(text);
                            return <h1 id={id} {...props}>{children}</h1>;
                        },
                        h2: ({ children, ...props }) => {
                            const text = String(children);
                            const id = generateHeadingId(text);
                            return <h2 id={id} {...props}>{children}</h2>;
                        },
                        h3: ({ children, ...props }) => {
                            const text = String(children);
                            const id = generateHeadingId(text);
                            return <h3 id={id} {...props}>{children}</h3>;
                        },
                    }}
                >
                    {content.content}
                </Markdown>
            </div>
        )
    }
    else
    if (content.type == "img")
    {
        return (
            <div className="w-full flex flex-col items-center my-8">
                <Image
                    src={ImgApi.get(content.content)}
                    alt={content.contentName || content.content}
                    width={800}
                    height={600}
                    className="max-w-full h-auto object-contain rounded-lg"
                    unoptimized
                />
                {content.contentName && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
                        {content.contentName}
                    </p>
                )}
            </div>
        )
    }
}

export default BlogContentItem;