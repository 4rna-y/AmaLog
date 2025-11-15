import Link from 'next/link';
import { Metadata } from 'next';
import TUIButton from '@/components/common/TUIButton';

export const metadata: Metadata = {
    title: '404 Not Found',
    description: 'お探しのページは見つかりませんでした',
};

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-8">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-accent-primary mb-4">404</h1>
                <h1 className="text-2xl font-semibold text-foreground-light mb-4">
                    ページが見つかりません
                </h1>
                <p className="text-foreground-light/70 mb-8">
                    お探しのページは存在しないか、移動した可能性があります。
                </p>
                <TUIButton variant="underlined">
                    <Link href="/">
                        トップページへ戻る
                    </Link>
                </TUIButton>
            </div>
        </div>
    );
}
