"use client";

import { ICONS } from "@/src/shared/constants/dynamic-icon";
import { Button } from "@/src/shared/ui";
import Container from "@/src/shared/ui/container/container";
import SectionHeading from "@/src/shared/ui/section-heading/section-heading";
import { nearByCards } from "./near-by-card-constants";
import NearByCard from "./near-by-card";

const { sparkleIcon: SparkleIcon } = ICONS;

export default function NearByCardSection() {
  return (
    <Container>
      <div className="mt-5 flex flex-col justify-between gap-3">
        <div className="flex items-center justify-between gap-2">
          <SectionHeading
            title="نزدیک‌ترین‌ها"
            subtitle="بهترین انتخاب ها در چند قدمی"
          />
          <div className="flex items-center gap-1">
            <Button variant="link" size="sm">
              <span>مشاهده همه</span>
            </Button>
            <SparkleIcon size="md" color="text-primary" />
          </div>
        </div>

        <div className="flex gap-5">
                  {nearByCards.map((nearBy) => (
                    <NearByCard
                      key={nearBy.id}
                      title={nearBy.title}
                      category={nearBy.category}
                      image={nearBy.image}
                      rating={nearBy.rating}
                      location={nearBy.location}
                      
                    />
                  ))}
                </div>
      </div>
    </Container>
  );
}
