"use client";

import { useEffect, useState } from "react";
import config from "../lib/config";
import { usePageVM } from "../viewmodels/usePageVM";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomeSection from "../components/HomeSection";
import IAssetsSection from "../components/IAssetsSection";
import FlyBaySection from "../components/FlyBaySection";
import BlogSection from "../components/BlogSection";
import SocialSection from "../components/SocialSection";
import PageDots from "../components/PageDots";

const PAGE_IDS = config.sections.map((s) => s.id);
const FIRST_PAGE_ID = PAGE_IDS[0];
const LAST_PAGE_ID = PAGE_IDS[PAGE_IDS.length - 1];
const LIGHT_BG_SECTIONS = new Set(
  config.sections.filter((s) => s.type === "flybay").map((s) => s.id)
);

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
    const getToneFromImage = async (src: string, fallback: "light" | "dark") => {
      if (!src) return fallback;
      return new Promise<"light" | "dark">((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.referrerPolicy = "no-referrer";
        img.onload = () => {
          try {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d", { willReadFrequently: true });
            if (!ctx) {
              resolve(fallback);
              return;
            }
            canvas.width = 32;
            canvas.height = 32;
            ctx.drawImage(img, 0, 0, 32, 32);
            const { data } = ctx.getImageData(0, 0, 32, 32);
            let lumTotal = 0;
            let count = 0;
            for (let i = 0; i < data.length; i += 4) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
              lumTotal += 0.2126 * r + 0.7152 * g + 0.0722 * b;
              count += 1;
            }
            const avgLum = count > 0 ? lumTotal / count : 0;
            resolve(avgLum > 150 ? "dark" : "light");
          } catch {
            resolve(fallback);
          }
        };
        img.onerror = () => resolve(fallback);
        img.src = src;
      });
    };

    let cancelled = false;
    const syncTone = async () => {
      if (activePage === FIRST_PAGE_ID) {
        const tone = await getToneFromImage(bgUrl, "light");
        if (!cancelled) setHeaderTone(tone);
        return;
      }
      if (activePage === LAST_PAGE_ID) {
        const tone = await getToneFromImage(bgUrlSocial, "light");
        if (!cancelled) setHeaderTone(tone);
      }
    };

    syncTone();
    return () => {
      cancelled = true;
    };
  }, [activePage, bgUrl, bgUrlSocial]);

  return (
    <main className="page-stack">
      {activePage === FIRST_PAGE_ID && (
        <Header
          brand={config.site.title}
          brandHref={config.site.homeHref}
          nav={config.nav}
          tone={headerTone}
        />
      )}
      {activePage === LAST_PAGE_ID && (
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
