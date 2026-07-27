"use client";

import { CommentIcon } from "@/src/shared/constants/icons/comment-icon";

import { DashboardContainer } from "@/src/shared/components/dashboard-container";
import { DashboardMain } from "@/src/shared/components/dashboard-main";

import { DashboardProfileSidebar } from "@/src/app/dashboard/profile/_components/dashboard-profile-menu/dashboard-profile-sidebar";

import { ProductCommentsLayout } from "@/src/app/dashboard/comments/_components/product-card/product-comments-layout";
import { ProductCommentsSummary } from "@/src/app/dashboard/comments/_components/product-card/product-comments-summary";
import { useProductComments } from "@/src/app/dashboard/comments/_hooks/use-product-comments";
import { ProfileTitle } from "@/src/app/dashboard/profile/_components/profile-title";

export default function Page() {
  const { comments, product, summary } = useProductComments();

  return (
    <DashboardContainer>
      <DashboardProfileSidebar />

      <DashboardMain>
        <ProfileTitle title={"کامنت ها"} icon={CommentIcon} />

        <ProductCommentsLayout comments={comments} product={product} />

        <ProductCommentsSummary summary={summary} />
      </DashboardMain>
    </DashboardContainer>
  );
}
