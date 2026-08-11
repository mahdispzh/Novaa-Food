import BloggerRatingCard from "./blogger-rating";
import { BloggerRatingData } from "./blogger-rating-constant";

export default function BloggerRatingSection() {
  return (
    <div className="flex gap-4">
      {BloggerRatingData.map((item, index) => (
        <BloggerRatingCard key={index} data={item} />
      ))}
    </div>
  );
}