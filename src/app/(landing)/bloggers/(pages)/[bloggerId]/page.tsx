import { notFound } from "next/navigation";

import SectionHeading from "@/src/shared/ui/section-heading/section-heading";

import BloggerHero from "../../_components/blogger-hero/blogger-hero";
import BloggerStatsRow from "../../_components/blogger-states-row/blogger-states-row";
import FollowButtonWrapper from "../../_components/follow-button-wrapper/follow-button-wrapper";
import RecommendedPlaceCard from "../../_components/recommended-place-card/recommended-place-card";
import SocialLinks from "../../_components/social-links/social-links";
import VideoThumbnail from "../../_components/video-thumbnail/video-thumbnail";
import { getBloggerById } from "../../_services/bloggers.service";

interface BloggerPageProps {
  params: { bloggerId: string };
}

export default async function BloggerPage({ params }: BloggerPageProps) {
  const blogger = await getBloggerById(params.bloggerId);

  if (!blogger) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 pb-6">
      <BloggerHero blogger={blogger} />

      <div className="flex flex-col gap-4 px-4">
        <p className="text-gray text-[13px] leading-6">{blogger.bio}</p>

        <FollowButtonWrapper initialIsFollowing={blogger.isFollowing} />

        <BloggerStatsRow stats={blogger.stats} />

        {blogger.recommendedPlaces.length > 0 && (
          <div className="flex flex-col gap-3">
            <SectionHeading title="منتخب‌های من" />
            <div className="flex gap-3 overflow-x-auto">
              {blogger.recommendedPlaces.map((place) => (
                <RecommendedPlaceCard key={place.id} place={place} />
              ))}
            </div>
          </div>
        )}

        {blogger.videos.length > 0 && (
          <div className="flex flex-col gap-3">
            <SectionHeading title="ویدیوهای معرفی" />
            <div className="grid grid-cols-2 gap-3">
              {blogger.videos.map((video) => (
                <VideoThumbnail key={video.id} video={video} />
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <SectionHeading title="شبکه‌های اجتماعی" />
          <SocialLinks links={blogger.socialLinks} />
        </div>
      </div>
    </div>
  );
}