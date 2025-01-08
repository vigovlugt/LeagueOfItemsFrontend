import NextDocument, { Html, Head, Main, NextScript } from "next/document";

import { GA_TRACKING_ID } from "../lib/ga";

export default class Document extends NextDocument {
    render() {
        return (
            <Html>
                <Head>
                    {/* Global Site Tag (gtag.js) - Google Analytics */}
                    <script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
                        }}
                    />
                    {/* Microsoft Clarity */}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "6t1rdrb8ui");
          `,
                        }}
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@700&display=swap"
                        rel="stylesheet"
                    ></link>
                    <link
                        type="application/opensearchdescription+xml"
                        rel="search"
                        href="/opensearchdescription.xml"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
