'use client';

import Image from "next/image";
import Link from "next/link";
import { ImgApi } from "@/api/img";
import { KeyValueApi } from "@/api/kv";
import { useEffect, useState } from "react";
import TUIButton from "@/components/common/TUIButton";

const AuthorCard = () =>
{
    const [profile, setProfile] = useState("");
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await KeyValueApi.get("profile");
                setProfile(data);
            }
            catch (err) {
                console.error(err);
            }
            finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, []);

    return (
        <div className="border-1 grid grid-cols-1 sm:grid-cols-4 relative">
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-md text-foreground whitespace-nowrap">このサイトの管理者</span>

            <div className="col-span-1 pt-8 pb-2 sm:pb-4 pl-8 pr-4">
                <Image src={ImgApi.get("icon.jpg")} alt="Author" width={300} height={300} className="rounded-full mt-2 mx-auto w-20 sm:w-22 md:w-24"/>
                <div className="py-2 mt-2">
                    <p className="text-center text-foreground-light text-lg font-bold">Ama</p>
                    <div className="flex justify-center py-2">
                        <TUIButton variant="underlined" className="px-4">
                            <Link href="https://x.com/4rna_y">
                                <i className="nf-dev-twitter text-3xl"/>
                            </Link>
                        </TUIButton>
                        <TUIButton variant="underlined" className="px-4">
                            <Link href="https://github.com/4rna-y">
                                <i className="nf-dev-github text-3xl"/>
                            </Link>
                        </TUIButton>
                    </div>
                </div>
            </div>

            <div className="col-span-3 pt-0 pb-8 sm:pt-8 sm:pb-8 pl-8 pr-8 sm:pl-4 sm:pr-8 flex flex-col">
                <div className=" text-lg">
                    { loading ? "Loading..." : profile }
                </div>

                <div className="text-center mt-auto mb-2 pt-8">
                    <TUIButton variant="underlined">
                        <Link href="/about">
                            {"About >"}
                        </Link>
                    </TUIButton>
                </div>
            </div> 
            
        </div>
    );
}

export default AuthorCard;