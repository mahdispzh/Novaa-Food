"use client";

import { Button } from "@/src/shared/ui/button/Button";

import { useFollowBlogger } from "../../_hooks/use-follow-blogger";

interface FollowButtonWrapperProps {
  initialIsFollowing: boolean;
}

export default function FollowButtonWrapper({
  initialIsFollowing,
}: FollowButtonWrapperProps) {
  const { isFollowing, toggleFollow } = useFollowBlogger(initialIsFollowing);

  return (
    <Button
      aria-pressed={isFollowing}
      
      className="border-primary bg-white text-primary text-[13px]"
      size="md"
      type="button"
      variant="outline"
      width="full"
      onClick={toggleFollow}
    >
      {isFollowing ? "دنبال شده" : "دنبال کردن"}
    </Button>
  );
}
