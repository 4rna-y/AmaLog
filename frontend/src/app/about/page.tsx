import { ImgApi } from "@/api/img";
import { KeyValueApi } from "@/api/kv";
import TUIButton from "@/components/common/TUIButton";
import RepositoryList from "@/components/repository/RepositoryList";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'About',
    description: 'Ama-Logの管理人のページ',
};

export const revalidate = 300;

export default function About()
{
    return (
        <div className="mx-auto px-8 md:px-8 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <aside className="hidden lg:block lg:col-span-1"></aside>

                <main className="lg:col-span-2">
                    <h1 className="text-2xl text-accent-secondary pt-12 pb-8">About</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-5 lg:grid-cols-3 grid-rows-1 gap-4">
                        <Image src={ImgApi.get("icon.jpg")} alt="Author" width={300} height={300} className="sm:col-start-2 lg:col-start-1 rounded-full mt-2 mx-auto w-26 sm:w-28 md:w-30"/>
                        <div className="col-span-0 col-start-0 sm:col-span-2 sm:col-start-3 lg:col-span-2 lg:col-start-2">
                            <p className="text-center text-foreground-light text-xl font-bold mt-2 mb-4">Ama</p>
                            <p className="mb-2">
                                {KeyValueApi.get("about_text")}
                            </p>
                            <div className="flex justify-center py-2">
                                <TUIButton variant="underlined" className="px-4">
                                    <Link href="https://x.com/4rna_y">
                                        <i className="nf-dev-twitter text-4xl"/>
                                    </Link>
                                </TUIButton>
                                <TUIButton variant="underlined" className="px-4">
                                    <Link href="https://github.com/4rna-y">
                                        <i className="nf-dev-github text-4xl"/>
                                    </Link>
                                </TUIButton>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-2xl text-accent-secondary pt-12 pb-8">Repositories</h1>

                    <RepositoryList/>

                </main>

                <aside className="hidden lg:block lg:col-span-1"></aside>
            </div>
        </div>
    );
}