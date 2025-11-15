'use client';

import { IBlogThumbnailCollection } from "@/dto/blog.dto";
import { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import TUIButton from "@/components/common/TUIButton";
import { BlogApi } from "@/api/blog";

interface BlogListProps {
    tag?: string;
}

const BlogList: React.FC<BlogListProps> = ({ tag }) =>
{
    const [page, setPage] = useState(1);
    const [blogs, setBlogs] = useState<IBlogThumbnailCollection>({ amount: 0, blogs: []});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setPage(1);
    }, [tag]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                setError("");
                const data = await BlogApi.getBlogs(10, page, tag);
                if (data) setBlogs(data);
            }
            catch (err) {
                setError("ブログの取得に失敗");
                console.error(err);
            }
            finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    },
    [page, tag]);

    const handleNextPage = () => setPage(prevPage => prevPage + 1);
    const handlePrevPage = () => setPage(prevPage => Math.max(1, prevPage - 1));

    if (loading) {
        return ( <div className="text-center py-8">Loading...</div> );
    }

    if (error.length !== 0) {
        return ( <div className="text-center py-8 text-red-500">{error}</div> );
    }
    

    return (
        <div className="space-y-4">
            {blogs?.blogs.map(blog => (
                <BlogItem key={blog.id} blogData={blog}/>
            ))}

            <div className="flex justify-center gap-4 py-6">
                <TUIButton
                    variant="underlined"
                    onClick={handlePrevPage}
                    disabled={page <= 1}
                >
                    Previous
                </TUIButton>
                <p className="px-4 py-2">Page {page}</p>
                <TUIButton
                    variant="underlined"
                    onClick={handleNextPage}
                    disabled={page * 10 >= blogs.amount}
                >
                    Next
                </TUIButton>
            </div>
        </div>
    );
};

export default BlogList;
