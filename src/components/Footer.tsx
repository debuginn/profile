import type { PhotoCredit } from "../lib/config";

type Props = {
  showPhotoCredit: boolean;
  showCopyright: boolean;
  photoCredit: PhotoCredit | null;
  copyrightYear: string;
  siteLabel: string;
  siteHref: string;
  tone?: "light" | "dark";
};

export default function Footer({ showPhotoCredit, showCopyright, photoCredit, copyrightYear, siteLabel, siteHref, tone = "light" }: Props) {
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
            Copyright © {copyrightYear}{" "}
            <a href={siteHref} target="_blank" rel="noreferrer">
              {siteLabel}
            </a>
          </p>
        ) : null}
      </div>
    </div>
  );
}
