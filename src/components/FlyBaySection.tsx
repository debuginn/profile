"use client";

import HeroSection from "../../vendor/flybay/src/components/HeroSection";
import WorldMap from "../../vendor/flybay/src/components/WorldMap";
import PosterButton from "../../vendor/flybay/src/components/PosterButton";
import type { HeroAction } from "../../vendor/flybay/src/components/HeroSection";
import type { PosterConfig } from "../../vendor/flybay/src/components/PosterButton";

type Props = {
  titleLines: string[];
  descriptionLines: string[];
  siteHref: string;
  primaryHref: string;
  secondaryHref: string;
  logo: string;
  institutions: unknown[];
  ctaLabel: string;
  poster: PosterConfig;
};

export default function FlyBaySection({ titleLines, descriptionLines, primaryHref, secondaryHref, logo, ctaLabel, poster }: Props) {
  const month = new Date().getMonth() + 1;

  const actions: HeroAction[] = [
    { label: "立即测算返利", href: primaryHref },
    { label: "查看可开机构", href: secondaryHref },
  ];

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
          tag={`${month} 月返利加码中`}
          title={titleLines}
          description={descriptionLines}
          actions={actions}
          extraActions={
            <PosterButton poster={poster} label={ctaLabel} variant="outline" />
          }
          mapSlot={<WorldMap />}
        />
      </div>
    </section>
  );
}
