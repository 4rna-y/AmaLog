export interface Heading {
    id: string;
    text: string;
    level: number;
}

export interface HeadingTree {
    heading: Heading;
    children: Heading[];
}

export function extractHeadings(content: string[]): Heading[] {
    const headings: Heading[] = [];

    content.forEach((item) => {
        const match = item.match(/^md\(([\s\S]*)\)$/);
        if (!match) return;

        const markdown = match[1];

        const headingRegex = /^(#{1,3})\s+(.+)$/gm;
        let headingMatch;

        while ((headingMatch = headingRegex.exec(markdown)) !== null) {
            const level = headingMatch[1].length;
            const text = headingMatch[2].trim();

            const id = text
                .toLowerCase()
                .replace(/[^a-z0-9\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim();

            headings.push({
                id: id || `heading-${headings.length}`,
                text,
                level,
            });
        }
    });

    return headings;
}

export function generateHeadingId(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim() || 'heading';
}

export function buildHeadingTree(headings: Heading[]): HeadingTree[] {
    const tree: HeadingTree[] = [];
    let currentH1: HeadingTree | null = null;

    headings.forEach((heading) => {
        if (heading.level === 1) {
            currentH1 = { heading, children: [] };
            tree.push(currentH1);
        } else if (currentH1 && (heading.level === 2 || heading.level === 3)) {
            currentH1.children.push(heading);
        } else if (!currentH1 && (heading.level === 2 || heading.level === 3)) {
            const virtualH1: Heading = {
                id: 'root',
                text: '',
                level: 1,
            };
            currentH1 = { heading: virtualH1, children: [heading] };
            tree.push(currentH1);
        }
    });

    return tree;
}
