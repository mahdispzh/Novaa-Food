"use client";

import { ICONS } from "@/src/shared/constants/dynamic-icon";
import { BloggerVideo } from "./blogger-video-type";

const { playIcon: PlayIcon } = ICONS;

type BloggerVideoCardProps = {
  video: BloggerVideo;
};

export default function BloggerVideoCard({ video }: BloggerVideoCardProps) {
  if (!video) return null;

  return (
    <div className="relative h-[270px] w-full overflow-hidden rounded-lg mt-7">
      {/* Video */}
      <video
        src={video.url}
        poster={video.thumbnail}
        className="h-full w-full object-cover"
        muted
        playsInline
      />

      <div className="absolute top-4 left-4 flex items-center gap-2">
        {/* User name */}
        <span className="text-[13px] font-light text-black">{video.user.username}</span>

        {/* Avatar */}
        {video.user.avatar && (
          <img
            src={video.user.avatar}
            alt={video.user.username}
            className="h-7 w-7 rounded-full border border-black"
          />
        )}
      </div>

      {/* PlayIcon */}
      <button
        type="button"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <PlayIcon size="4xl" color="text-gray" />
      </button>
    </div>
  );
}
