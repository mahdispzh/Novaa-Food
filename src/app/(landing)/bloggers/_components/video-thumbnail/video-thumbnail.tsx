import Image from "next/image";
import { VideoThumbnailProps } from "./video-thumbnail.types";
import { ICONS } from "@/src/shared/constants/dynamic-icon";

export default function VideoThumbnail({ video }: VideoThumbnailProps) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-md">
      <Image src={video.thumbnail} alt={video.id} fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
      <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1 text-white">
        <ICONS.eyeIcon color="text-white" size="sm" />
        <span className="text-[11px] font-medium leading-none" dir="ltr">
          {video.viewsCount}
        </span>
      </div>
    </div>
  );
}
