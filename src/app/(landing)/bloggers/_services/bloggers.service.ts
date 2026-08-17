import { MOCK_BLOGGERS } from "../_constants/bloggers.mock";
import type {
  Blogger,
  BloggerRecommendedPlace,
  BloggerSocialLinks,
  BloggerStats,
  BloggerVideo,
} from "../_types/blogger.types";

export interface BloggerProfile {
  id: string;
  name: string;
  username: string;
  title?: string;
  bio: string;
  coverImage: Blogger["coverImage"];
  isFollowing: boolean;
}

function findBlogger(id: string): Blogger | null {
  return MOCK_BLOGGERS.find((blogger) => blogger.id === id) ?? null;
}

// List page ----------------------------------------------------------------

export async function getBloggers(): Promise<Blogger[]> {
  return MOCK_BLOGGERS;
}

// Profile page, split per section so each section fetches only what it
// needs. Each function below stands in for what would normally be its own
// API request; swap the body for a real fetch/DB call whenever the backend
// is ready and no component code needs to change.

export async function getBloggerProfile(
  id: string,
): Promise<BloggerProfile | null> {
  const blogger = findBlogger(id);
  if (!blogger) return null;

  const { id: bloggerId, name, username, title, bio, coverImage, isFollowing } =
    blogger;

  return { id: bloggerId, name, username, title, bio, coverImage, isFollowing };
}

export async function getBloggerStats(
  id: string,
): Promise<BloggerStats | null> {
  const blogger = findBlogger(id);
  return blogger ? blogger.stats : null;
}

export async function getBloggerRecommendedPlaces(
  id: string,
): Promise<BloggerRecommendedPlace[]> {
  const blogger = findBlogger(id);
  return blogger ? blogger.recommendedPlaces : [];
}

export async function getBloggerVideos(id: string): Promise<BloggerVideo[]> {
  const blogger = findBlogger(id);
  return blogger ? blogger.videos : [];
}

export async function getBloggerSocialLinks(
  id: string,
): Promise<BloggerSocialLinks> {
  const blogger = findBlogger(id);
  return blogger ? blogger.socialLinks : {};
}
