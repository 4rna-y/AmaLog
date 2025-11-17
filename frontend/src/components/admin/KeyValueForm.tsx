"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TUIButton from "@/components/common/TUIButton";
import { KeyValueApi } from "@/api/kv";

interface KeyValueFormProps {
    initialKey?: string;
    initialValue?: string;
    isEdit?: boolean;
}

const KeyValueForm: React.FC<KeyValueFormProps> = ({
    initialKey = "",
    initialValue = "",
    isEdit = false
}) => {
    const router = useRouter();
    const [key, setKey] = useState(initialKey);
    const [value, setValue] = useState(initialValue);
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        if (!key.trim()) {
            alert("Key is required");
            return;
        }

        setSaving(true);
        try {
            const success = await KeyValueApi.set(key.trim(), value);

            if (success) {
                router.push("/admin/dashboard/keyvalue");
            } else {
                alert("Failed to save");
            }
        } catch {
            alert("Failed to save");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-foreground-light mb-2">
                            Key
                        </label>

                        <input
                            type="text"
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            disabled={isEdit}
                            placeholder="キーを入力してください"
                            className="w-full px-4 py-2 bg-background-light border border-foreground-dark/20 rounded text-foreground-light focus:border-accent-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground-light mb-2">
                            Value
                        </label>

                        <textarea
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            rows={10}
                            placeholder="値を入力してください"
                            className="w-full px-4 py-2 bg-background-light border border-foreground-dark/20 rounded text-foreground-light focus:border-accent-primary focus:outline-none"
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-4 pt-6 border-t border-foreground-dark/20">
                <TUIButton
                    onClick={handleSave}
                    disabled={saving}
                    variant="underlined"
                    className="text-accent-primary font-medium"
                >
                    {saving ? "Saving..." : (isEdit ? "更新" : "作成")}
                </TUIButton>
                <TUIButton
                    onClick={() => router.push("/admin/dashboard/keyvalue")}
                    variant="underlined"
                    className="text-foreground-light"
                >
                    キャンセル
                </TUIButton>
            </div>
        </div>
    );
};

export default KeyValueForm;
