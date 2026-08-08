import Image from "next/image";

import { ICONS } from "@/src/shared/constants/dynamic-icon";

import { BloggerHeroProps } from "./blogger-hero.types";

export default function BloggerHero({ blogger }: BloggerHeroProps) {
  return (
    <div className="relative h-72 w-full overflow-hidden">
      <Image
        src={blogger.coverImage}
        alt={blogger.name}
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-x-0 top-0 flex justify-end p-4">
        <ICONS.shareIcon size="md" color="text-white" />
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <h1 className="text-[18px] font-bold text-white">{blogger.name}</h1>
        {blogger.title && (
          <p className="text-[13px] text-white/80">{blogger.title}</p>
        )}
      </div>
    </div>
  );
}