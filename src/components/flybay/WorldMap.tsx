"use client";

import type React from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import landAtlas from "world-atlas/land-110m.json";
import type { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";

const atlasData = landAtlas as unknown as { objects: { land: unknown } };
const worldLand = feature(
  atlasData as never,
  atlasData.objects.land as never,
) as unknown as FeatureCollection<Geometry, GeoJsonProperties>;

export type CityDot = {
  name: string;
  lng: number;
  lat: number;
};

const DEFAULT_CITIES: CityDot[] = [
  { name: "香港", lng: 114.1694, lat: 22.3193 },
  { name: "上海", lng: 121.4737, lat: 31.2304 },
  { name: "新加坡", lng: 103.8198, lat: 1.3521 },
  { name: "东京", lng: 139.6917, lat: 35.6895 },
  { name: "伦敦", lng: -0.1276, lat: 51.5074 },
  { name: "纽约", lng: -74.006, lat: 40.7128 },
  { name: "迪拜", lng: 55.2708, lat: 25.2048 },
  { name: "悉尼", lng: 151.2093, lat: -33.8688 },
];

function buildMapData(cities: CityDot[]) {
  const projection = geoMercator()
    .scale(16)
    .center([15, 30])
    .translate([50, 33]);
  projection.clipExtent([[0, 0], [100, 66]]);
  const pathBuilder = geoPath(projection);
  const worldPath = pathBuilder(worldLand as never) ?? "";
  const projected = cities
    .map((city) => {
      const pt = projection([city.lng, city.lat]);
      if (!pt) return null;
      return { ...city, x: pt[0], y: pt[1] };
    })
    .filter((c): c is NonNullable<typeof c> => c !== null);
  return { worldPath, projected };
}

type Props = {
  cities?: CityDot[];
  style?: React.CSSProperties;
};

export default function WorldMap({ cities = DEFAULT_CITIES, style }: Props) {
  const { worldPath, projected } = buildMapData(cities);

  return (
    <svg viewBox="0 0 100 66" style={{ width: "100%", height: "100%", ...style }}>
      <path d={worldPath} fill="none" stroke="#c3d7bd" strokeWidth="0.28" opacity="0.5" />
      <path d={worldPath} fill="none" stroke="#6f9b74" strokeWidth="0.14" />
      {projected.map((city) => (
        <g key={city.name}>
          <circle cx={city.x} cy={city.y} r="0.7" fill="#3f9f5f" opacity="0.85" />
          <circle cx={city.x} cy={city.y} r="0.7" fill="none" stroke="#ffffff" strokeWidth="0.18" />
          <text x={city.x + 1.0} y={city.y + 0.5} fontSize="1.4" fill="#0e1f15" opacity="1">
            {city.name}
          </text>
        </g>
      ))}
    </svg>
  );
}
