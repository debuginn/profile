"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { SocialLink } from "../lib/config";

function SocialIcon({ icon, label }: { icon: string; label: string }) {
  if (icon === "email") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m2 7 10 7 10-7" />
      </svg>
    );
  }
  if (icon === "github") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    );
  }
  if (icon === "blog") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <circle cx="5" cy="19" r="2" />
        <path d="M4 4a16 16 0 0 1 16 16h-3A13 13 0 0 0 4 7V4z" />
        <path d="M4 11a9 9 0 0 1 9 9H10a6 6 0 0 0-6-6v-3z" />
      </svg>
    );
  }
  return <img src={icon} alt={label} width={28} height={28} loading="lazy" decoding="async" />;
}

function useCountUp(target: number, active: boolean, duration = 800) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, active, duration]);

  return active ? count : 0;
}

function BadgeCount({ target, active, isLight }: { target: number; active: boolean; isLight: boolean }) {
  const count = useCountUp(target, active);
  return (
    <span className={`social-btn-badge${isLight ? " social-btn-badge--light" : ""}`}>
      {count}
    </span>
  );
}

type Props = {
  links: SocialLink[];
  bgUrl: string;
  bgThumb: string;
  isLight: boolean;
};

export default function SocialSection({ links, bgUrl, bgThumb, isLight }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const root = el.closest(".page-stack") as HTMLElement | null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !animated) setAnimated(true);
      },
      { root, threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <section ref={sectionRef} className="page-screen page-screen-social" id="social">
      {bgUrl ? (
        <div className="page-bg" aria-hidden="true">
          <Image
            src={bgUrl}
            alt=""
            fill
            sizes="100vw"
            placeholder={bgThumb ? "blur" : "empty"}
            blurDataURL={bgThumb || undefined}
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      ) : null}
      <div className="social-page">
        <div className="social-links">
          {links.map((link) => {
            const isWechat = link.label === "微信";
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className={`social-btn${isWechat ? " social-btn-wechat" : ""}${isLight ? " social-btn--light" : ""}`}
              >
                <span className="social-btn-icon">
                  <SocialIcon icon={link.icon} label={link.label} />
                </span>
                <span className="social-btn-label">{link.label}</span>
                {link.followers != null && (
                  <BadgeCount target={link.followers} active={animated} isLight={isLight} />
                )}
                {isWechat && (
                  <span className="social-btn-qr" aria-hidden="true">
                    <img src="https://webp.debuginn.com/20260529OjuRvn.jpg" alt="微信二维码" width={120} height={120} loading="lazy" decoding="async" />
                  </span>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
