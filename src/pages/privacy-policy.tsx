import fs from "fs";
import { join } from "path";
import { NextSeo } from "next-seo";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export default function PrivacyPolicy({ content }) {
    return (
        <>
            <NextSeo title="Privacy Policy" />
        </>
    );
}

PrivacyPolicy.pageName = "Privacy Policy";

