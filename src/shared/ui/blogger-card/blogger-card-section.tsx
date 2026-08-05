"use client";

import { ICONS } from "@/src/shared/constants/dynamic-icon";
import { Button } from "@/src/shared/ui";
import Container from "@/src/shared/ui/container/container";
import SectionHeading from "@/src/shared/ui/section-heading/section-heading";
import BloggerCard from "./blogger-card";
import { bloggerCards } from "./blogger-card-constant";

const { sparkleIcon: SparkleIcon } = ICONS;

export default function BloggerCardSection() {
  return (
    <Container>
      <div className="mt-5 flex flex-col justify-between gap-3">
        <div className="flex items-center justify-between gap-2">
          <SectionHeading
            title="بلاگرها"
            subtitle="انتخاب‌های واقعی, تجربه‌های واقعی"
          />
          <div className="flex gap-1 items-center">
            <Button variant="link" size="sm">
              <span>مشاهده همه</span>
            </Button>
            <SparkleIcon size="md" color="text-primary" />
          </div>
        </div>

        <div className="flex gap-5">
          {bloggerCards.map((blogger) => (
            <BloggerCard
              key={blogger.id}
              name={blogger.name}
              username={blogger.username}
              avatar={blogger.avatar}
              role={blogger.role}
              reviewsCount={blogger.reviewsCount}
              
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
