import Link from "next/link";
import TUIButton from "@/components/common/TUIButton";
import { notFound } from "next/navigation";
import Footer from "@/components/common/Footer";
import { RepositoryApi } from "@/api/repository";
import BlogContentItem from "@/components/blog/BlogContentItem";
import { Tooltip } from "@/components/common/Tooltip";

const langName2IconCode = (value: string) => {
    switch (value) {
        case "C/C++": return "nf-custom-cpp";
        case "C#": return "nf-dev-csharp";
        case "Typescript": return "nf-dev-typescript";
        case "Kotlin": return "nf-dev-kotlin";
        case "Minecraft": return "nf-md-minecraft";
        case "NextJS": return "nf-dev-nextjs";
        default: return "";
    }
}

export const dynamic = 'force-dynamic';

export default async function RepositoryPage({params}: {params: {id: string}}) {
    const { id } = await params;
    const repository = await RepositoryApi.getRepository(id);

    const langIcon = (index: number, value: string) => {
        const cls = langName2IconCode(value);
        if (cls !== "") 
            return (
                <Tooltip key={index} text={value}>
                    <i className={`${cls} text-5xl`}/>
                </Tooltip>
                
            ) 
        else return <p key={index}>value</p>
    }

    if (!repository)
    {
        notFound();
    }

    return (
        <div className="mx-auto px-8 md:px-8 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <aside className="hidden lg:block lg:col-span-1"></aside>

                <main className="lg:col-span-2">
                    <article className="py-12">
                        <header className="mb-12">
                            <h1 className="text-4xl font-bold text-foreground-light mb-4">
                                {repository.name}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 mb-4">
                                {repository.isProduct && (
                                    <span className="px-4 py-1 bg-accent-secondary text-white rounded-full text-sm">
                                        Product
                                    </span>
                                )}
                                { repository.langs?.map((lang, index) => langIcon(index, lang)) }
                            </div>

                            <div className="flex items-center gap-2 mb-8">
                                <i className="nf-dev-github text-3xl"/>
                                <TUIButton variant="underlined">
                                    <Link href={`https://github.com/4rna-y/${repository.id}`} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                        GitHub
                                    </Link>
                                </TUIButton>
                            </div>
                        </header>

                        <div className="prose prose-lg max-w-none text-foreground-light">
                            <BlogContentItem content={repository.content}/>
                        </div>

                        <div className="mt-12 pt-8 border-t border-foreground-light/20">
                            <Link href="/about" className="text-accent-secondary hover:underline">
                                ← Aboutページへ
                            </Link>
                        </div>
                    </article>

                    <Footer />
                </main>

                <aside className="hidden lg:block lg:col-span-1"></aside>
            </div>
        </div>
    );
}
