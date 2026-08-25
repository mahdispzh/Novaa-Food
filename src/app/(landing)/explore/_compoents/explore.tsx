"use client";

import { ICONS } from "@/src/shared/constants/dynamic-icon";
import Badge from "@/src/shared/ui/Badge/Badge";
import Input from "@/src/shared/ui/search-input/Input";
import ExploreCardsSection from "./explore-cards/explore-cards-section";

const { searchIcon: SearchIcon, chevronDownIcon: ChevronDownIcon } = ICONS;
const filters = [
  "ترتیب سازی",
  "دسته‌بندی",
  "فاصله",
  "امتیاز",
  "دسته‌بندی",
  "دسته‌بندی",
  "دسته‌بندی",
];

export default function ExplorePage() {
  return (
    <div className="flex flex-col">
      <div className="mx-2 mt-5">
        <Input
          inputSize="mapSize"
          variant="outline"
          rounded="full"
          placeholder="جستجو"
          leftIcon={<SearchIcon size="md" color="text-gray" />}
        />
      </div>

      <div className="scrollbar-hide mt-5 flex items-center gap-3 overflow-x-auto scroll-smooth mb-17">
        {filters.map((filter) => (
          <Badge
            key={filter}
            variant="outline"
            rounded="full"
            badgeSize="sm"
            clickable
            leftIcon={
              <ChevronDownIcon
                size="xs"
                color="text-secondary"
                className="mt-1 group-hover:text-beige"
              />
            }
            className="group shrink-0 px-3 hover:bg-primary"
          >
            <span className="text-[16px] font-light text-secondary hover:text-beige">
              {filter}
            </span>
          </Badge>
        ))}
      </div>
      <p className="text-[12px] text-primary font-light">۸ رستوران باز</p>
      <ExploreCardsSection  />
    </div>
  );
}
