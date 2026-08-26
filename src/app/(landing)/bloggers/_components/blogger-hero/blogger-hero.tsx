import Image from "next/image";

import { ICONS } from "@/src/shared/constants/dynamic-icon";

import profileFrame from "../../_assets/frames/profile-frame.svg";
import { frameMaskStyle } from "../../_utils/frame-mask";
import { BloggerHeroProps } from "./blogger-hero.types";

export default function BloggerHero({ blogger }: BloggerHeroProps) {
  return (
    <div className="px-4 pt-4">
      <div className="relative aspect-[0.75] w-full">
        <div
          className="absolute inset-0 overflow-hidden"
          style={frameMaskStyle(profileFrame)}
        >
          <Image
            src={blogger.coverImage}
            alt={blogger.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="absolute bottom-5 right-0 flex w-[56%] flex-col items-end gap-1 p-4 text-right sm:p-5">
          <div className="flex gap-10">
            <h1 className="text-[20px] font-bold text-primary">
              {blogger.name}
            </h1>
            <ICONS.shareIcon size="lg" color="text-primary" />
          </div>
        </div>
        <div className="absolute -bottom-1 right-0 flex w-[44%] flex-col items-start gap-1 p-4 text-left sm:p-5">
          {blogger.title && (
            <p className="text-gray text-[16px]">{blogger.title}</p>
          )}
        </div>
      </div>
    </div>
  );
}
