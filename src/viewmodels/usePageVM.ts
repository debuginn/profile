"use client";

import { useEffect, useState } from "react";

export type ActivePage = string;

export function usePageVM(pageIds: string[], backgrounds: string[]) {
  const [activePage, setActivePage] = useState<ActivePage>("home");
  const [hitokoto, setHitokoto] = useState(":D 获取中...");
  const [hitokotoUrl, setHitokotoUrl] = useState("#");
  const [bgUrl, setBgUrl] = useState("");

  useEffect(() => {
    if (backgrounds.length > 0) {
      setBgUrl(backgrounds[Math.floor(Math.random() * backgrounds.length)]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetch("https://v1.hitokoto.cn/?encode=json")
      .then((r) => r.json())
      .then((data) => {
        setHitokoto(data.hitokoto || "");
        setHitokotoUrl(data.from ? `https://hitokoto.cn/?id=${data.id}` : "#");
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const syncByHash = () => {
      const id = window.location.hash.replace("#", "");
      setActivePage(pageIds.includes(id) ? id : "home");
    };

    const root = document.querySelector(".page-stack");
    const els = pageIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    syncByHash();
    window.addEventListener("hashchange", syncByHash);

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
      },
      { root, threshold: [0.45, 0.6, 0.8] }
    );

    els.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", syncByHash);
    };
  }, [pageIds]);

  return { activePage, setActivePage, hitokoto, hitokotoUrl, bgUrl };
}
