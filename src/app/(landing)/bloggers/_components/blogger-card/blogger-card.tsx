"use client";

import Link from "next/link";

import { ICONS } from "@/src/shared/constants/dynamic-icon";

import { useFollowBlogger } from "../../_hooks/use-follow-blogger";
import FollowButton from "../follow-button/follow-button";
import { BloggerCardProps } from "./blogger-card.types";

export default function BloggerCard({ blogger, reversed = false }: BloggerCardProps) {
  const { isFollowing, toggleFollow } = useFollowBlogger(blogger.isFollowing);

  const frame = <FollowButton avatarSrc={blogger.coverImage} alt={blogger.name} isFollowing={isFollowing} onToggleFollow={toggleFollow} />;

  const info = (
    <div className="flex min-w-0 flex-1 flex-col justify-center gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[17px] font-bold text-primary">
            {blogger.name}
          </h3>
          <p
            className="mt-1 text-[13px] text-gray"
            dir="ltr"
            style={{ textAlign: "right" }}
          >
            @{blogger.username}
          </p>
        </div>

        <div className="mt-1 shrink-0">
          <ICONS.shareIcon size="sm" color="text-primary" />
        </div>
      </div>

      <p className="text-[12px] leading-3.5 text-gray">
        {blogger.bio}
      </p>

      <Link
        href={`/bloggers/${blogger.id}`}
        className="mt-0 inline-flex w-full items-center justify-center rounded-lg bg-primary py-1.5 text-[10px] font-medium text-white transition hover:opacity-90"
      >
        مشاهده پروفایل
      </Link>
    </div>
  );

  return (
    <div className="flex w-full flex-col rounded-[28px] bg-white p-5 ">
      <div className="flex items-stretch gap-5">
        {reversed ? (
          <>
            {frame}
            {info}
          </>
        ) : (
          <>
            {info}
            {frame}
          </>
        )}
      </div>
    </div>
  );
}