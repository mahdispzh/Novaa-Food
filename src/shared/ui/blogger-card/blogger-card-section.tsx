"use client";

import { ICONS } from "@/src/shared/constants/dynamic-icon";
import { Button } from "@/src/shared/ui";
import Container from "@/src/shared/ui/container/container";
import SectionHeading from "@/src/shared/ui/section-heading/section-heading";
import BloggerCard from "./blogger-card";
import { bloggerCards } from "./blogger-card-constant";

type BloggerSectionProps = {
  data: any[];
};

const { sparkleIcon: SparkleIcon,
  chevronlefticon:ChevronLeftIcon
 } = ICONS;

export default function BloggerCardSection({data}:BloggerSectionProps) {
  return (
    <div className="mt-5 flex flex-col gap-3">
      <Container>
        <div className="flex items-center justify-between gap-2">
          <SectionHeading
            title="بلاگرها"
            subtitle="انتخاب‌های واقعی, تجربه‌های واقعی"
          />
          <div className="flex items-center">
            <Button variant="link" size="sm">
              <span>مشاهده همه</span>
            </Button>
            <ChevronLeftIcon size="sm" color="text-secondary" />
          </div>
        </div>
      </Container>

      <div
        className="scrollbar-hide flex gap-5 overflow-x-auto scroll-smooth px-4"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {bloggerCards.map((blogger) => (
          <div
            key={blogger.id}
            className="shrink-0"
            style={{ scrollSnapAlign: "start", width: "80%", maxWidth: 280 }}
          >
            <BloggerCard
              name={blogger.name}
              username={blogger.username}
              avatar={blogger.avatar}
              role={blogger.role}
              reviewsCount={blogger.reviewsCount}
            />
          </div>
        ))}
      </div>
    </div>
  );
}