"use client";

import { ICONS } from "@/src/shared/constants/dynamic-icon";
import { Button } from "@/src/shared/ui";
import Container from "@/src/shared/ui/container/container";
import SectionHeading from "@/src/shared/ui/section-heading/section-heading";
import { PopularCards } from "./popular-card-constants";
import PopularCard from "./popular-card";


const { sparkleIcon: SparkleIcon } = ICONS;

export default function PopularCardSection() {
  return (
    <Container>
      <div className="mt-5 flex flex-col justify-between gap-3">
        <div className="flex items-center justify-between gap-2">
          <SectionHeading
            title="محبوب‌ترین‌ها"
            subtitle="انتخاب شده توسط عاشقان غذا"
          />
          <div className="flex items-center gap-1">
            <Button variant="link" size="sm">
              <span>مشاهده همه</span>
            </Button>
            <SparkleIcon size="md" color="text-primary" />
          </div>
        </div>

        <div className="flex gap-5">
                  {PopularCards.map((popular) => (
                    <PopularCard
                      key={popular.id}
                      title={popular.title}
                      category={popular.category}
                      image={popular.image}
                      rating={popular.rating}
                      location={popular.location}
                      reviewsCount = {popular.reviewsCount}
                      
                    />
                  ))}
                </div>
      </div>
    </Container>
  );
}
