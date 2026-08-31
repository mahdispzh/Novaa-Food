"use client";

import CategoryCard from "@/src/app/(landing)/(home)/_components/category-card/category-card";
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

        <div className="scrollbar-hide flex overflow-x-auto scroll-smooth gap-5">
          {data.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.name}
              icon={category.icon}
            />
          ))}
        </div>
      </div>

  );
}
