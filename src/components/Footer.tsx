import type { PhotoCredit } from "../lib/config";

type Props = {
  showPhotoCredit: boolean;
  showCopyright: boolean;
  photoCredit: PhotoCredit | null;
  copyrightStartYear: number;
  siteLabel: string;
  siteHref: string;
  slogan?: string;
  tone?: "light" | "dark";
};

export default function Footer({ showPhotoCredit, showCopyright, photoCredit, copyrightStartYear, siteLabel, siteHref, slogan, tone = "light" }: Props) {
  const currentYear = new Date().getFullYear();
  const copyrightText =
    copyrightStartYear >= currentYear ? `${currentYear}` : `${copyrightStartYear}-${currentYear}`;

  return (
    <div className={`mastfoot mastfoot--${tone}`}>
      <div className="inner">
        {showPhotoCredit && photoCredit ? (
          <p className="photo-credit">
            {photoCredit.text}
            <a href={photoCredit.linkHref} target="_blank" rel="noreferrer">
              {photoCredit.linkLabel}
            </a>
            {photoCredit.suffix}
          </p>
        ) : null}
        {showCopyright ? (
          <p className="copyright-text">
            Copyright © {copyrightText}{" "}
            <a href={siteHref}>{siteLabel}</a>
            {slogan ? <span className="footer-slogan"> · {slogan}</span> : null}
          </p>
        ) : null}
      </div>
    </div>
  );
}
