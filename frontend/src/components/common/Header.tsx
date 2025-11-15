'use client';

import TUIButton from "@/components/common/TUIButton";
import Link from "next/link";

const Header = () => 
{
    return (
        <header className="flex items-center justify-between px-6 py-4 md:px-6 lg:px-8">
              <Link href="/" className="px-2 md:px-4 py-2 text-accent-primary text-2xl md:text-2xl lg:text-3xl font-bold hover:opacity-80 transition-opacity cursor-pointer">
                  Ama-Log
              </Link>

              <nav className="flex px-2 space-x-0 md:space-x-2 lg:space-x-4">
                    <TUIButton variant="underlined" className="text-sm md:text-base px-2 md:px-4">
                        <Link href="/blog">
                            Blog
                        </Link>
                    </TUIButton>

                    <TUIButton variant="underlined" className="text-sm md:text-base px-2 md:px-4">
                        <Link href="/about">
                            About
                        </Link>
                    </TUIButton>

                    <TUIButton variant="underlined" className="text-sm md:text-base px-2 md:px-4">
                        <Link href="/contact">
                            Contact
                        </Link>
                    </TUIButton>
              </nav>
        </header>
    );
};

export default Header;