import type { Metadata } from "next";
import type { SeoMetadata } from "@/models";
import type { SettingsMap } from "@/types";
import { absoluteMediaUrl, siteUrl, truncate } from "@/lib/utils/cn";

export function robotsValue(index: boolean, follow: boolean) {
  return {
    index,
    follow,
    googleBot: { index, follow },
  };
}

export function buildMetadata(opts: {
  seo?: SeoMetadata | null;
  fallbackTitle: string;
  fallbackDescription: string;
  path: string;
  settings: SettingsMap;
  image?: string | null;
}): Metadata {
  const { seo, fallbackTitle, fallbackDescription, path, settings, image } = opts;
  const brand = settings["business.name"] || "India LED TV Repair";
  const rawTitle = seo?.seo_title || fallbackTitle || settings["seo.default_title"] || brand;
  const isHome = path === "/" || path === "";
  const title = isHome || rawTitle.toLowerCase().includes(brand.toLowerCase())
    ? { absolute: rawTitle }
    : rawTitle;
  const description =
    seo?.meta_description ||
    fallbackDescription ||
    settings["seo.default_description"] ||
    "";
  const canonical = seo?.canonical_url || siteUrl(path);
  const ogTitle = seo?.og_title || rawTitle;
  const ogDescription = seo?.og_description || description;
  const twitterTitle = seo?.twitter_title || ogTitle;
  const twitterDescription = seo?.twitter_description || ogDescription;
  const ogImage =
    absoluteMediaUrl(seo?.og_image_url) ||
    absoluteMediaUrl(image) ||
    absoluteMediaUrl(settings["seo.default_og_image"]);
  const twitterImage = absoluteMediaUrl(seo?.twitter_image_url) || ogImage;
  const index = seo ? Boolean(seo.robots_index) : true;
  const follow = seo ? Boolean(seo.robots_follow) : true;

  return {
    title,
    description: truncate(description, 320),
    alternates: { canonical },
    robots: robotsValue(index, follow),
    openGraph: {
      type: "website",
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      siteName: settings["business.name"] || "India LED TV Repair",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: twitterTitle,
      description: twitterDescription,
      images: twitterImage ? [twitterImage] : undefined,
    },
  };
}

export function defaultOgImage(settings: SettingsMap) {
  return absoluteMediaUrl(settings["seo.default_og_image"]);
}
