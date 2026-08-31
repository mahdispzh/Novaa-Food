import BloggerCardSection from "./blogger-card-section";
import { getLandingHome } from "@/src/app/(landing)/(home)/_services/home.server";
import { transformBloggerToCard } from "./blogger-card-transformer";

export default async function BloggerCardMain() {
  const { bloggers } = await getLandingHome();
  const cards = bloggers.map(transformBloggerToCard);

  return <BloggerCardSection data={cards} />;
}