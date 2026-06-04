export type NavItem = {
  label: string;
  href: string;
};

export type PhotoCredit = {
  text: string;
  linkLabel: string;
  linkHref: string;
  suffix: string;
};

export type ButtonVariant = "primary" | "ghost";
export type ButtonIcon = "apple" | "chevron-right";

export type CtaButton = {
  label: string;
  href: string;
  variant: ButtonVariant;
  icon: ButtonIcon;
};

export type SectionType = "home" | "iassets" | "flybay" | "blog" | "social";

export type BlogPost = {
  title: string;
  link: string;
  date: string;
  image: string;
  excerpt: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: string;
  followers?: number;
};

export type SectionDef = {
  id: string;
  type: SectionType;
  dotLabel: string;
};

export type SiteConfig = {
  site: {
    title: string;
    homeHref: string;
    url: string;
    description: string;
    copyrightStartYear: number;
  };
  nav: NavItem[];
  sections: SectionDef[];
  home: {
    photoCredit: PhotoCredit | null;
    scrollToId: string;
    backgrounds: string[];
    backgroundsThumb?: string[];
  };
  iassets: {
    mosaicShots: string[];
    mosaicColumns: number;
    mosaicDurations: string[];
    mosaicDelays: string[];
    buttons: CtaButton[];
  };
  blog: {
    feedUrl: string;
    title: string;
    viewAllLabel: string;
    viewAllHref: string;
    posts: BlogPost[];
  };
  social: {
    links: SocialLink[];
  };
};

import siteConfig from "../config/site";

/** Sections that render on a light/photo-y background — used to flip nav + dot tones. */
export const LIGHT_BG_SECTIONS = new Set(
  siteConfig.sections.filter((s) => s.type === "flybay").map((s) => s.id),
);

/**
 * 每个 section 对应的 iOS Safari theme-color（状态栏/底部工具栏取色）。
 * 值须与 globals.css 的 .page-stack[data-active=...] 底色保持一致。
 * 滚到某屏时由 page.tsx 动态写入 <meta name="theme-color">，
 * 让 Safari 顶/底 UI 区跟随当前屏背景，消除黑条/留白。
 */
const SECTION_THEME_COLOR_BY_TYPE: Record<SectionType, string> = {
  home: "#0b1220",
  iassets: "#060a12",
  flybay: "#f5f7ee",
  blog: "#05080b",
  social: "#0b1220",
};

export const SECTION_THEME_COLORS: Record<string, string> = Object.fromEntries(
  siteConfig.sections.map((s) => [s.id, SECTION_THEME_COLOR_BY_TYPE[s.type]]),
);

/** 默认/兜底 theme-color（首屏初始值，与 layout.tsx viewport.themeColor 一致）。 */
export const DEFAULT_THEME_COLOR = SECTION_THEME_COLORS[siteConfig.sections[0]?.id ?? ""] ?? "#0b1220";

export { default } from "../config/site";
