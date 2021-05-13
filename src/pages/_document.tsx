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

          {/*Hotjar Tracking Code for leagueofitems.com*/}
          <script
            dangerouslySetInnerHTML={{
              __html: `
            (function(h,o,t,j,a,r){
            h.hj = h.hj || function () {
              (h.hj.q = h.hj.q || []).push(arguments)
            };
            h._hjSettings={hjid:2382483,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `,
            }}
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap"
            rel="stylesheet"
          />
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
