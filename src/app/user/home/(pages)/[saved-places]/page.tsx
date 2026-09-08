"use client";

import { CategoryTabs } from "@/src/app/user/home/_components/category-tabs/category-tabs";
import { SavedPlaceCard } from "@/src/app/user/home/_components/saved-place-card/saved-place-card";
import { SavedPlacesHeader } from "@/src/app/user/home/_components/saved-places-header/saved-places-header";
import type { SavedPlace } from "@/src/app/user/home/_types/home.types";
import Main from "@/src/shared/ui/main/main";
import { useState } from "react";

const categories = [
  { id: "all", label: "همه دسته‌بندی‌ها" },
  { id: "cafe", label: "کافه" },
  { id: "restaurant", label: "رستوران" },
  { id: "fastfood", label: "فست‌فود" },
  { id: "bakery", label: "بیکری" },
];

// TODO: replace with real saved-places data (API call)
const savedPlaces: SavedPlace[] = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  title: "کافه تیرا",
  categoryId: "cafe",
  categoryLabel: "کافه",
  city: "شیراز",
  district: "نیایش",
  rating: 4.8,
  imageSrc: "/images/places/cafe-tira.jpg",
}));

export default function SavedPlacesPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPlaces =
    activeCategory === "all"
      ? savedPlaces
      : savedPlaces.filter((place) => place.categoryId === activeCategory);

  return (
    <Main
      hideFooter
      className="h-screen overflow-y-auto bg-light-beige px-4 py-4 text-secondary"
    >
      <SavedPlacesHeader title="مکان‌های ذخیره‌شده" />
      <CategoryTabs
        activeCategory={activeCategory}
        categories={categories}
        onChange={setActiveCategory}
      />
      <div className="mt-2 flex flex-col">
        {filteredPlaces.map((place) => (
          <SavedPlaceCard key={place.id} {...place} />
        ))}
      </div>
    </Main>
  );
}
