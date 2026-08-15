import BloggerRatingCard from "./blogger-rating";
import { BloggerRatingData } from "./blogger-rating-constant";

export default function BloggerRatingSection() {
  return (
    <div className="flex justify-center gap-5 ">
      {BloggerRatingData.map((item, index) => (
        <BloggerRatingCard key={index} data={item} />
      ))}
    </div>
  );
}