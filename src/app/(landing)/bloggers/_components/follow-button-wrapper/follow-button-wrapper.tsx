"use client";

import { Button } from "@/src/shared/ui/button/Button";
import { ICONS } from "@/src/shared/constants/dynamic-icon";
import { useFollowBlogger } from "../../_hooks/use-follow-blogger";

interface FollowButtonWrapperProps {
  initialIsFollowing: boolean;
}

export default function FollowButtonWrapper({
  initialIsFollowing,
}: FollowButtonWrapperProps) {
  const { isFollowing, toggleFollow } = useFollowBlogger(initialIsFollowing);
  const PlusIcon = ICONS.plusIcon;

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
      {PlusIcon && (
        <span className="inline-block ml-2">
          <PlusIcon color="text-primary" size="md" />
        </span>
      )}
      {isFollowing ? "دنبال شده" : "دنبال کردن"}
    </Button>
  );
}
