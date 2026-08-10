import Image from "next/image";

import { VideoThumbnailProps } from "./video-thumbnail.types";

export default function VideoThumbnail({ video }: VideoThumbnailProps) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-lg">
      <Image src={video.thumbnail} alt="" fill className="object-cover" />
      <span className="absolute left-2 top-2 h-2 w-2 rounded-full bg-white shadow" />
    </div>
  );
}
