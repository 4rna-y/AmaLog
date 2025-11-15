'use client';

import { useState } from "react";
import TUIButton from "@/components/common/TUIButton";
import Modal from "@/components/common/Modal";
import { IBlogUpdate } from "@/dto/blog.dto";

interface UpdateHistoryButtonProps {
    updatedAt: Date;
    blogUpdate: IBlogUpdate[];
}

const UpdateHistoryButton: React.FC<UpdateHistoryButtonProps> = ({ updatedAt, blogUpdate }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="flex items-center gap-2">
                <i className="nf-md-update text-xl"></i>
                <TUIButton 
                    variant="underlined" 
                    className="text-sm text-foreground-light/70"
                    onClick={() => setIsOpen(true)}
                >
                    <time>
                        {new Intl.DateTimeFormat('ja-JP').format(updatedAt)}
                    </time>
                </TUIButton>
            </div>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="更新履歴"
            >
                {blogUpdate.length === 0 ? (
                    <p className="text-center py-4">更新履歴はありません</p>
                ) : (
                    <div className="space-y-6 max-h-96 overflow-y-auto">
                        {blogUpdate.map((update) => (
                            <div key={update.id} className="border-b border-foreground-dark/20 pb-4 last:border-b-0">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-foreground-light">{update.title}</h3>
                                    <time className="text-sm text-foreground-dark">
                                        {new Intl.DateTimeFormat('ja-JP').format(new Date(update.createdAt))}
                                    </time>
                                </div>
                                
                                {update.contents.length > 0 && (
                                    <div className="space-y-2 mt-3">
                                        {update.contents.map((content) => (
                                            <div key={content.id} className="text-sm bg-background-light rounded p-3">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xs bg-accent-primary/20 text-accent-primary px-2 py-1 rounded">
                                                        {content.type}
                                                    </span>
                                                    {content.type == "CONTENTS" && (
                                                        <span className="text-xs text-foreground-dark">
                                                            Line {content.line}
                                                        </span>
                                                    )}
                                                    
                                                </div>
                                                
                                                {content.before && (
                                                    <div className="mt-2">
                                                        <span className="text-xs text-red-400">- </span>
                                                        <span className="text-red-400/80">{content.before}</span>
                                                    </div>
                                                )}
                                                
                                                {content.after && (
                                                    <div className="mt-1">
                                                        <span className="text-xs text-green-400">+ </span>
                                                        <span className="text-green-400/80">{content.after}</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                
                <div className="mt-6 flex justify-end">
                    <TUIButton onClick={() => setIsOpen(false)}>
                        閉じる
                    </TUIButton>
                </div>
            </Modal>
        </>
    );
};

export default UpdateHistoryButton;
