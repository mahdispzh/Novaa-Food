"use client";

import { useState } from "react";

export function useFollowBlogger(initialIsFollowing: boolean) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  function toggleFollow() {
    setIsFollowing((prev) => !prev);
  }

  return { isFollowing, toggleFollow };
}