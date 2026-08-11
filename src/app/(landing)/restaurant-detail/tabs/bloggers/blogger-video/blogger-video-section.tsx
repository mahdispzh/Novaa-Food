"use client";

import BloggerVideoCard from "./blogger-video";
import { videos } from "./blogger-video-constants";

export default function BloggerVideoSection() {
  return (
    <div className="flex gap-5 overflow-x-auto">
      {videos.map((video) => (
        <BloggerVideoCard
          key={video.id}
          video={video}
        />
      ))}
    </div>
  );
}