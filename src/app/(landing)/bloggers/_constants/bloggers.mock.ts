import { Blogger } from "../_types/blogger.types";
import blogger1 from "@/src/shared/ui/blogger-card/blogger-card-1.svg";
import blogger2 from "@/src/shared/ui/blogger-card/blogger-card-2.svg";
import blogger3 from "@/src/shared/ui/blogger-card/blogger-card-3.svg";
import nearByCardImage from "@/src/app/(landing)/(home)/_components/near-by-card/near-by-card-image.svg";

const DEFAULT_BIO =
  "عاشق کشف کافه‌های دنج و رستوران‌های خاص، بیشتر از پنج سال تجربه بررسی کافه‌ها و رستوران‌های شیراز.";

export const MOCK_BLOGGERS: Blogger[] = [
  {
    id: "1",
    name: "علی حیدری",
    username: "alihedarii",
    title: "Food Explorer",
    bio: DEFAULT_BIO,
    coverImage: blogger1,
    isFollowing: false,
    stats: { visitors: 3000, cafesReviewed: 44, followers: 5800 },
    recommendedPlaces: [
      {
        id: "p1",
        slug: "sam-cafe",
        name: "سام کافه",
        image: nearByCardImage,
        ratingnumber: "۴.۸",
        number: "(۲۳۰ نظر)",
        menu: "قهوه، صبحانه، نوشیدنی",
        location: "ارم (۲.۱ کیلومتر)",
      },
    ],
    videos: [
      { id: "v1", thumbnail: "/images/bloggers/ali-video-1.jpg" },
      { id: "v2", thumbnail: "/images/bloggers/ali-video-2.jpg" },
      { id: "v3", thumbnail: "/images/bloggers/ali-video-3.jpg" },
      { id: "v4", thumbnail: "/images/bloggers/ali-video-4.jpg" },
    ],
    socialLinks: {
      instagram: "https://instagram.com/alihedarii",
      telegram: "https://t.me/alihedarii",
      whatsapp: "https://wa.me/98000000000",
    },
  },
  {
    id: "2",
    name: "مریم رضایی",
    username: "mrymrezaeii",
    title: "Food Explorer",
    bio: DEFAULT_BIO,
    coverImage: blogger2,
    isFollowing: false,
    stats: { visitors: 2100, cafesReviewed: 31, followers: 4200 },
    recommendedPlaces: [],
    videos: [],
    socialLinks: {},
  },
  {
    id: "3",
    name: "آریا احمدی",
    username: "ariyaahmadii",
    title: "Food Explorer",
    bio: DEFAULT_BIO,
    coverImage: blogger3,
    isFollowing: false,
    stats: { visitors: 1800, cafesReviewed: 26, followers: 3100 },
    recommendedPlaces: [],
    videos: [],
    socialLinks: {},
  },
];