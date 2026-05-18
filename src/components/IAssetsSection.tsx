import type { CtaButton, ButtonIcon } from "../lib/config";

function ButtonIconSvg({ icon }: { icon: ButtonIcon }) {
  if (icon === "apple") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 7, flexShrink: 0 }}>
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    );
  }
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ marginRight: 6, flexShrink: 0 }}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

type Props = {
  shots: string[];
  columns: number;
  durations: string[];
  delays: string[];
  buttons: CtaButton[];
};

export default function IAssetsSection({ shots, columns, durations, delays, buttons }: Props) {
  const doubled = [...shots, ...shots];

  return (
    <section className="page-screen page-screen-iassets" id="iassets">
      <div className="iassets-page">
        <div className="iassets-card-wrap">
          <div className="cta-box">
            <div className="cta-btn-group">
              {buttons.map((btn) => (
                <a
                  key={btn.href}
                  className={`iassets-btn${btn.variant === "ghost" ? " iassets-btn-ghost" : ""}`}
                  href={btn.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ButtonIconSvg icon={btn.icon} />
                  {btn.label}
                </a>
              ))}
            </div>
            <div className="cta-mosaic" aria-hidden="true">
              <div className="cta-mosaic-stage">
                {Array.from({ length: columns }).map((_, col) => (
                  <div className="cta-mosaic-column" key={`col-${col}`}>
                    <div
                      className="cta-mosaic-column-track"
                      style={
                        {
                          "--cta-column-duration": durations[col % durations.length],
                          "--cta-column-delay": delays[col % delays.length],
                          "--cta-column-direction": (col + 1) % 2 === 0 ? "reverse" : "normal"
                        } as React.CSSProperties
                      }
                    >
                      {doubled.map((src, idx) => (
                        <figure className="cta-mosaic-card" key={`${col}-${idx}`}>
                          <img
                            src={src}
                            alt=""
                            width={1410}
                            height={2770}
                            loading={idx < 2 ? "eager" : "lazy"}
                            fetchPriority={idx < 2 ? "high" : "auto"}
                            decoding="async"
                            onLoad={(e) => e.currentTarget.classList.add("is-loaded")}
                          />
                        </figure>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
