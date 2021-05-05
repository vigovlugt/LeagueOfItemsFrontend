import remark from "remark";
import html from "remark-html";
import fs from "fs";
import { join } from "path";
import { NextSeo } from "next-seo";

export default function Faq({ html }) {
  return (
    <>
      <NextSeo title="FAQ" />

      <div
        className="prose-xl prose-blue"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}

export async function getStaticProps() {
  const markdownDir = join(process.cwd(), "content/faq.md");

  const markdown = fs.readFileSync(markdownDir).toString();

  const result = await remark().use(html).process(markdown);
  return {
    props: {
      html: result.toString(),
    },
  };
}

Faq.pageName = "FAQ";
