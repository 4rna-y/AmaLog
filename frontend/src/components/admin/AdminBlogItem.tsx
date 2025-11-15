"use client";

import { IBlogThumbnailModel } from "@/dto/blog.dto";
import Image from "next/image";
import Link from "next/link";
import { ImgApi } from "@/api/img";

interface AdminBlogItemProps {
    blogData: IBlogThumbnailModel;
}

const AdminBlogItem: React.FC<AdminBlogItemProps> = ({ blogData }) => {
    const createdAt = new Date(blogData.createdAt);
    const updatedAt = new Date(blogData.updatedAt);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "published":
                return "bg-green-500/20 text-green-400 border-green-500/30";
            case "onlyknowsurl":
                return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
            case "unpublished":
                return "bg-gray-500/20 text-gray-400 border-gray-500/30";
            default:
                return "bg-blue-500/20 text-blue-400 border-blue-500/30";
        }
    };

    return (
        <Link href={`/admin/dashboard/blog/patch/${blogData.id}`} className="py-2">
            <div className="flex gap-8 bg-background-light border border-foreground-dark/20 rounded-lg p-4 hover:border-accent-primary/50 transition-colors">
                <div className="relative">
                    <Image
                        src={ImgApi.get(blogData.coverImgId)}
                        alt={blogData.title}
                        width={150}
                        height={150}
                        className="rounded-xl max-w-full max-h-full object-contain"
                    />
                </div>

                <div className="flex-grow flex flex-col gap-2 py-2">
                    <div className="flex items-start justify-between gap-4 ">
                        <h1 className="text-xl font-semibold text-foreground-light line-clamp-2 flex-grow">
                            {blogData.title}
                        </h1>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(blogData.status)} whitespace-nowrap`}>
                            {blogData.status}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {blogData.tag.map((tag, index) => (
                            <span key={index}>
                                #{tag}
                            </span>
                        ))}
                        <div className="flex items-center justify-between ml-auto">
                            <div className="text-sm text-foreground-dark">
                                <p>作成: {createdAt.getFullYear()}/{String(createdAt.getMonth() + 1).padStart(2, "0")}/{String(createdAt.getDate()).padStart(2, "0")}</p>
                                <p>更新: {updatedAt.getFullYear()}/{String(updatedAt.getMonth() + 1).padStart(2, "0")}/{String(updatedAt.getDate()).padStart(2, "0")}</p>
                            </div>                        
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default AdminBlogItem;
