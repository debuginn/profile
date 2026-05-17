 "use client";

import { useEffect, useState } from "react";

function PageFooter({ showPhotoCredit }: { showPhotoCredit: boolean }) {
  return (
    <div className="mastfoot">
      <div className="inner">
        {showPhotoCredit ? (
          <p className="photo-credit">
            背景图片均来自于站长
            <a href="https://photo.debuginn.com" target="_blank" rel="noreferrer">
              年度摄影精选照片
            </a>
            ，由 @Julissa 设计与指导
          </p>
        ) : null}
        <p className="copyright-text">
          Copyright © 2017-2026{" "}
          <a href="https://debuginn.com/" target="_blank" rel="noreferrer">
            Debug客栈
          </a>
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  const [activePage, setActivePage] = useState<"home" | "iassets">("home");

  useEffect(() => {
    const syncByHash = () => {
      const hash = window.location.hash;
      if (hash === "#iassets") {
        setActivePage("iassets");
      } else if (hash === "#home" || hash === "") {
        setActivePage("home");
      }
    };

    const root = document.querySelector(".page-stack");
    const homeEl = document.getElementById("home");
    const iassetsEl = document.getElementById("iassets");
    syncByHash();
    window.addEventListener("hashchange", syncByHash);
    if (!root || !homeEl || !iassetsEl) {
      return () => window.removeEventListener("hashchange", syncByHash);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        setActivePage(visible.target.id === "iassets" ? "iassets" : "home");
      },
      {
        root,
        threshold: [0.45, 0.6, 0.8]
      }
    );

    observer.observe(homeEl);
    observer.observe(iassetsEl);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", syncByHash);
    };
  }, []);

  return (
    <main className="page-stack">
      <div className="global-header masthead clearfix">
        <div className="inner">
          <h3 className="masthead-brand">
            <a href="https://debuginn.com">Debug客栈</a>
          </h3>
          <nav>
            <ul className="nav masthead-nav">
              <li>
                <a href="https://blog.debuginn.com" target="_blank" rel="noreferrer">
                  Blog
                </a>
              </li>
              <li>
                <a href="https://photo.debuginn.com" target="_blank" rel="noreferrer">
                  Photo
                </a>
              </li>
              <li>
                <a href="https://github.com/debuginn" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <section className="page-screen page-screen-home" id="home">
        <div className="site-wrapper">
          <div className="site-wrapper-inner">
            <div className="cover-container">
              <div className="inner cover">
                <p className="lead" id="hitokoto">
                  <a href="#" id="hitokoto_text">
                    :D 获取中...
                  </a>
                </p>
                <a className="page-down-btn" href="#iassets" aria-label="跳转到 iAssets 专题页">
                  <svg className="page-down-sf" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.95" />
                    <path d="M8.2 10.4a.8.8 0 0 1 1.13 0L12 13.07l2.67-2.67a.8.8 0 1 1 1.13 1.13l-3.24 3.24a.8.8 0 0 1-1.13 0L8.2 11.53a.8.8 0 0 1 0-1.13Z" fill="#0B1220" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-screen page-screen-iassets" id="iassets">
        <div className="iassets-page">
          <div className="iassets-card-wrap">
            <div className="iassets-card">
              <p className="iassets-tag">Project Highlight</p>
              <h2>iAssets</h2>
              <p>
                iAssets 是一个专注于资产管理与可视化分析的项目，支持多资产分类、盈亏变化追踪和图表化展示，目标是让复杂资产信息更直观、可操作。
              </p>
              <a className="iassets-btn" href="https://github.com/debuginn/iAssets" target="_blank" rel="noreferrer">
                前往 iAssets 项目
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="global-footer">
        <PageFooter showPhotoCredit={activePage === "home"} />
      </div>

      <nav className="page-dots" aria-label="页面导航">
        <a
          className={`page-dot ${activePage === "home" ? "is-active" : ""}`}
          href="#home"
          aria-label="跳转到首页"
          aria-current={activePage === "home" ? "page" : undefined}
          onClick={() => setActivePage("home")}
        />
        <a
          className={`page-dot ${activePage === "iassets" ? "is-active" : ""}`}
          href="#iassets"
          aria-label="跳转到 iAssets 页"
          aria-current={activePage === "iassets" ? "page" : undefined}
          onClick={() => setActivePage("iassets")}
        />
      </nav>
    </main>
  );
}
