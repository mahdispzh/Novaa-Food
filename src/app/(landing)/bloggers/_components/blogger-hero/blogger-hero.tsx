import Image from "next/image";

import { ICONS } from "@/src/shared/constants/dynamic-icon";

import profileFrame from "../../_assets/frames/profile-frame.svg";
import { frameMaskStyle } from "../../_utils/frame-mask";
import { BloggerHeroProps } from "./blogger-hero.types";

export default function BloggerHero({ blogger }: BloggerHeroProps) {
  return (
    <div className="px-4 pt-4">
      {/* aspect ratio matches the native profile-frame.svg viewBox (369x491) so
         the mask never gets stretched out of proportion */}
      <div className="relative aspect-[369/491] w-full">
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

        {/* name / title / share sit in the notch the mask cuts out of the
           bottom-right corner, so they land on the page background rather
           than on top of the photo */}
        <div className="absolute bottom-0 right-0 flex w-[56%] flex-col items-end gap-1 p-4 text-right sm:p-5">
          <div className="flex items-center gap-2">
            <ICONS.shareIcon size="sm" color="text-primary" />
            <h1 className="text-[16px] font-bold text-primary">
              {blogger.name}
            </h1>
          </div>
          {blogger.title && (
            <p className="text-gray text-[12px]">{blogger.title}</p>
          )}
        </div>
      </div>
    </div>
  );
}
