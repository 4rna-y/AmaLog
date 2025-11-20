"use client";

import { useRef } from "react";
import TUIButton from "@/components/common/TUIButton";

interface MarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange, placeholder }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const insertText = (before: string, after: string = "") => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = value.substring(start, end);
        const newValue = value.substring(0, start) + before + selectedText + after + value.substring(end);

        onChange(newValue);

        setTimeout(() => {
            textarea.focus();
            const cursorPos = start + before.length + selectedText.length;
            textarea.setSelectionRange(cursorPos, cursorPos);
        }, 0);
    };

    const handleHeading = (level: number) => {
        insertText('#'.repeat(level) + ' ');
    };

    const handleBold = () => insertText('**', '**');
    const handleItalic = () => insertText('*', '*');
    const handleImage = () => insertText('![説明](画像ファイル名)');
    const handleLink = () => insertText('[', '](url)');

    return (
        <div className="border border-foreground-dark/20 rounded-lg overflow-hidden bg-background-light">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-foreground-dark/20 bg-background-dark/30 flex-wrap">
                <TUIButton onClick={() => handleHeading(1)} variant="underlined" className="text-sm text-foreground-light">
                    H1
                </TUIButton>
                <TUIButton onClick={() => handleHeading(2)} variant="underlined" className="text-sm text-foreground-light">
                    H2
                </TUIButton>
                <TUIButton onClick={() => handleHeading(3)} variant="underlined" className="text-sm text-foreground-light">
                    H3
                </TUIButton>
                <TUIButton onClick={handleBold} variant="underlined" className="text-sm text-foreground-light">
                    太字
                </TUIButton>
                <TUIButton onClick={handleItalic} variant="underlined" className="text-sm text-foreground-light">
                    斜体
                </TUIButton>
                <TUIButton onClick={handleImage} variant="underlined" className="text-sm text-foreground-light">
                    画像
                </TUIButton>
                <TUIButton onClick={handleLink} variant="underlined" className="text-sm text-foreground-light">
                    リンク
                </TUIButton>
            </div>
            <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full min-h-[200px] p-4 bg-transparent text-foreground-light font-mono text-sm resize-none focus:outline-none"
                style={{ fieldSizing: 'content' } as React.CSSProperties}
            />
        </div>
    );
};

export default MarkdownEditor;
