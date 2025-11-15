"use client";

import { IRepositoryModel } from "@/dto/repository.dto";
import Link from "next/link";

interface AdminRepositoryItemProps {
    repositoryData: IRepositoryModel;
}

const AdminRepositoryItem: React.FC<AdminRepositoryItemProps> = ({ repositoryData }) => {
    const getProductColor = (isProduct: boolean) => {
        return isProduct
            ? "bg-green-500/20 text-green-400 border-green-500/30"
            : "bg-gray-500/20 text-gray-400 border-gray-500/30";
    };

    return (
        <Link href={`/admin/dashboard/repository/patch/${repositoryData.id}`} className="py-2">
            <div className="flex gap-8 bg-background-light border border-foreground-dark/20 rounded-lg p-4 hover:border-accent-primary/50 transition-colors">
                <div className="flex-grow flex flex-col gap-2 py-2">
                    <div className="flex items-start justify-between gap-4">
                        <h1 className="text-xl font-semibold text-foreground-light line-clamp-2 flex-grow">
                            {repositoryData.name}
                        </h1>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getProductColor(repositoryData.isProduct)} whitespace-nowrap`}>
                            {repositoryData.isProduct ? "Product" : "Not Product"}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {repositoryData.langs.map((lang, index) => (
                            <span key={index} className="text-sm text-accent-primary">
                                #{lang}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default AdminRepositoryItem;
