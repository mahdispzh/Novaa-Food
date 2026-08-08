import Image from "next/image";

import { VideoThumbnailProps } from "./video-thumbnail.types";

export default function VideoThumbnail({ video }: VideoThumbnailProps) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
      <Image src={video.thumbnail} alt="" fill className="object-cover" />
    </div>
  );
}