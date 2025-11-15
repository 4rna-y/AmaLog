"use client";

import { IKeyValueModel } from "@/dto/keyvalue.dto";
import Link from "next/link";

interface AdminKeyValueItemProps {
    kvData: IKeyValueModel;
}

const AdminKeyValueItem: React.FC<AdminKeyValueItemProps> = ({ kvData }) => {
    const updatedAt = new Date(kvData.updatedAt);
    const formattedDate = `${updatedAt.getFullYear()}/${String(updatedAt.getMonth() + 1).padStart(2, "0")}/${String(updatedAt.getDate()).padStart(2, "0")}`;

    return (
        <Link href={`/admin/dashboard/keyvalue/patch/${kvData.key}`} className="py-2">
            <div className="flex gap-8 bg-background-light border border-foreground-dark/20 rounded-lg p-4 hover:border-accent-primary/50 transition-colors">
                <div className="flex-grow flex flex-col gap-2 py-2">
                    <div className="flex items-start justify-between gap-4">
                        <h1 className="text-xl font-semibold text-foreground-light line-clamp-2 flex-grow">
                            {kvData.key}
                        </h1>
                        <span className="text-sm text-foreground-muted whitespace-nowrap">
                            {formattedDate}
                        </span>
                    </div>
                    <p className="text-foreground-muted line-clamp-2">
                        {kvData.value}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default AdminKeyValueItem;
