'use client';

import { IBlogThumbnailModel } from "@/dto/blog.dto";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TUIButton from "@/components/common/TUIButton";
import { ImgApi } from "@/api/img";

interface BlogItemProps
{
    className?: string;
    blogData: IBlogThumbnailModel
}

const BlogItem: React.FC<BlogItemProps> = (
{
    blogData
}) =>
{
    const router = useRouter();

    const handleCardClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('a[href^="blog?tag"]')) {
            return;
        }
        router.push(`blog/${blogData.id}`);
    };

    const createdAt = new Date(blogData.createdAt);

    return (
        <div
            className="flex flex-col md:grid md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors items-center md:items-stretch"
            onClick={handleCardClick}
        >
            <div className="relative md:col-span-1 lg:col-span-2 flex items-center justify-center md:h-auto max-w-[250px] md:max-w-none">
                <Image
                    src={ImgApi.get(blogData.coverImgId)}
                    alt={blogData.title}
                    width={250}
                    height={250}
                    className="rounded-xl max-w-full max-h-full object-contain"
                />
            </div>

            <div className="md:col-span-2 lg:col-span-3 flex flex-col gap-4 w-full max-w-[250px] md:max-w-none">
                <div className="flex-grow md:pt-4">
                    <div className="font-bold text-foreground-light text-xl md:text-2xl">
                        <p className="line-clamp-2">
                            {blogData.title}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-8 mt-auto md:pb-4">
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                        {createdAt.getFullYear()}/{String(createdAt.getMonth() + 1).padStart(2, '0')}/{String(createdAt.getDate()).padStart(2, '0')}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        {blogData.tag.map((value, index) => (
                            <TUIButton variant="underlined" key={index} className="text-sm">
                                <Link href={`blog?tag=${value}`}>#{value}</Link>
                            </TUIButton>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogItem;