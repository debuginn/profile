import type { Metadata, Viewport } from "next";
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
const alternateUrl = config.site.url.includes(".cn") ? "https://debuginn.com" : "https://debuginn.cn";
const alternateLanguages = config.site.alternates ?? {
  "zh-CN": config.site.url.includes(".cn") ? config.site.url : alternateUrl,
  "x-default": config.site.url.includes(".cn") ? alternateUrl : config.site.url,
};
const themeColor = config.site.themeColor ?? "#0b1220";
const assetOrigins = config.site.assetOrigins ?? [];
const googleTagId = config.site.analytics?.googleTagId;
const clarityId = config.site.analytics?.clarityId;

export const metadata: Metadata = {
  metadataBase: new URL(config.site.url),
  title: config.site.title,
  description: config.site.description,
  alternates: {
    canonical: config.site.url,
    languages: alternateLanguages,
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // iOS Safari：内容延伸进刘海/状态栏区域，消顶部留白
  viewportFit: "cover",
  // 单一静态深色：状态栏/工具栏染成与站点底色一致的深色
  themeColor,
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        {assetOrigins.map((origin) => (
          <link key={`${origin}-dns`} rel="dns-prefetch" href={origin} />
        ))}
        {assetOrigins.map((origin) => (
          <link key={`${origin}-preconnect`} rel="preconnect" href={origin} crossOrigin="anonymous" />
        ))}
        <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
        <link rel="manifest" href="/static/site.webmanifest" />
        <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color={themeColor} />
      </head>
      <body>
        {children}
        {googleTagId ? (
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`} strategy="afterInteractive" />
        ) : null}
        {googleTagId ? (
          <Script id="ga" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${googleTagId}');`}
          </Script>
        ) : null}
        {clarityId ? (
          <Script id="clarity" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${clarityId}");`}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
