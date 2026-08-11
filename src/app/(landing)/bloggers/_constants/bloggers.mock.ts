import nearByCardImage from "@/src/app/(landing)/(home)/_components/near-by-card/near-by-card-image.svg";
import blogger1 from "@/src/shared/ui/blogger-card/blogger-card-1.svg";
import blogger2 from "@/src/shared/ui/blogger-card/blogger-card-2.svg";
import blogger3 from "@/src/shared/ui/blogger-card/blogger-card-3.svg";
import type { Blogger } from "../_types/blogger.types";

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
      // Row 1 (2 cols)
      { id: "v1", thumbnail: "/images/bloggers/1.png", viewsCount: 1280 },
      { id: "v2", thumbnail: "/images/bloggers/2.png", viewsCount: 1190 },
      // Row 2 (3 cols)
      { id: "v3", thumbnail: "/images/bloggers/3.png", viewsCount: 1280 },
      { id: "v4", thumbnail: "/images/bloggers/4.png", viewsCount: 900 },
      { id: "v5", thumbnail: "/images/bloggers/5.png", viewsCount: 900 },
      // Row 3 (2 cols)
      { id: "v6", thumbnail: "/images/bloggers/1.png", viewsCount: 1280 },
      { id: "v7", thumbnail: "/images/bloggers/2.png", viewsCount: 900 },
      // Row 4 (3 cols)
      { id: "v8", thumbnail: "/images/bloggers/3.png", viewsCount: 1280 },
      { id: "v9", thumbnail: "/images/bloggers/4.png", viewsCount: 900 },
      { id: "v10", thumbnail: "/images/bloggers/5.png", viewsCount: 900 },
      // Row 5 (2 cols)
      { id: "v11", thumbnail: "/images/bloggers/1.png", viewsCount: 1280 },
      { id: "v12", thumbnail: "/images/bloggers/2.png", viewsCount: 900 },
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
