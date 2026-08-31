export function transformBloggerToCard(blogger: any) {
  return {
    id: blogger.id,
    name: blogger.display_name,
    username: blogger.username,
    avatar: blogger.cover_image || "/placeholder-avatar.jpg",
    role: blogger.title || "",
    reviewsCount: blogger.followers_count ?? 0,
  };
}