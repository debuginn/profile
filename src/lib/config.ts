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

export { default } from "../config/site";
