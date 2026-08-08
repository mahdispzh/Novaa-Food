"use client";

import { ICONS } from "@/src/shared/constants/dynamic-icon";
import { Button } from "@/src/shared/ui";
import Container from "@/src/shared/ui/container/container";
import SectionHeading from "@/src/shared/ui/section-heading/section-heading";
import { nearByCards } from "./near-by-card-constants";
import NearByCard from "./near-by-card";

type NearBySectionProps = {
  data: any[];
};

const { sparkleIcon: SparkleIcon,
 chevronlefticon: ChevronLeftIcon
 } = ICONS;

export default function NearByCardSection({data}:NearBySectionProps) {
  return (
    <div className="mt-5 flex flex-col gap-3">
      <Container>
        <div className="flex items-center justify-between gap-2">
          <SectionHeading
            title="نزدیک‌ترین‌ها"
            subtitle="بهترین انتخاب ها در چند قدمی"
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
        {data.map((nearBy) => (
          <div
            key={nearBy.id}
            className="shrink-0"
            style={{ scrollSnapAlign: "start" }}
          >
            <NearByCard
              title={nearBy.title}
              category={nearBy.category}
              image={nearBy.image}
              rating={nearBy.rating}
              location={nearBy.location}
            />
          </div>
        ))}
      </div>
    </div>
  );
}