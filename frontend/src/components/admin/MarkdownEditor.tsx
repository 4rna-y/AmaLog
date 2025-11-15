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

    const insertText = (formatStr: string) => {
        
        const getLinePos = (text: string, pos: number) => {
            let l = 0;
            for (let i = 0; i < pos; i++) {
                if (text.at(i) === "\n") l++
            }
            return l;
        }
        
        const textarea = textareaRef.current;
        if (!textarea) return;

        const lines = value.split("\n");
        const lPos = getLinePos(value, textarea.selectionStart);

        lines.splice(lPos + 1, 0, formatStr);
        
        onChange(lines.join("\n"));
    };

    // const insertText = (before: string, after: string = "") => {
    //     const textarea = textareaRef.current;
    //     if (!textarea) return;

    //     const start = textarea.selectionStart;
    //     const end = textarea.selectionEnd;
    //     const selectedText = value.substring(start, end);
    //     const newValue = value.substring(0, start) + before + selectedText + after + value.substring(end);

    //     onChange(newValue);

    //     setTimeout(() => {
    //         textarea.focus();
    //         if (after && selectedText) {
    //             textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    //         } else if (after) {
    //             textarea.setSelectionRange(start + before.length, start + before.length);
    //         } else {
    //             textarea.setSelectionRange(start + before.length, start + before.length);
    //         }
    //     }, 0);
    // };

    const handleMdContent = () => insertText("md()");
    const handleImgContent = () => insertText("img(,)");

    return (
        <div className="border border-foreground-dark/20 rounded-lg overflow-hidden bg-background-light">
            <div className="flex items-center gap-4 px-3 py-2 border-b border-foreground-dark/20 bg-background-dark/30">
                <TUIButton onClick={handleMdContent} variant="underlined" className="text-md text-foreground-light">
                    Markdown
                </TUIButton>
                <TUIButton onClick={handleImgContent} variant="underlined" className="text-md text-foreground-light">
                    画像
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
