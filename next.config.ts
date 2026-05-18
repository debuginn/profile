import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  env: {
    SITE_VARIANT: process.env.SITE_VARIANT ?? "com",
  },
};

export default nextConfig;
