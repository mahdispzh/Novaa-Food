import { CSSProperties } from "react";
import { StaticImageData } from "next/image";

/**
 * Next's static asset import for an SVG can resolve to either a plain URL
 * string or a `StaticImageData` object ({ src, width, height, ... })
 * depending on how the project's loader/turbopack is configured. Accept
 * both so `url(...)` never ends up literally building `url([object Object])`
 * (which silently fails and just shows the flat background color, no mask).
 */
type FrameSource = string | StaticImageData;

function resolveFrameUrl(frameSrc: FrameSource): string {
  return typeof frameSrc === "string" ? frameSrc : frameSrc.src;
}

/**
 * Builds a CSS mask style that stamps out a decorative frame shape (one of
 * the SVGs in `_assets/frames`) filled with the current background color.
 * Using a mask (instead of just rendering the SVG's own fill) lets every
 * frame stay on the design-token colors (bg-primary / bg-secondary / etc.)
 * instead of a hard-coded green.
 */
export function frameMaskStyle(frameSrc: FrameSource): CSSProperties {
  const url = resolveFrameUrl(frameSrc);

  return {
    WebkitMaskImage: `url(${url})`,
    maskImage: `url(${url})`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  };
}
