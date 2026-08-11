"use client";

import { ICONS } from "@/src/shared/constants/dynamic-icon";
import { Button } from "@/src/shared/ui";
import SectionHeading from "@/src/shared/ui/section-heading/section-heading";
import PopularCard from "./popular-card";

type PopularSectionProps = {
  data: any[];
};

const { sparkleIcon: SparkleIcon, chevronlefticon: ChevronLeftIcon } = ICONS;

export default function PopularCardSection({ data }: PopularSectionProps) {
  return (
    <div className="mt-5 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <SectionHeading
          title="محبوب‌ترین‌ها"
          subtitle="انتخاب شده توسط عاشقان غذا"
        />
        <div className="flex items-center">
          <Button variant="link" size="sm">
            <span>مشاهده همه</span>
          </Button>
          <ChevronLeftIcon size="md" color="text-secondary" />
        </div>
      </div>

      <div
        className="scrollbar-hide flex gap-5 overflow-x-auto scroll-smooth px-4"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {data.map((popular) => (
          <div
            key={popular.id}
            className="shrink-0"
            style={{ scrollSnapAlign: "start" }}
          >
            <PopularCard
              title={popular.title}
              category={popular.category}
              image={popular.image}
              rating={popular.rating}
              location={popular.location}
              reviewsCount={popular.reviewsCount}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-2 mt-3">
        <SectionHeading
          title="بلاگرها"
          subtitle="انتخاب‌های واقعی, تجربه‌های واقعی"
        />
        <div className="flex items-center">
          <Button variant="link" size="sm">
            <span>مشاهده همه</span>
          </Button>
          <ChevronLeftIcon size="md" color="text-secondary" />
        </div>
      </div>
    </div>
  );
}
