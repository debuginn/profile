import type { NavItem } from "../lib/config";

type Props = {
  brand: string;
  brandHref: string;
  nav: NavItem[];
  tone?: "light" | "dark";
};

export default function Header({ brand, brandHref, nav, tone = "light" }: Props) {
  return (
    <div className={`global-header masthead clearfix global-header--${tone}`}>
      <div className="inner">
        <h3 className="masthead-brand">
          <a href={brandHref} target="_blank" rel="noreferrer">{brand}</a>
        </h3>
        <nav>
          <ul className="nav masthead-nav">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
