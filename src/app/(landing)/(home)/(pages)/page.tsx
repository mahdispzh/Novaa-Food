import Main from "@/src/shared/ui/main/main";
import CategoryCardMain from "../_components/category-card/category-card-main";
import EventCardMain from "../_components/event-card/event-card-main";
import NearByCardMain from "../_components/near-by-card/near-by-card-main";
import PopularCardMain from "../_components/popular-card/popular-card-main";
import BloggerCardMain from "@/src/shared/ui/blogger-card/blogger-card-main";

export default function HomePage() {
  // const {
  //   categories,
  //   eventCards,
  //   nearByCards,
  //   PopularCards,
  //   bloggerCards,
  // } = useHome();

  return (
    <Main>
      <CategoryCardMain />
      <EventCardMain/>
      <NearByCardMain/>
      <PopularCardMain/>
      <BloggerCardMain/>
    </Main>
  );
}