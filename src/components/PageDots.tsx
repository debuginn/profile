import type { ActivePage } from "../viewmodels/usePageVM";
import config from "../lib/config";

type DotDef = {
  id: string;
  label: string;
};

type Props = {
  dots: DotDef[];
  activePage: ActivePage;
  visible: boolean;
};

const LIGHT_BG_SECTIONS = new Set(
  config.sections.filter((s) => s.type === "flybay").map((s) => s.id)
);

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

export default function PageDots({ dots, activePage, visible }: Props) {
  const isLight = LIGHT_BG_SECTIONS.has(activePage);

  return (
    <nav
      className={`page-dots${isLight ? " page-dots--light" : ""}${visible ? "" : " page-dots--hidden"}`}
      aria-label="页面导航"
    >
      {dots.map((dot) => (
        <a
          key={dot.id}
          className={`page-dot ${activePage === dot.id ? "is-active" : ""}`}
          href={`#${dot.id}`}
          aria-label={dot.label}
          aria-current={activePage === dot.id ? "page" : undefined}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection(dot.id);
          }}
        />
      ))}
    </nav>
  );
}
