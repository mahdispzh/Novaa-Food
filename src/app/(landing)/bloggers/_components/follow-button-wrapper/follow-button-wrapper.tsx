"use client";

import { ICONS } from "@/src/shared/constants/dynamic-icon";
import { Button } from "@/src/shared/ui/button/Button";
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
      className="border-primary bg-biege text-[13px] text-primary"
      size="md"
      type="button"
      variant="outline"
      width="full"
      onClick={toggleFollow}
    >
      {PlusIcon && (
        <span className="ml-2 inline-block">
          <PlusIcon color="text-primary" size="md" />
        </span>
      )}
      {isFollowing ? "دنبال شده" : "دنبال کردن"}
    </Button>
  );
}
