import fs from "fs";
import { join } from "path";
import { NextSeo } from "next-seo";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export default function Faq({ content }) {
    return (
        <>
            <NextSeo title="FAQ" />

            <ReactMarkdown
                className="prose-lg prose-blue"
                components={{
                    a: ({ children, href }) => (
                        <Link
                            href={href}
                            target={
                                (href as string).startsWith("/")
                                    ? null
                                    : "_blank"
                            }
                        >
                            {children}
                        </Link>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </>
    );
}

export async function getStaticProps() {
    const markdownDir = join(process.cwd(), "content/faq.md");

    const content = fs.readFileSync(markdownDir).toString();

    return {
        props: {
            content,
        },
    };
}

Faq.pageName = "FAQ";
