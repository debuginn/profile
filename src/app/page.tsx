"use client";

import config from "../lib/config";
import { usePageVM } from "../viewmodels/usePageVM";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomeSection from "../components/HomeSection";
import IAssetsSection from "../components/IAssetsSection";
import FlyBaySection from "../components/FlyBaySection";
import SocialSection from "../components/SocialSection";
import PageDots from "../components/PageDots";

const PAGE_IDS = config.sections.map((s) => s.id);
const LIGHT_BG_SECTIONS = new Set(
  config.sections.filter((s) => s.type === "flybay").map((s) => s.id)
);

export default function Home() {
  const { activePage, setActivePage, hitokoto, bgUrl, bgUrlSocial } = usePageVM(PAGE_IDS, config.home.backgrounds);

  const activeIdx = config.sections.findIndex((s) => s.id === activePage);
  const nextSection = config.sections[activeIdx + 1];
  const isLight = LIGHT_BG_SECTIONS.has(activePage);

  return (
    <main className="page-stack">
      <Header
        brand={config.site.title}
        brandHref={config.site.url}
        nav={config.nav}
      />

      {config.sections.map((section) => {
        if (section.type === "home") {
          return (
            <HomeSection
              key={section.id}
              hitokoto={hitokoto}
              bgUrl={bgUrl}
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
        if (section.type === "social") {
          return (
            <SocialSection
              key={section.id}
              links={config.social.links}
              bgUrl={bgUrlSocial}
              isLight={isLight}
            />
          );
        }
        return null;
      })}

      {nextSection && (
        <a
          className={`global-page-down${isLight ? " global-page-down--light" : ""}`}
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
          copyrightYear={config.site.copyrightYear}
          siteLabel={config.site.title}
          siteHref={config.site.url}
        />
      </div>

      <PageDots
        dots={config.sections.map((s) => ({ id: s.id, label: s.dotLabel }))}
        activePage={activePage}
        onDotClick={setActivePage}
      />
    </main>
  );
}
