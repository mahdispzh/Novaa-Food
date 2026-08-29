import Image from "next/image";

import { ICONS } from "@/src/shared/constants/dynamic-icon";
import { BloggerVideo } from "./blogger-video-type";

const { eyeIcon: EyeIcon } = ICONS;

type BloggerVideoCardProps = {
  video: BloggerVideo;
};

export default function BloggerVideoCard({ video }: BloggerVideoCardProps) {
  if (!video) return null;

  return (
    <div className="relative aspect-square w-full overflow-hidden border border-beige">
      <Image
        fill
        alt={video.id}
        className="object-cover"
        sizes="(max-width: 768px) 33vw, 200px"
        src={video.thumbnail}
      />

      {/* Gradient overlay for readable view count */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

      {/* Views count */}
      <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1 text-white">
        <EyeIcon color="text-white" size="sm" />
        <span className="text-[11px] font-medium leading-none" dir="ltr">
          {video.viewsCount}
        </span>
      </div>
    </div>
  );
}
