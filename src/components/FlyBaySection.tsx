"use client";

import HeroSection from "../../vendor/flybay/src/components/HeroSection";
import WorldMap from "../../vendor/flybay/src/components/WorldMap";
import PosterButton from "../../vendor/flybay/src/components/PosterButton";
import type { HeroAction } from "../../vendor/flybay/src/components/HeroSection";
import type { PosterConfig } from "../../vendor/flybay/src/components/PosterButton";
import flyBayConfig from "../../vendor/flybay/config/flybay.config.json";

function buildProps() {
  const config = flyBayConfig;
  const BASE = config.site.baseUrl;
  const abs = (src: string) => src.startsWith("/") ? `${BASE}${src}` : src;
  const hero = config.home.hero;
  const month = new Date().getMonth() + 1;

  const poster: PosterConfig = {
    tag: config.poster.tag,
    title: config.poster.title,
    subtitle: config.poster.subtitle,
    logo: abs(config.poster.logo),
    qrImage: abs(config.poster.qrImage),
    logos: config.institutions
      .filter((i) => i.card.logo)
      .map((i) => ({ src: abs(i.card.logo as string), name: i.name })),
    stats: config.home.metrics.counters.map((c) => ({ num: String(c.value), label: c.label })),
  };

  const absHref = (href: string) => href.startsWith("#") ? `${BASE}/${href}` : href;

  const actions: HeroAction[] = [
    { label: hero.primaryAction.label, href: absHref(hero.primaryAction.href), target: "_blank" },
    { label: hero.secondaryAction.label, href: absHref(hero.secondaryAction.href), target: "_blank" },
  ];

  return {
    tag: `${month} 月${hero.activityTagText}`,
    titleLines: hero.titleLines,
    descriptionLines: hero.descriptionLines,
    logo: abs(config.site.logo),
    actions,
    shareActionLabel: hero.shareActionLabel,
    poster,
  };
}

export default function FlyBaySection() {
  const { tag, titleLines, descriptionLines, logo, actions, shareActionLabel, poster } = buildProps();

  return (
    <section className="page-screen page-screen-flybay" id="flybay">
      <div className="fb-page">
        <HeroSection
          logo={
            <img
              src={logo}
              alt="FlyBay Plan 飞湾计划"
              style={{ height: "auto", width: "140px" }}
              loading="lazy"
              decoding="async"
            />
          }
          tag={tag}
          title={titleLines}
          description={descriptionLines}
          actions={actions}
          extraActions={
            <PosterButton poster={poster} label={shareActionLabel} variant="outline" />
          }
          mapSlot={<WorldMap />}
        />
      </div>
    </section>
  );
}
