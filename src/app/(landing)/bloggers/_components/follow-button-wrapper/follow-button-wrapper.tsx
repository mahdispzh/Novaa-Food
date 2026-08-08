"use client";

import { useFollowBlogger } from "../../_hooks/use-follow-blogger";

interface FollowButtonWrapperProps {
  initialIsFollowing: boolean;
}

export default function FollowButtonWrapper({
  initialIsFollowing,
}: FollowButtonWrapperProps) {
  const { isFollowing, toggleFollow } = useFollowBlogger(initialIsFollowing);

  return (
    <button
      type="button"
      onClick={toggleFollow}
      aria-pressed={isFollowing}
      className="border-primary/30 text-primary flex w-full items-center justify-center gap-1.5 rounded-2xl border bg-white py-3 text-[13px] font-medium transition hover:opacity-90"
    >
      {!isFollowing && <span aria-hidden>+</span>}
      <span>{isFollowing ? "دنبال شده" : "دنبال کردن"}</span>
    </button>
  );
}
