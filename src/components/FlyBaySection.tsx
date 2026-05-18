"use client";

import { useMemo } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import worldAtlas from "world-atlas/countries-110m.json";
import type { Feature, FeatureCollection, Geometry, GeoJsonProperties } from "geojson";
import type { InstitutionCard } from "../lib/config";

const atlasData = worldAtlas as unknown as { objects: { countries: unknown } };
const countries = feature(
  atlasData as never,
  atlasData.objects.countries as never,
) as unknown as FeatureCollection<Geometry, GeoJsonProperties>;
const chinaFeature = countries.features.find((f) => String(f.id) === "156");
const taiwanFeature = countries.features.find((f) => String(f.id) === "158");

const CITY_NODES = [
  { name: "北京", lng: 116.4074, lat: 39.9042 },
  { name: "上海", lng: 121.4737, lat: 31.2304 },
  { name: "成都", lng: 104.0665, lat: 30.5728 },
  { name: "昆明", lng: 102.8329, lat: 24.8801 },
];
const BAY_AREA = { lng: 113.5439, lat: 22.1987 };

function buildMapData() {
  if (!chinaFeature) return { mapPath: "", cities: [], bayPt: [70, 49] as [number, number] };
  const fc: FeatureCollection<Geometry, GeoJsonProperties> = {
    type: "FeatureCollection",
    features: [chinaFeature, taiwanFeature].filter(Boolean) as Feature<Geometry, GeoJsonProperties>[],
  };
  const proj = geoMercator().fitExtent([[16, 6], [84, 59]], fc as never);
  const mapPath = geoPath(proj)(fc as never) ?? "";
  const cities = CITY_NODES.map((c) => {
    const p = proj([c.lng, c.lat]);
    return p ? { ...c, x: p[0], y: p[1] } : null;
  }).filter(Boolean) as Array<(typeof CITY_NODES)[number] & { x: number; y: number }>;
  const bayPt = (proj([BAY_AREA.lng, BAY_AREA.lat]) ?? [70, 49]) as [number, number];
  return { mapPath, cities, bayPt };
}

type Props = {
  titleLines: string[];
  descriptionLines: string[];
  siteHref: string;
  primaryHref: string;
  secondaryHref: string;
  logo: string;
  institutions: InstitutionCard[];
  ctaLabel: string;
};

export default function FlyBaySection({ titleLines, descriptionLines, primaryHref, secondaryHref, siteHref, logo, ctaLabel }: Props) {
  const { mapPath, cities, bayPt } = useMemo(buildMapData, []);
  const month = new Date().getMonth() + 1;

  return (
    <section className="page-screen page-screen-flybay" id="flybay">
      <div className="fb-page">
        <div className="fb-hero-panel">
          {/* 背景光晕 */}
          <div className="fb-glow fb-glow-tl" />
          <div className="fb-glow fb-glow-br" />

          <div className="fb-hero-inner">
            {/* 左侧内容 */}
            <div className="fb-hero-left">
              <img
                src={logo}
                alt="FlyBay Plan 飞湾计划"
                className="fb-logo"
                loading="lazy"
                decoding="async"
                onLoad={(e) => e.currentTarget.classList.add("is-loaded")}
              />

              <div className="fb-activity-tag">
                <span className="fb-activity-dot" />
                <span>{month} 月返利加码中</span>
              </div>

              <h2 className="fb-title">
                {titleLines[0]}
                <br />
                {titleLines[1]}
              </h2>

              <p className="fb-desc">
                {descriptionLines[0]}
                <br />
                {descriptionLines[1]}
              </p>

              <div className="fb-hero-actions">
                <a href={primaryHref} target="_blank" rel="noreferrer" className="fb-btn-primary">
                  立即测算返利
                </a>
                <a href={secondaryHref} target="_blank" rel="noreferrer" className="fb-btn-secondary">
                  查看可开机构
                </a>
                <a href={siteHref} target="_blank" rel="noreferrer" className="fb-btn-share">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                  </svg>
                  {ctaLabel}
                </a>
              </div>
            </div>

            {/* 右侧地图（绝对定位，右侧叠加） */}
            <div className="fb-hero-map" aria-hidden="true">
              <svg viewBox="0 0 100 65" className="fb-map-svg">
                <path d={mapPath} fill="none" stroke="#c3d7bd" strokeWidth="0.7" opacity="0.5" />
                <path d={mapPath} fill="none" stroke="#6f9b74" strokeWidth="0.34" />

                {cities.map((node, i) => {
                  const cx = `${node.x}`, cy = `${node.y}`;
                  const bx = bayPt[0], by = bayPt[1];
                  const qx = (node.x + bx) / 2 + (node.y > by ? -2 : 2);
                  const qy = (node.y + by) / 2 - 5;
                  const pathD = `M ${cx} ${cy} Q ${qx} ${qy} ${bx} ${by}`;
                  return (
                    <g key={node.name}>
                      <path d={pathD} className="route-flow" style={{ animationDelay: `${i * -0.6}s` }}
                        stroke="#2f8f52" strokeWidth={0.4} fill="none" opacity={0.62} />
                      <circle cx={node.x} cy={node.y} r="1.05" fill="#1c3a2a" stroke="#fff" strokeWidth="0.25" />
                      <circle r="0.45" fill="#3f9f5f" className="route-ball"
                        style={{ offsetPath: `path('${pathD}')`, animationDuration: `${4 + i * 0.6}s`, animationDelay: `${i * -1.2}s` } as React.CSSProperties}
                      />
                      <text x={node.x + 1.1} y={node.y - 1.2} fontSize="1.9" fill="#244131">{node.name}</text>
                    </g>
                  );
                })}

                <circle cx={bayPt[0]} cy={bayPt[1]} r="1.45" fill="#f28f16" />
                <text x={bayPt[0] + 1.2} y={bayPt[1] + 0.6} fontSize="2" fill="#6a4211">大湾区</text>
              </svg>
            </div>
          </div>

          {/* 目的地标签 */}
          <div className="fb-destination-tag">
            目的地：香港 / 澳门
          </div>
        </div>
      </div>
    </section>
  );
}
