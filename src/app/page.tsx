"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import config, { LIGHT_BG_SECTIONS } from "../lib/config";
import { usePageVM } from "../viewmodels/usePageVM";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomeSection from "../components/HomeSection";
import PageDots from "../components/PageDots";

const IAssetsSection = dynamic(() => import("../components/IAssetsSection"));
const FlyBaySection = dynamic(() => import("../components/FlyBaySection"));
const BlogSection = dynamic(() => import("../components/BlogSection"));
const SocialSection = dynamic(() => import("../components/SocialSection"));

const PAGE_IDS = config.sections.map((s) => s.id);
const FIRST_PAGE_ID = PAGE_IDS[0];
const LAST_PAGE_ID = PAGE_IDS[PAGE_IDS.length - 1];

export default function Home() {
  const { activePage, setActivePage, dotsVisible, hitokoto, bgUrl, bgUrlSocial, bgThumb, bgThumbSocial } = usePageVM(
    PAGE_IDS,
    config.home.backgrounds,
    config.home.backgroundsThumb ?? []
  );
  const [headerTone, setHeaderTone] = useState<"light" | "dark">("light");
  const [showPageDown, setShowPageDown] = useState(true);

  const activeIdx = config.sections.findIndex((s) => s.id === activePage);
  const nextSection = config.sections[activeIdx + 1];
  const isLight = LIGHT_BG_SECTIONS.has(activePage);

  useEffect(() => {
    if (activePage !== LAST_PAGE_ID) {
      setShowPageDown(true);
      return;
    }

    const timer = window.setTimeout(() => {
      setShowPageDown(false);
    }, 360);

    return () => window.clearTimeout(timer);
  }, [activePage]);

  useEffect(() => {
    if (activePage !== FIRST_PAGE_ID && activePage !== LAST_PAGE_ID) return;
    const thumb = activePage === FIRST_PAGE_ID ? bgThumb : bgThumbSocial;
    if (!thumb) return;

    let cancelled = false;
    const img = new window.Image();
    img.onload = () => {
      if (cancelled) return;
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);
        const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let lumTotal = 0;
        const px = data.length / 4;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i] ?? 0;
          const g = data[i + 1] ?? 0;
          const b = data[i + 2] ?? 0;
          lumTotal += 0.2126 * r + 0.7152 * g + 0.0722 * b;
        }
        const avgLum = px > 0 ? lumTotal / px : 0;
        setHeaderTone(avgLum > 150 ? "dark" : "light");
      } catch {
        setHeaderTone("light");
      }
    };
    img.onerror = () => !cancelled && setHeaderTone("light");
    img.src = thumb;
    return () => {
      cancelled = true;
    };
  }, [activePage, bgThumb, bgThumbSocial]);

  return (
    <main className="page-stack">
      {(activePage === FIRST_PAGE_ID || activePage === LAST_PAGE_ID) && (
        <Header
          brand={config.site.title}
          brandHref={config.site.homeHref}
          nav={config.nav}
          tone={headerTone}
        />
      )}

      {config.sections.map((section) => {
        if (section.type === "home") {
          return (
            <HomeSection
              key={section.id}
              hitokoto={hitokoto}
              bgUrl={bgUrl}
              bgThumb={bgThumb}
            />
          );
        }
        if (section.type === "iassets") {
          return (
            <IAssetsSection
              key={section.id}
              shots={config.iassets.mosaicShots}
              columns={config.iassets.mosaicColumns}
              durations={config.iassets.mosaicDurations}
              delays={config.iassets.mosaicDelays}
              buttons={config.iassets.buttons}
            />
          );
        }
        if (section.type === "flybay") {
          return (
            <FlyBaySection
              key={section.id}
              titleLines={config.flybay.titleLines}
              descriptionLines={config.flybay.descriptionLines}
              siteHref={config.flybay.siteHref}
              primaryHref={config.flybay.primaryHref}
              secondaryHref={config.flybay.secondaryHref}
              logo={config.flybay.logo}
              institutions={config.flybay.institutions}
              ctaLabel={config.flybay.ctaLabel}
            />
          );
        }
        if (section.type === "blog") {
          return (
            <BlogSection
              key={section.id}
              title={config.blog.title}
              viewAllLabel={config.blog.viewAllLabel}
              viewAllHref={config.blog.viewAllHref}
              fallbackImage={config.blog.fallbackImage}
              posts={config.blog.posts}
            />
          );
        }
        if (section.type === "social") {
          return (
            <SocialSection
              key={section.id}
              links={config.social.links}
              bgUrl={bgUrlSocial}
              bgThumb={bgThumbSocial}
              isLight={isLight}
            />
          );
        }
        return null;
      })}

      {showPageDown && nextSection && (
        <a
          className={`global-page-down${isLight ? " global-page-down--light" : ""}${activePage === LAST_PAGE_ID ? " global-page-down--fadeout" : ""}`}
          href={`#${nextSection.id}`}
          aria-label="跳转到下一页"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.95" />
            <path
              d="M8.2 10.4a.8.8 0 0 1 1.13 0L12 13.07l2.67-2.67a.8.8 0 1 1 1.13 1.13l-3.24 3.24a.8.8 0 0 1-1.13 0L8.2 11.53a.8.8 0 0 1 0-1.13Z"
              className="global-page-down-arrow"
            />
          </svg>
        </a>
      )}

      <div className="global-footer">
        <Footer
          showPhotoCredit={activePage === "home" || activePage === "social"}
          showCopyright={activePage === "social"}
          photoCredit={config.home.photoCredit}
          copyrightStartYear={config.site.copyrightStartYear}
          siteLabel={config.site.title}
          siteHref={config.site.homeHref}
          tone={headerTone}
        />
      </div>

      <PageDots
        dots={config.sections.map((s) => ({ id: s.id, label: s.dotLabel }))}
        activePage={activePage}
        visible={dotsVisible}
      />
    </main>
  );
}
