"use client";

import { useEffect, useState, useRef } from "react";

export type ActivePage = string;

type BackgroundSelection = {
  bgUrl: string;
  bgUrlSocial: string;
  bgThumb: string;
  bgThumbSocial: string;
};

type QuoteApi = {
  endpoint: string;
  linkBase: string;
};

const DEFAULT_QUOTE_API: QuoteApi = {
  endpoint: "https://v1.hitokoto.cn/?encode=json",
  linkBase: "https://hitokoto.cn/?id=",
};
const EMPTY_BACKGROUNDS_THUMB: string[] = [];

function pickBackgrounds(backgrounds: string[], backgroundsThumb: string[] = EMPTY_BACKGROUNDS_THUMB): BackgroundSelection {
  if (backgrounds.length === 0) {
    return { bgUrl: "", bgUrlSocial: "", bgThumb: "", bgThumbSocial: "" };
  }

  const pickIdx = () => Math.floor(Math.random() * backgrounds.length);
  const primaryIdx = pickIdx();
  let socialIdx = pickIdx();
  if (backgrounds.length > 1) {
    while (socialIdx === primaryIdx) socialIdx = pickIdx();
  }

  return {
    bgUrl: backgrounds[primaryIdx] ?? "",
    bgUrlSocial: backgrounds[socialIdx] ?? "",
    bgThumb: backgroundsThumb[primaryIdx] ?? "",
    bgThumbSocial: backgroundsThumb[socialIdx] ?? "",
  };
}

export function usePageVM(
  pageIds: string[],
  backgrounds: string[],
  backgroundsThumb: string[] = EMPTY_BACKGROUNDS_THUMB,
  quoteApi: QuoteApi = DEFAULT_QUOTE_API
) {
  const [activePage, setActivePage] = useState<ActivePage>("home");
  const [dotsVisible, setDotsVisible] = useState(true);
  const [hitokoto, setHitokoto] = useState(":D 获取中...");
  const [hitokotoUrl, setHitokotoUrl] = useState("#");
  const [{ bgUrl, bgUrlSocial, bgThumb, bgThumbSocial }, setBackgroundSelection] = useState<BackgroundSelection>({
    bgUrl: "",
    bgUrlSocial: "",
    bgThumb: "",
    bgThumbSocial: "",
  });
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const backgroundTimer = window.setTimeout(() => {
      setBackgroundSelection(pickBackgrounds(backgrounds, backgroundsThumb));
    }, 0);

    return () => window.clearTimeout(backgroundTimer);
  }, [backgrounds, backgroundsThumb]);

  useEffect(() => {
    fetch(quoteApi.endpoint)
      .then((r) => r.json())
      .then((data) => {
        setHitokoto(data.hitokoto || "");
        setHitokotoUrl(data.from ? `${quoteApi.linkBase}${data.id}` : "#");
      })
      .catch(() => {
        setHitokoto("");
        setHitokotoUrl("#");
      });
  }, [quoteApi.endpoint, quoteApi.linkBase]);

  useEffect(() => {
    const syncByHash = () => {
      const id = window.location.hash.replace("#", "");
      setActivePage(pageIds.includes(id) ? id : "home");
    };

    const root = document.querySelector(".page-stack");
    const els = pageIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    syncByHash();
    window.addEventListener("hashchange", syncByHash);
    hideTimer.current = setTimeout(() => setDotsVisible(false), 1000);

    if (!root || els.length === 0) {
      return () => window.removeEventListener("hashchange", syncByHash);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        setActivePage(visible.target.id);
        setDotsVisible(true);
        if (hideTimer.current) clearTimeout(hideTimer.current);
        hideTimer.current = setTimeout(() => setDotsVisible(false), 1000);
      },
      { root, threshold: [0.45, 0.6, 0.8] }
    );

    els.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", syncByHash);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [pageIds]);

  return { activePage, setActivePage, dotsVisible, hitokoto, hitokotoUrl, bgUrl, bgUrlSocial, bgThumb, bgThumbSocial };
}
