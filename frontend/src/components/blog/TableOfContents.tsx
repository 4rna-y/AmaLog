'use client';

import { useActiveHeading } from "@/hooks/useActiveHeading";
import { Heading } from "@/utils/extractHeadings";

interface TableOfContentsProps {
    headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
    const headingIds = headings.map(h => h.id);
    const activeId = useActiveHeading(headingIds);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    if (headings.length === 0) {
        return null;
    }

    return (
        <nav className="toc-container sticky top-12">
            <ul className="toc-list space-y-2">
                {headings.map((heading) => (
                    <li key={heading.id} className={`toc-item toc-level-${heading.level}`} style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}>
                        <a href={`#${heading.id}`} onClick={(e) => handleClick(e, heading.id)}
                            className={`toc-link block py-1 px-2 rounded text-sm transition-colors
                                ${
                                    activeId === heading.id
                                    ? "bg-accent-secondary/20 text-accent-secondary font-medium"
                                    : "text-foreground-light/70 hover:text-foreground-light hover:bg-foreground-light/5"
                                }
                            `}>
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
