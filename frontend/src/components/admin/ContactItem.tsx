"use client"

import { IContactModel } from "@/dto/contact.dto";
import React, { useState } from "react";

interface ContactItemProps {
    data: IContactModel;
};

const ContactItem: React.FC<ContactItemProps> = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);
    const createdAt = new Date(data.createdAt);
    const formattedDate = `${createdAt.getFullYear()}/${String(createdAt.getMonth() + 1).padStart(2, "0")}/${String(createdAt.getDate()).padStart(2, "0")}`;

    return (
        <div className="py-2">
            <div className="bg-background-light border border-foreground-dark/20 rounded-lg overflow-hidden hover:border-accent-primary/50 transition-colors">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4"
                >
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground truncate">
                                {data.name}
                            </h3>
                            <span className="text-sm text-foreground-muted whitespace-nowrap">
                                {formattedDate}
                            </span>
                        </div>
                        <p className="text-foreground-muted truncate">
                            {data.subject}
                        </p>
                    </div>
                    <div className="flex-shrink-0">
                        <svg
                            className={`w-5 h-5 text-foreground-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </button>

                {isOpen && (
                    <div className="border-t border-foreground-dark/20 p-4 bg-background-dark/30">
                        <div className="mb-3">
                            <p className="text-sm text-foreground-muted mb-1">Email</p>
                            <p className="text-foreground">{data.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-foreground-muted mb-1">Message</p>
                            <p className="text-foreground whitespace-pre-wrap">{data.message}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ContactItem;