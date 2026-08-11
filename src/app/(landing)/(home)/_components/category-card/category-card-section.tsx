"use client";

import CategoryCard from "@/src/app/(landing)/(home)/_components/category-card/category-card";
import { categories } from "@/src/app/(landing)/(home)/_components/category-card/category-card-constants";
import SectionHeading from "@/src/shared/ui/section-heading/section-heading";

type CatgorySectionProps = {
  data: any[];
};

export default function CategoryCardSection({data}:CatgorySectionProps) {
  return (

      <div className="mt-5 flex flex-col gap-3">
        <SectionHeading
          title="دسته‌بندی‌ها"
          subtitle="از کافه‌های دنج تا رستوران‌های خاص"
        />

        <div className="flex gap-5">
          {data.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              icon={category.icon}
            />
          ))}
        </div>
      </div>

  );
}
