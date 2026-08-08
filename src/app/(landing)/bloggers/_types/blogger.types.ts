export interface BloggerStats {
  visitors: number; // بازدیدکننده
  cafesReviewed: number; // معرفی کافه
  followers: number; // دنبال‌کننده
}

export interface BloggerRecommendedPlace {
  id: string;
  slug: string;
  name: string;
  image: string;
  rating: number;
}

export interface BloggerVideo {
  id: string;
  thumbnail: string;
  videoUrl?: string;
}

export interface BloggerSocialLinks {
  instagram?: string;
  telegram?: string;
  whatsapp?: string;
}

export interface Blogger {
  id: string;
  name: string;
  username: string;
  title?: string;
  bio: string;
  coverImage: string;
  isFollowing: boolean;
  stats: BloggerStats;
  recommendedPlaces: BloggerRecommendedPlace[];
  videos: BloggerVideo[];
  socialLinks: BloggerSocialLinks;
}