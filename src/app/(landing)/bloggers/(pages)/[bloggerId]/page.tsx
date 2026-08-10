import { notFound } from "next/navigation";

import Main from "@/src/shared/ui/main/main";
import BloggerHero from "../../_components/blogger-hero/blogger-hero";
import BloggerStatsRow from "../../_components/blogger-states-row/blogger-states-row";
import FollowButtonWrapper from "../../_components/follow-button-wrapper/follow-button-wrapper";
import RecommendedPlacesCarousel from "../../_components/recommended-places-carousel/recommended-places-carousel";
import SocialSection from "../../_components/social-section/social-section";
import VideosSection from "../../_components/videos-section/videos-section";
import { getBloggerById } from "../../_services/bloggers.service";

interface BloggerPageProps {
  params: Promise<{ bloggerId: string }>;
}

export default async function BloggerPage({ params }: BloggerPageProps) {
  const { bloggerId } = await params;
  const blogger = await getBloggerById(bloggerId);

  if (!blogger) {
    notFound();
  }

  return (
    <Main>
      <div className="flex flex-col gap-6 pb-6">
        <BloggerHero blogger={blogger} />
        <div className="flex flex-col gap-4 px-4">
          <FollowButtonWrapper initialIsFollowing={blogger.isFollowing} />

          <p className="text-[13px] leading-6 text-gray">{blogger.bio}</p>

          <BloggerStatsRow stats={blogger.stats} />

          {blogger.recommendedPlaces.length > 0 && (
            <div className="flex flex-col gap-3">
              <RecommendedPlacesCarousel
                places={blogger.recommendedPlaces}
              />
            </div>
          )}

          <VideosSection videos={blogger.videos} />

          <SocialSection links={blogger.socialLinks} />
        </div>
      </div>
    </Main>
  );
}
