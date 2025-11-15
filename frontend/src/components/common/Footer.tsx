"use client"

import Link from "next/link"
import TUIButton from "./TUIButton"

const Footer = () => {
    return (
        <footer className="flex items-center py-8 flex-col sm:flex-row">
            <div className="flex items-center pb-4">
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

            <p className="text-md sm:ml-auto">© 2025 4rna-y All rights reserved.</p>
        </footer>
    )
};

export default Footer;