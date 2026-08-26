import type { BloggerVideo } from "../../_types/blogger.types";
import VideoThumbnail from "../video-thumbnail/video-thumbnail";

interface VideosSectionProps {
  videos: BloggerVideo[];
}

// The reference layout isn't a plain 2-column grid: rows alternate between
// 2 large squares and 3 smaller squares, repeating down the section.
const ROW_PATTERN = [2, 3];

function chunkVideosIntoRows(videos: BloggerVideo[]) {
  const rows: BloggerVideo[][] = [];
  let index = 0;
  let patternIndex = 0;

  while (index < videos.length) {
    const rowSize = ROW_PATTERN[patternIndex % ROW_PATTERN.length];
    rows.push(videos.slice(index, index + rowSize));
    index += rowSize;
    patternIndex += 1;
  }

  return rows;
}

export default function VideosSection({ videos }: VideosSectionProps) {
  if (videos.length === 0) return null;

  const rows = chunkVideosIntoRows(videos);

  return (
    <div className="relative">
      {/* the frame's height is driven by the content below (it has no fixed
         native aspect ratio to preserve — the notch at the top stays a fixed
         proportion of whatever height the grid ends up needing) */}
      <svg
        className="block"
        height="83"
        viewBox="0 0 390 83"
        width="390"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0 0
         H 54.5
         L 106.9 52.7
         C 108.9 54.7 109.8 56 113.0 56
         H 277.0
         C 280.2 56 281.1 54.7 283.1 52.7
         L 335.5 0
         H 390
         V 83
        H 0
        Z"
          fill="#8E977D"
        />
      </svg>

      <div className="absolute inset-x-0 top-3 text-center">
        <h2 className="text-[20px] font-bold text-secondary">
          ویدیوهای معرفی
        </h2>
      </div>

      <div className="relative mt-0.2 flex flex-col gap-0 px-0">
        <div className="gap-0.2 flex flex-col">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`gap-0.2 grid ${
                row.length === 3 ? "grid-cols-3" : "grid-cols-2"
              }`}
            >
              {row.map((video) => (
                <VideoThumbnail key={video.id} video={video} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
