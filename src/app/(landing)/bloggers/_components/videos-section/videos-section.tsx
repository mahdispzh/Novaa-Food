import videosFrame from "../../_assets/frames/videos-frame.svg";
import { frameMaskStyle } from "../../_utils/frame-mask";
import { BloggerVideo } from "../../_types/blogger.types";
import VideoThumbnail from "../video-thumbnail/video-thumbnail";

interface VideosSectionProps {
  videos: BloggerVideo[];
}

export default function VideosSection({ videos }: VideosSectionProps) {
  if (videos.length === 0) return null;

  return (
    <div className="relative">
      {/* the frame's height is driven by the content below (it has no fixed
         native aspect ratio to preserve — the notch at the top stays a fixed
         proportion of whatever height the grid ends up needing) */}
      <div
        className="bg-primary absolute inset-0"
        style={frameMaskStyle(videosFrame)}
      />

      <div className="relative flex flex-col gap-3 p-3">
        <h2 className="pt-3 text-center text-[15px] font-bold text-white">
          ویدیوهای معرفی
        </h2>

        <div className="grid grid-cols-2 gap-1.5">
          {videos.map((video) => (
            <VideoThumbnail key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
}
