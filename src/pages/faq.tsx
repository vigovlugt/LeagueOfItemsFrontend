import fs from "fs";
import { join } from "path";
import { NextSeo } from "next-seo";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export default function Faq({ content }) {
    return (
        <>
            <NextSeo title="FAQ" />

            <div className="prose-lg prose-blue">
                <ReactMarkdown
                    // className="prose-lg prose-blue" TODO
                    components={{
                        a: ({ children, href }: any) => (
                            <Link
                                prefetch={false}
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
            </div>
        </>
    );
}

export async function getStaticProps() {
    const markdownDir = join(process.cwd(), "content/faq.md");

    const content = fs.readFileSync(markdownDir).toString(); // TODO

    return {
        props: {
            content,
        },
    };
}

Faq.pageName = "FAQ";
