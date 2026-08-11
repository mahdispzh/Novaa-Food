"use client";

import { ICONS } from "@/src/shared/constants/dynamic-icon";
import { BloggerVideo } from "./blogger-video-type";

const { playIcon: PlayIcon } = ICONS;

type BloggerVideoCardProps = {
  video: BloggerVideo;
};

export default function BloggerVideoCard({
  video,
}: BloggerVideoCardProps) {
  if (!video) return null;

  return (
    <div className="relative h-[270px] w-[320px] overflow-hidden rounded-lg">

      <video
        src={video.url}
        poster={video.thumbnail}
        className="h-full w-full object-cover"
        muted
        playsInline
      />

      <div className="absolute left-4 top-4 flex items-center gap-2">
        {video.user.avatar && (
          <img
            src={video.user.avatar}
            alt={video.user.username}
            className="h-8 w-8 rounded-full border border-white"
          />
        )}

        <span className="text-sm text-white">
          {video.user.username}
        </span>
      </div>

      <button
        type="button"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <PlayIcon />
      </button>

    </div>
  );
}