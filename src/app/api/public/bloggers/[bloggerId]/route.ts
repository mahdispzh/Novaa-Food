import { getBloggerProfile, getBloggerRecommendedPlaces, getBloggerSocialLinks, getBloggerStats, getBloggerVideos } from "@/src/app/(landing)/bloggers/_services/bloggers.service";
import { NextResponse } from "next/server";

export async function GET(_request: Request, { params }: { params: Promise<{ bloggerId: string }> }) {
  const { bloggerId } = await params;
  const [profile, stats, recommendedPlaces, videos, socialLinks] = await Promise.all([getBloggerProfile(bloggerId), getBloggerStats(bloggerId), getBloggerRecommendedPlaces(bloggerId), getBloggerVideos(bloggerId), getBloggerSocialLinks(bloggerId)]);
  return profile ? NextResponse.json({ ...profile, stats, recommendedPlaces, videos, socialLinks }) : NextResponse.json({ message: "بلاگر پیدا نشد" }, { status: 404 });
}
