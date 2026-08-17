import Image from "next/image";
import Link from "next/link";

import { ICONS } from "@/src/shared/constants/dynamic-icon";

import type { RecommendedPlaceCardProps } from "./recommended-place-card.types";

export default function RecommendedPlaceCard({
  place,
}: RecommendedPlaceCardProps) {
  return (
    <Link
      className="relative block w-full shrink-0 snap-center"
      href={`/restaurants/${place.slug}`}
    >
      {/* frame: aspect matches the native SVG (370x203) */}
      <div className="relative aspect-[1.82] w-full overflow-hidden">
        <svg
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 370 203"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M30.6631 0C13.7284 0 3.05176e-05 13.7284 0 30.6631V171.713C3.05176e-05 188.648 13.7284 202.376 30.6631 202.376H339.337C356.272 202.376 370 188.648 370 171.713V88.0526C370 71.1179 356.272 57.3896 339.337 57.3896H222.715C218.485 57.3896 214.36 56.0778 210.907 53.6348L143.066 5.63229C137.888 1.96784 131.7 0 125.355 0H30.6631Z"
            fill="#8E977D"
          />
          {/* thin inset border line, traced from the reference frame */}
          <mask fill="white" id="recommended-frame-inner-mask">
            <path d="M29.6406 17.3757C18.3508 17.3757 9.19824 26.5283 9.19824 37.8181V172.735C9.1983 184.025 18.3509 193.177 29.6406 193.177H340.358C351.648 193.177 360.801 184.025 360.801 172.735V84.6049C360.801 75.0086 353.021 67.2292 343.425 67.2292H220.696C216.757 67.2292 212.902 66.0912 209.595 63.9519L141.896 20.1618C139.085 18.3432 135.807 17.3757 132.459 17.3757H29.6406Z" />
          </mask>
          <path
            d="M9.19824 172.735H8.17615V172.735H9.19824ZM360.801 172.735H361.823V172.735H360.801ZM220.696 67.2292V68.2513H220.696L220.696 67.2292ZM209.595 63.9519L209.04 64.8101L209.04 64.8101L209.595 63.9519ZM29.6406 17.3757V18.3978C18.9153 18.3978 10.2203 27.0928 10.2203 37.8181H9.19824H8.17615C8.17615 25.9638 17.7863 16.3536 29.6406 16.3536V17.3757ZM9.19824 37.8181H10.2203V172.735H9.19824H8.17615V37.8181H9.19824ZM9.19824 172.735H10.2203C10.2204 183.46 18.9153 192.154 29.6406 192.154V193.177V194.199C17.7864 194.199 8.17621 184.589 8.17615 172.735H9.19824ZM29.6406 193.177V192.154H340.358V193.177V194.199H29.6406V193.177ZM340.358 193.177V192.154C351.084 192.154 359.779 183.46 359.779 172.735H360.801H361.823C361.823 184.589 352.213 194.199 340.358 194.199V193.177ZM360.801 172.735H359.779V84.6049H360.801H361.823V172.735H360.801ZM343.425 67.2292V68.2513H220.696V67.2292V66.2071H343.425V67.2292ZM220.696 67.2292L220.696 68.2513C216.56 68.2513 212.513 67.0564 209.04 64.8101L209.595 63.9519L210.15 63.0937C213.292 65.126 216.954 66.2071 220.696 66.2071L220.696 67.2292ZM209.595 63.9519L209.04 64.8101L141.341 21.0201L141.896 20.1618L142.451 19.3036L210.15 63.0937L209.595 63.9519ZM132.459 17.3757V18.3978H29.6406V17.3757V16.3536H132.459V17.3757ZM141.896 20.1618L141.341 21.0201C138.695 19.3084 135.611 18.3978 132.459 18.3978V17.3757V16.3536C136.004 16.3536 139.474 17.378 142.451 19.3036L141.896 20.1618ZM360.801 84.6049H359.779C359.779 75.5731 352.457 68.2513 343.425 68.2513V67.2292V66.2071C353.586 66.2071 361.823 74.4441 361.823 84.6049H360.801Z"
            fill="#F4EFE5"
            mask="url(#recommended-frame-inner-mask)"
          />
        </svg>

        {/* image: absolute on the left, explicit insets so it can never overflow the card */}
        <div className="absolute top-6 bottom-4 left-4 w-[34%] overflow-hidden rounded-2xl">
          <Image
            fill
            alt={place.name}
            className="object-cover"
            sizes="200px"
            src={place.image}
          />
        </div>
        {/* text block: absolute on the right, starts after the image + gap */}
<div className="absolute top-7 right-6.5 -bottom-3 flex flex-col justify-center gap-3 text-right">
  <div className="flex items-center justify-end gap-2">
    <span className="truncate text-[15px] font-bold text-secondary">
      {place.name}
    </span>
    <div className="flex items-center gap-1">
      <span className="flex shrink-0 items-center font-bold gap-1 text-[12px] text-secondary">
        {place.ratingnumber}
        <span className="-translate-y-1 inline-flex">
          <ICONS.starIcon color="text-secondary" size="sm" />
        </span>
      </span>
      <span className="flex shrink-0 items-center gap-0 text-[9px] text-secondary">
        {place.number}
      </span>
    </div>
  </div>

  {place.menu && (
    <div className="relative translate-x-7 flex flex-col items-end gap-1 text-[11px] text-white/85">
      <div className="flex items-center gap-1">
        <ICONS.dotIcon color="text-white" size="2xs" />
        <span className="truncate">{place.menu}</span>
      </div>
    </div>
  )}

  {place.location && (
    <div className="relative translate-x-14 flex flex-col items-end gap-1 text-[11px] text-secondary">
      <div className="flex items-center gap-1">
        <ICONS.locationIcon color="text-secondary" size="md" />
        <span className="truncate">{place.location}</span>
      </div>
    </div>
  )}
</div>
      </div>
    </Link>
  );
}