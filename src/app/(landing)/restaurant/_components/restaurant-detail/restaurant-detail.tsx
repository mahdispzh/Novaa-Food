"use client";

import { ICONS } from "@/src/shared/constants/dynamic-icon";
import Badge from "@/src/shared/ui/Badge/Badge";
import { Tab } from "@/src/shared/ui/tab/tab";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

import resturantDetailImage from "@/src/app/(landing)/restaurant/_assets/restaurant-detail-image.svg";

import useReastaurantDetail from "../../_hooks/use-restaurant-detail";
import { RestaurantDetailProps } from "../../_types/restaurant-detail-type";

import RestaurantBlogger from "./tabs/bloggers/blogger";
import { RestaurantBloggerData } from "./tabs/bloggers/blogger-constant";

import RestaurantGallery from "./tabs/gallery/restaurant-gallery";

import RestaurantIntroduction from "./tabs/introduction/restaurant-introduction";
import { restaurantIntroductionData } from "./tabs/introduction/restaurant-introduction-constant";

import RestaurantReview from "./tabs/review/restaurant-review";
import { restaurantReviewData } from "./tabs/review/restaurant-review-constant";

import ReviewForm from "./tabs/review/review-form/review-form";
import { ReviewFormData } from "./tabs/review/review-form/review-form-constant";

const {
  starIcon: StarIcon,
  saveIcon: SaveIcon,
  shareIcon: ShareIcon,
  dotIcon: DotIcon,
} = ICONS;

export default function RestaurantDetail({
  title,
  image,
  rating,
  reviewsCount,
  category,
  tabs,
}: RestaurantDetailProps) {
  const { activeTab, setActiveTab } = useReastaurantDetail();

  const [showReviewForm, setShowReviewForm] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!showReviewForm ? (
        <motion.div
          key="restaurant-detail"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col"
        >
          {/* Restaurant Image */}
          <Image
            src={resturantDetailImage}
            alt=""
            className="h-auto w-full"
          />

          <div className="px-3">
            {/* Restaurant Header */}
            <div className="mt-5 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="text-[22px] font-medium text-secondary">
                  {title}
                </p>

                <div className="flex items-center gap-1">
                  <Badge
                    variant="ghost"
                    badgeSize="xs"
                    leftIcon={
                      <StarIcon
                        size="xs"
                        color="text-primary"
                      />
                    }
                  >
                    {rating}
                  </Badge>

                  <span className="text-[9px] text-primary">
                    ({reviewsCount} نظر)
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <ShareIcon
                  size="md"
                  color="text-secondary"
                />

                <SaveIcon
                  size="md"
                  color="text-secondary"
                />
              </div>
            </div>

            {/* Category */}
            <div className="flex items-center gap-1">
              <DotIcon
                size="2xs"
                color="text-primary"
              />

              <p className="text-[12px] font-light text-primary">
                {category}
              </p>
            </div>

            {/* Tabs */}
            <div className="mt-4 flex flex-wrap gap-4">
              {tabs.map((tab) => (
                <Tab
                  key={tab.id}
                  label={tab.title}
                  active={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                />
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                {activeTab === "introduction" && (
                  <RestaurantIntroduction
                    {...restaurantIntroductionData}
                  />
                )}

                {activeTab === "reviews" && (
                  <RestaurantReview
                    {...restaurantReviewData}
                    onReviewClick={() =>
                      setShowReviewForm(true)
                    }
                  />
                )}

                {activeTab === "gallery" && (
                  <RestaurantGallery />
                )}

                {activeTab === "bloggers" && (
                  <RestaurantBlogger
                    {...RestaurantBloggerData}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="review-form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="min-h-screen"
        >
          <ReviewForm
            restaurantName={ReviewFormData.restaurantName}
            image={ReviewFormData.image}
            onBack={() => setShowReviewForm(false)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}