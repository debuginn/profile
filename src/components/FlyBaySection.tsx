"use client";

import HeroSection from "./flybay/HeroSection";
import WorldMap from "./flybay/WorldMap";
import type { HeroAction } from "./flybay/HeroSection";

type Props = {
  titleLines: string[];
  descriptionLines: string[];
  siteHref: string;
  primaryHref: string;
  secondaryHref: string;
  logo: string;
  institutions: unknown[];
  ctaLabel: string;
};

export default function FlyBaySection({ titleLines, descriptionLines, primaryHref, secondaryHref, siteHref, logo, ctaLabel }: Props) {
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
            <a
              href={siteHref}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                borderRadius: "9999px",
                border: "1px solid #b5ceb5",
                background: "#fff",
                padding: "0.75rem 1.5rem",
                fontWeight: 600,
                color: "#1c3a2a",
                textDecoration: "none",
                fontSize: "0.95rem",
              }}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
              {ctaLabel}
            </a>
          }
          mapSlot={<WorldMap />}
        />
      </div>
    </section>
  );
}
