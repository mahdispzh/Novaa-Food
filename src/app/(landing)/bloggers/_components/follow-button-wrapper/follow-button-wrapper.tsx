"use client";

import FollowButton from "../follow-button/follow-button";
import { useFollowBlogger } from "../../_hooks/use-follow-blogger";

interface FollowButtonWrapperProps {
  initialIsFollowing: boolean;
}

export default function FollowButtonWrapper({
  initialIsFollowing,
}: FollowButtonWrapperProps) {
  const { isFollowing, toggleFollow } = useFollowBlogger(initialIsFollowing);

  return (
    <FollowButton
      isFollowing={isFollowing}
      onToggle={toggleFollow}
      className="w-full py-3"
    />
  );
}