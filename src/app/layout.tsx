import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import config from "../lib/config";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const ogImage = config.home.backgrounds[0];
const altUrl = config.site.url.includes(".cn") ? "https://debuginn.com" : "https://debuginn.cn";

export const metadata: Metadata = {
  metadataBase: new URL(config.site.url),
  title: config.site.title,
  description: config.site.description,
  alternates: {
    canonical: config.site.url,
    languages: {
      "zh-CN": config.site.url.includes(".cn") ? config.site.url : altUrl,
      "x-default": config.site.url.includes(".cn") ? altUrl : config.site.url,
    },
  },
  openGraph: {
    type: "website",
    siteName: config.site.title,
    title: config.site.title,
    description: config.site.description,
    url: config.site.url,
    locale: config.site.url.includes(".cn") ? "zh_CN" : "en_US",
    images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: config.site.title }] : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: config.site.title,
    description: config.site.description,
    images: ogImage ? [ogImage] : undefined,
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://webp.debuginn.com" />
        <link rel="preconnect" href="https://webp.debuginn.com" />
        <link rel="preconnect" href="https://webp.debuginn.com" crossOrigin="anonymous" />
        <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
        <link rel="manifest" href="/static/site.webmanifest" />
        <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#5bbad5" />
      </head>
      <body>
        {children}
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
