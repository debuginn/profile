import type { Metadata } from "next";
import Script from "next/script";
import config from "../lib/config";
import "./globals.css";

export const metadata: Metadata = {
  title: config.site.title,
  description: config.site.description
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="dns-prefetch" href="https://webp.debuginn.com" />
        <link rel="preconnect" href="https://webp.debuginn.com" />
        <link rel="preconnect" href="https://webp.debuginn.com" crossOrigin="anonymous" />
        <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
        <link rel="manifest" href="/static/site.webmanifest" />
        <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="stylesheet" href="/static/bootstrap.min.css" />
        <link rel="stylesheet" href="/static/ie10-viewport-bug-workaround.css" />
        <link rel="stylesheet" href="/static/cover.css" />
      </head>
      <body>
        {children}
        <Script src="/static/jquery.min.js" strategy="beforeInteractive" />
        <Script src="/static/bootstrap.min.js" strategy="afterInteractive" />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-B1XEJXPQPW" strategy="afterInteractive" />
        <Script id="ga" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-B1XEJXPQPW');`}
        </Script>
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "jsxxcoctis");`}
        </Script>
      </body>
    </html>
  );
}
