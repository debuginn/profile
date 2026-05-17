import type { SiteConfig } from "../lib/config";
import comData from "../../site.json";
import cnData from "../../site.cn.json";

const variant = process.env.SITE_VARIANT;
const data = variant === "cn" ? cnData : comData;

const config: SiteConfig = data as SiteConfig;

export default config;
