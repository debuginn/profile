"use client";

import type { ReactNode } from "react";

export type HeroAction = {
  label: string;
  href: string;
};

export type HeroSectionProps = {
  /** 左上角 logo，传 ReactNode 可自定义（图片/文字/SVG 均可） */
  logo?: ReactNode;
  /** 活动标签文字，不传则不显示 */
  tag?: string;
  /** 标题，支持多行 */
  title: string[];
  /** 副标题描述，支持多行 */
  description?: string[];
  /** 主要按钮列表（渲染为 <a> 链接） */
  actions?: HeroAction[];
  /** 额外操作区（如分享按钮等业务特有元素） */
  extraActions?: ReactNode;
  /** 右侧背景区域，不传则为空（可传入 <WorldMap /> 或任意内容） */
  mapSlot?: ReactNode;
  /** 卡片最大宽度，默认不限制（由外层容器控制） */
  maxWidth?: string | number;
};

const SCOPE = "hs1";

const STYLES = `
.${SCOPE}-section {
  position: relative;
  overflow: hidden;
  border-radius: 2rem;
  border: 1px solid rgba(181,206,181,0.7);
  background:
    radial-gradient(ellipse at 18% 8%, rgba(223,244,216,0.7) 0%, rgba(223,244,216,0) 44%),
    radial-gradient(ellipse at 88% 94%, rgba(255,216,139,0.32) 0%, rgba(255,216,139,0) 42%),
    #fffffb;
  padding: 2rem;
  box-shadow: 0 20px 60px rgba(36,74,48,0.12);
  width: 100%;
  box-sizing: border-box;
}
@media (min-width: 768px) {
  .${SCOPE}-section { padding: 3rem; }
}
.${SCOPE}-blob {
  position: absolute;
  border-radius: 9999px;
  pointer-events: none;
  display: none;
}
@media (min-width: 768px) {
  .${SCOPE}-blob { display: block; }
}
.${SCOPE}-blob-tl {
  left: -2rem; top: -2.5rem;
  height: 12rem; width: 12rem;
  background: rgba(63,159,95,0.20);
  filter: blur(40px);
}
.${SCOPE}-blob-br {
  bottom: -4rem; right: -2rem;
  height: 14rem; width: 14rem;
  background: rgba(255,216,139,0.35);
  filter: blur(40px);
}
.${SCOPE}-inner {
  position: relative;
}
.${SCOPE}-content {
  position: relative;
  z-index: 10;
  max-width: 48rem;
}
.${SCOPE}-logo {
  margin-bottom: 1.25rem;
}
.${SCOPE}-tag {
  position: relative;
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 9999px;
  border: 1px solid rgba(63,159,95,0.32);
  background: rgba(255,255,255,0.85);
  padding: 0.5rem 0.875rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #1c3a2a;
  box-shadow: 0 10px 24px rgba(63,159,95,0.14);
  backdrop-filter: blur(8px);
  max-width: 100%;
}
.${SCOPE}-tag::after {
  content: "";
  position: absolute;
  inset: -2px;
  z-index: -1;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(63,159,95,0.35), rgba(255,216,139,0.42), rgba(63,159,95,0.35));
  opacity: 0.36;
  filter: blur(9px);
}
.${SCOPE}-tag-dot {
  position: relative;
  flex: none;
  height: 0.5rem;
  width: 0.5rem;
  border-radius: 9999px;
  background: #3f9f5f;
  box-shadow: 0 0 10px rgba(63,159,95,0.78);
  animation: ${SCOPE}-dotPulse 2.2s ease-in-out infinite;
}
.${SCOPE}-tag-dot::after {
  content: "";
  position: absolute;
  inset: -6px;
  border-radius: 999px;
  pointer-events: none;
  background: radial-gradient(circle, rgba(255,216,139,0.72) 0%, rgba(63,159,95,0.34) 38%, rgba(63,159,95,0) 70%);
  opacity: 0;
  filter: blur(2px);
  animation: ${SCOPE}-dotSpark 2.2s ease-in-out infinite;
}
.${SCOPE}-h1 {
  margin-top: 1rem;
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.25;
  color: #152118;
}
@media (min-width: 768px) {
  .${SCOPE}-h1 { font-size: 3rem; }
}
.${SCOPE}-desc {
  margin-top: 1.25rem;
  max-width: 42rem;
  font-size: 1.125rem;
  color: rgba(21,33,24,0.8);
  line-height: 1.75;
}
.${SCOPE}-actions {
  margin-top: 1.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}
.${SCOPE}-btn-primary {
  border-radius: 9999px;
  background: #1c3a2a;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
  display: inline-block;
  font-size: 0.95rem;
}
.${SCOPE}-btn-secondary {
  border-radius: 9999px;
  border: 1px solid #b5ceb5;
  background: #fff;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  color: #1c3a2a;
  text-decoration: none;
  display: inline-block;
  font-size: 0.95rem;
}
.${SCOPE}-map {
  pointer-events: none;
  position: absolute;
  right: -10%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 0;
  height: 20rem;
  width: 68%;
  overflow: hidden;
  opacity: 0.6;
  content-visibility: auto;
  contain-intrinsic-size: 320px 400px;
}
@media (min-width: 768px) {
  .${SCOPE}-map { height: 24rem; width: 72%; }
}
@keyframes ${SCOPE}-dotPulse {
  0%, 100% {
    transform: scale(0.9);
    background-color: #3f9f5f;
    box-shadow: 0 0 8px rgba(63,159,95,0.62), 0 0 0 0 rgba(63,159,95,0.34);
  }
  50% {
    transform: scale(1.32);
    background-color: #ffd166;
    box-shadow: 0 0 14px rgba(255,209,102,0.88), 0 0 0 8px rgba(63,159,95,0);
  }
}
@keyframes ${SCOPE}-dotSpark {
  0%, 100% { opacity: 0; transform: scale(0.7); }
  45%       { opacity: 0.85; transform: scale(1.08); }
}
@media (prefers-reduced-motion: reduce) {
  .${SCOPE}-tag-dot,
  .${SCOPE}-tag-dot::after {
    animation: none;
  }
}
`;

export default function HeroSection({
  logo,
  tag,
  title,
  description,
  actions = [],
  extraActions,
  mapSlot,
  maxWidth,
}: HeroSectionProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <section className={`${SCOPE}-section`} style={maxWidth ? { maxWidth } : undefined}>
        <div className={`${SCOPE}-blob ${SCOPE}-blob-tl`} />
        <div className={`${SCOPE}-blob ${SCOPE}-blob-br`} />
        <div className={`${SCOPE}-inner`}>
          <div className={`${SCOPE}-content`}>
            {logo && <div className={`${SCOPE}-logo`}>{logo}</div>}
            {tag && (
              <div className={`${SCOPE}-tag`}>
                <span className={`${SCOPE}-tag-dot`} />
                <span>{tag}</span>
              </div>
            )}
            <h1 className={`${SCOPE}-h1`}>
              {title.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < title.length - 1 && <br />}
                </span>
              ))}
            </h1>
            {description && description.length > 0 && (
              <p className={`${SCOPE}-desc`}>
                {description.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < description.length - 1 && <br />}
                  </span>
                ))}
              </p>
            )}
            {(actions.length > 0 || extraActions) && (
              <div className={`${SCOPE}-actions`}>
                {actions.map((action, i) => (
                  <a
                    key={action.href}
                    className={i === 0 ? `${SCOPE}-btn-primary` : `${SCOPE}-btn-secondary`}
                    href={action.href}
                  >
                    {action.label}
                  </a>
                ))}
                {extraActions}
              </div>
            )}
          </div>
          {mapSlot && (
            <div className={`${SCOPE}-map`}>
              {mapSlot}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
