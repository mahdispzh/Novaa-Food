import { BloggerVideo } from "./blogger-video-type";
import bloggerVideoThumb from "./blogger-video.svg";
import avatarImg from "@/src/shared/ui/blogger-card/blogger-card-avatar.svg";

export const videos: BloggerVideo[] = [
  {
    id: 1,
    type: "video",
    url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    thumbnail: bloggerVideoThumb.src,
    user: {
      username: "aliheidarii",
      avatar: avatarImg.src,
    },
  },
];