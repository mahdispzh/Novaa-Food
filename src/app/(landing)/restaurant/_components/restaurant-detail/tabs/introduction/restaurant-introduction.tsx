"use client"

import RestaurantDetailCardSection from "../../detail-card/restaurant-detail-card-section"
import { ICONS } from "@/src/shared/constants/dynamic-icon";
import { Button } from "@/src/shared/ui";
import Badge from "@/src/shared/ui/Badge/Badge";
import Image from "next/image";
import { RestaurantIntroductionProps } from "./restaurant-introduction-type";

const {
  clockIcon: ClockIcon,
  instagramIcon: InstagramIcon,
  locationIcon: LocationIcon,
  phoneIcon: PhoneIcon,
  correctIcon: CorrectIcon,
} = ICONS;

export default function RestaurantIntroduction({
  location,
  description,
  contactDescription,
  phone,
  address,
  workingHours,
  instagram,
  badges,
}:RestaurantIntroductionProps){
return(
    <div className="flex flex-col">

        
      <p className="mt-5 text-[13px] font-light text-secondary">
        {description}
      </p>
      <div className="mt-5 flex items-center gap-1">
        <LocationIcon size="md" color="text-primary" />
        <p className="text-[13px] font-light text-primary">{location}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-6">
        {badges.map((badge) => (
          <Badge
            key={badge.id}
            variant="primary"
            badgeSize="sm"
            rounded="sm"
            className="gap-1 px-2"
            rightIcon={<CorrectIcon size="sm" color="text-beige" />}
          >
            <span className="text-[12px] font-light">{badge.title}</span>
          </Badge>
        ))}
      </div>

      <p className="mt-5 text-[16px] font-medium text-secondary">
        {contactDescription}
      </p>
      <div className="mt-6 flex flex-col">
        <div className="flex items-center gap-2">
          <PhoneIcon size="md" color="text-secondary" />
          <p className="font-regular text-[13px] text-secondary">شماره تماس:</p>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <PhoneIcon size="md" className="invisible" />
          <p className="font-regular text-[13px] text-secondary">{phone}</p>
        </div>

        <div className="mt-6 flex items-center gap-1">
          <LocationIcon size="md" color="text-secondary" />
          <p className="font-regular text-[13px] text-secondary">آدرس: </p>
        </div>
        <div className="mt-2 flex items-center gap-1">
          <LocationIcon size="md" className="invisible" />
          <p className="font-regular text-[13px] text-secondary">{address}</p>
        </div>

        <div className="mt-6 flex items-center gap-1">
          <ClockIcon size="md" color="text-secondary" />
          <p className="font-regular text-[13px] text-secondary">ساعت کاری:</p>
        </div>
        <div className="mt-2 flex items-center gap-1">
          <ClockIcon size="md" className="invisible" />
          <p className="font-regular text-[13px] text-secondary">
            {workingHours}
          </p>
        </div>

        <div className="mt-6 flex items-center gap-1">
          <InstagramIcon size="md" color="text-secondary" />
          <p className="font-regular text-[13px] text-secondary">{instagram}</p>
        </div>
      </div>
      <div className="mt-5 flex justify-center">
        <Button variant="primary" size="md" width="full" rounded="sm">
          <span className="text-[13px] font-medium">تماس با ما</span>
        </Button>
      </div>
      <RestaurantDetailCardSection />

    </div>
)
}