"use client";

import { useState } from "react";

export function useFollowBlogger(initialIsFollowing: boolean) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  function toggleFollow() {
    // TODO: call the follow/unfollow API here, and roll back state on failure
    setIsFollowing((prev) => !prev);
  }

  return { isFollowing, toggleFollow };
}