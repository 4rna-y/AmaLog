'use client';

import { ImgApi } from "@/api/img";
import Image from "next/image";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { generateHeadingId } from "@/utils/extractHeadings";

interface BlogContentItemProps {
    className?: string;
    content: string;
}

const BlogContentItem: React.FC<BlogContentItemProps> = ({ content, className }) => {
    return (
        <div className={className || "markdown"}>
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
                {content}
            </Markdown>
        </div>
    );
};

export default BlogContentItem;