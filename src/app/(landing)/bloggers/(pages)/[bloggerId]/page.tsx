import { notFound } from "next/navigation";

import Main from "@/src/shared/ui/main/main";
import BloggerHero from "../../_components/blogger-hero/blogger-hero";
import BloggerStatsRow from "../../_components/blogger-states-row/blogger-states-row";
import FollowButtonWrapper from "../../_components/follow-button-wrapper/follow-button-wrapper";
import RecommendedPlacesCarousel from "../../_components/recommended-places-carousel/recommended-places-carousel";
import SocialSection from "../../_components/social-section/social-section";
import VideosSection from "../../_components/videos-section/videos-section";
import {
  getBloggerProfile,
  getBloggerRecommendedPlaces,
  getBloggerSocialLinks,
  getBloggerStats,
  getBloggerVideos,
} from "../../_services/bloggers.server";

interface BloggerPageProps {
  params: Promise<{ bloggerId: string }>;
}

export default async function BloggerPage({ params }: BloggerPageProps) {
  const { bloggerId } = await params;

  const [profile, stats, recommendedPlaces, videos, socialLinks] =
    await Promise.all([
      getBloggerProfile(bloggerId),
      getBloggerStats(bloggerId),
      getBloggerRecommendedPlaces(bloggerId),
      getBloggerVideos(bloggerId),
      getBloggerSocialLinks(bloggerId),
    ]);

  if (!profile || !stats) {
    notFound();
  }

  return (
    <Main>
      <div className="flex flex-col gap-6 pb-6">
        <BloggerHero blogger={profile} />
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 px-4">
            <FollowButtonWrapper initialIsFollowing={profile.isFollowing} />

            <p className="text-[13px] leading-6 text-gray">{profile.bio}</p>

            <BloggerStatsRow stats={stats} />

            {recommendedPlaces.length > 0 && (
              <RecommendedPlacesCarousel places={recommendedPlaces} />
            )}

            <SocialSection links={socialLinks} />
          </div>
          <VideosSection videos={videos} />
        </div>
      </div>
    </Main>
  );
}
