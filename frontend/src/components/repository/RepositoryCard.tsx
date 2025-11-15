'use client';

import { IRepositoryModel } from "@/dto/repository.dto";
import { useRouter } from "next/navigation";
import TUIButton from "@/components/common/TUIButton";
import Image from "next/image";
import { ImgApi } from "@/api/img";

interface RepositoryCardProps
{
    repository: IRepositoryModel;
}

const RepositoryCard: React.FC<RepositoryCardProps> = ({ repository }) =>
{
    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/repository/${repository.id}`);
    };

    return (
        <div
            className="flex flex-col gap-4 p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-1"
            onClick={handleCardClick}
        >
            <div className="relative w-full">
                <Image
                    src={ImgApi.get(repository.id + ".png")}
                    alt={repository.name}
                    width={600}
                    height={315}
                    className="rounded-lg w-full h-auto object-cover"
                />
            </div>

            <div className="flex-grow">
                <div className="font-bold text-foreground-light text-xl md:text-2xl mb-2">
                    {repository.name}
                </div>
                {repository.content?.length > 0 && (
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 line-clamp-2">
                        {repository.content[0]}
                    </p>
                )}
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-auto">
                {repository.isProduct && (
                    <span className="text-xs md:text-sm px-3 py-1 bg-accent-secondary text-white rounded-full">
                        Product
                    </span>
                )}
                {repository.langs?.map((lang, index) => (
                    <TUIButton variant="underlined" key={index} className="text-sm">
                        {lang}
                    </TUIButton>
                ))}
            </div>
        </div>
    );
}

export default RepositoryCard;
