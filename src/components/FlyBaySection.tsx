"use client";

import { useEffect, useState } from "react";
import HeroSection from "../../vendor/flybay/src/components/HeroSection";
import WorldMap from "../../vendor/flybay/src/components/WorldMap";
import PosterButton from "../../vendor/flybay/src/components/PosterButton";
import type { HeroAction } from "../../vendor/flybay/src/components/HeroSection";
import type { PosterConfig } from "../../vendor/flybay/src/components/PosterButton";
import flyBayConfig from "../../vendor/flybay/config/config.json";

type ProfileAnnouncement = {
  id: string;
  date: string;
  label: string;
  text: string;
  logo?: string;
  registerUrl?: string;
  gradient?: string;
};

const ANNOUNCEMENT_STYLES = `
.pfb-announcement {
  display: flex;
  width: 100%;
  height: 40px;
  align-items: center;
  gap: 8px;
  padding: 0 12px 0 8px;
  border: 1px solid rgba(181,206,181,0.7);
  border-radius: 999px;
  background: rgba(28,43,34,0.045);
  box-shadow: 0 2px 12px rgba(28,58,42,0.04);
  box-sizing: border-box;
  color: #152118;
}
.pfb-announcement-logo {
  width: 28px;
  height: 28px;
  flex: none;
  border-radius: 50%;
  object-fit: cover;
  background: #fff;
  box-shadow: 0 2px 8px rgba(28,43,34,0.12);
}
.pfb-announcement-date {
  flex: none;
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(63,159,95,0.12);
  color: #1f6b3f;
  font-size: 11px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
.pfb-announcement-copy {
  min-width: 0;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 13px;
  line-height: 20px;
  color: rgba(21,33,24,0.85);
}
.pfb-announcement-register {
  flex: none;
  padding: 6px 12px;
  border-radius: 999px;
  color: #fff !important;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  opacity: 0;
  pointer-events: none;
  transition: opacity 160ms ease, filter 160ms ease;
}
.pfb-announcement:hover .pfb-announcement-register,
.pfb-announcement:focus-within .pfb-announcement-register {
  opacity: 1;
  pointer-events: auto;
}
.pfb-announcement-register:hover { filter: brightness(0.9); }
.pfb-announcement-dots { display: flex; flex: none; align-items: center; gap: 4px; }
.pfb-announcement-dot {
  width: 4px;
  height: 4px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: rgba(21,33,24,0.2);
  cursor: pointer;
  transition: width 160ms ease, background 160ms ease;
}
.pfb-announcement-dot[aria-current="true"] { width: 12px; background: #1f6b3f; }
@media (max-width: 767px) {
  .pfb-announcement-date { display: none; }
  .pfb-announcement-register { opacity: 1; pointer-events: auto; }
}
`;

function formatAnnouncementDate(date: string) {
  const match = date.match(/\d{4}-(\d{2})-(\d{2})/);
  return match ? `${match[1]}-${match[2]}` : date;
}

function cardGradientToCss(gradient?: string) {
  const match = gradient?.match(/^bg-\[(.+)\]$/);
  return match?.[1]?.replaceAll("_", " ");
}

function FlyBayAnnouncementBar({ items }: { items: ProfileAnnouncement[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, 9000);
    return () => window.clearInterval(timer);
  }, [items.length]);

  if (!items.length) return null;
  const current = items[index] ?? items[0]!;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ANNOUNCEMENT_STYLES }} />
      <div className="pfb-announcement" role="region" aria-label="站点公告" aria-live="polite">
        {current.logo ? <img className="pfb-announcement-logo" src={current.logo} alt="" /> : null}
        <span className="pfb-announcement-date">{formatAnnouncementDate(current.date)}</span>
        <span className="pfb-announcement-copy">
          {current.label ? `${current.label} · ` : ""}{current.text}
        </span>
        {current.registerUrl ? (
          <a
            className="pfb-announcement-register"
            href={current.registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: current.gradient ?? "#1f6b3f" }}
            aria-label={`立即注册：${current.text}`}
          >
            立即注册
          </a>
        ) : null}
        {items.length > 1 ? (
          <span className="pfb-announcement-dots">
            {items.map((item, itemIndex) => (
              <button
                key={item.id}
                type="button"
                className="pfb-announcement-dot"
                aria-label={`查看第 ${itemIndex + 1} 条公告`}
                aria-current={itemIndex === index}
                onClick={() => setIndex(itemIndex)}
              />
            ))}
          </span>
        ) : null}
      </div>
    </>
  );
}

function buildProps() {
  const config = flyBayConfig;
  const BASE = config.site.baseUrl;
  const abs = (src: string) => src.startsWith("/") ? `${BASE}${src}` : src;
  const hero = config.home.hero as typeof config.home.hero & {
    primaryAction?: HeroAction;
    secondaryAction?: HeroAction;
    tertiaryAction?: HeroAction;
    fourthAction?: HeroAction;
  };
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
    stats: (() => {
      const active = config.institutions.filter((i) => i.paused !== true);
      const regions = new Set(active.flatMap((i) => i.regions ?? []));
      const types = new Set(active.flatMap((i) => i.accountTypes ?? []));
      return [
        { num: String(active.length), label: "合作机构" },
        { num: String(regions.size || 1), label: "覆盖市场" },
        { num: String(types.size || 1), label: "开户类型" },
      ];
    })(),
  };

  const absHref = (href: string) => href.startsWith("#") ? `${BASE}/${href}` : href;

  // flyBay hero actions are optional; keep icon so compass/etc render correctly
  const actions: HeroAction[] = [
    hero.primaryAction,
    hero.secondaryAction,
    hero.tertiaryAction,
    hero.fourthAction,
  ]
    .filter((a): a is HeroAction => Boolean(a?.label && a?.href))
    .map((a) => ({
      label: a.label,
      href: absHref(a.href),
      target: "_blank",
      ...(a.icon ? { icon: a.icon } : {}),
    }));

  const now = Date.now();
  const institutionsBySlug = new Map(config.institutions.map((institution) => [institution.slug, institution]));
  const announcements: ProfileAnnouncement[] = config.home.announcements
    .filter((announcement) => {
      const timed = announcement as typeof announcement & { show?: boolean };
      return timed.show !== false
        && announcement.scope.includes("home")
        && (!announcement.startTime || new Date(announcement.startTime).getTime() <= now)
        && (!announcement.endTime || new Date(announcement.endTime).getTime() >= now);
    })
    .map((announcement) => {
      const slug = announcement.scope.find((scope) => scope !== "home" && !scope.startsWith("page:"));
      const institution = slug ? institutionsBySlug.get(slug) : undefined;
      return {
        id: announcement.id,
        date: announcement.date,
        label: announcement.label,
        text: announcement.text,
        logo: announcement.logo ? abs(announcement.logo) : institution?.card.logo ? abs(institution.card.logo) : undefined,
        registerUrl: institution?.registerUrl || undefined,
        gradient: cardGradientToCss(institution?.card.gradient),
      };
    });

  return {
    tag: `${month} 月${hero.activityTagText}`,
    titleLines: hero.titleLines,
    descriptionLines: hero.descriptionLines,
    logo: abs(config.site.logo),
    actions,
    shareActionLabel: hero.shareActionLabel,
    showShareButton: hero.showShareButton ?? false,
    poster,
    announcements,
  };
}

export default function FlyBaySection() {
  const { tag, titleLines, descriptionLines, logo, actions, shareActionLabel, showShareButton, poster, announcements } = buildProps();

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
          extraActions={showShareButton ? <PosterButton poster={poster} label={shareActionLabel} variant="outline" /> : null}
          belowActions={<FlyBayAnnouncementBar items={announcements} />}
          mapSlot={<WorldMap />}
        />
      </div>
    </section>
  );
}
