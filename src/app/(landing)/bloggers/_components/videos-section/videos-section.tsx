import { BloggerVideo } from "../../_types/blogger.types";
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
        viewBox="0 0 390 726"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M402 716C402 721.523 397.523 726 392 726H-3.00001C-8.52285 726 -13 721.523 -13 716V9.99999C-13 4.47715 -8.52285 0 -3 0H50.0935C52.7818 0 55.3569 1.08242 57.2379 3.0031L107.179 53.9971C109.06 55.9177 111.635 56.9999 114.323 57H276.509C279.234 57 281.842 55.8876 283.729 53.9199L332.459 3.0803C334.345 1.11259 336.952 0 339.678 0H392C397.523 0 402 4.47715 402 10V716Z"
          fill="#8E977D"
        />
      </svg>

      <div className="relative flex flex-col gap-3 p-3">
        <div className="pt-3 -translate-y-6 text-center">
          <h2 className="text-[20px] font-bold text-secondary">
            ویدیوهای معرفی
          </h2>
          <p className="mt-1 text-[11px] text-white/80">
            برای مشاهده ویدیوها روی هر مربع کلیک کنید.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid gap-1.5 ${
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
