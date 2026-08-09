"use client";
import { ICONS } from "@/src/shared/constants/dynamic-icon";
import { Button } from "@/src/shared/ui";
import Badge from "@/src/shared/ui/Badge/Badge";
import Container from "@/src/shared/ui/container/container";
import SectionHeading from "@/src/shared/ui/section-heading/section-heading";
import { Tab } from "@/src/shared/ui/tab/tab";
import Image from "next/image";
import resturantDetailImage from "./restaurant-detail-image.svg";
import { RestaurantDetailProps } from "./restaurant-detail-type";

const {
  starIcon: StarIcon,
  saveIcon: SaveIcon,
  shareIcon: ShareIcon,
  clockIcon: ClockIcon,
  instagramIcon: InstagramIcon,
  locationIcon: LocationIcon,
  phoneIcon: PhoneIcon,
  correctIcon: CorrectIcon,
  dotIcon : DotIcon,
} = ICONS;

export default function RestaurantDetail({
  title,
  image,
  rating,
  location,
  description,
  reviewsCount,
  contactDescription,
  phone,
  address,
  workingHours,
  instagram,
  category,
  tabs,
  badges,
}: RestaurantDetailProps) {
  return (
    <div className="flex flex-col gap-5">
      <Image src={resturantDetailImage} alt="" className="h-auto w-full" />

      <Container className="flex flex-col">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <p className="text-[22px] font-medium text-secondary">{title}</p>

            <div className="flex items-center gap-1">
              <Badge
                variant="ghost"
                badgeSize="xs"
                leftIcon={<StarIcon size="xs" color="text-primary" />}
              >
                {rating}
              </Badge>

              <span className="text-[9px] text-primary">
                ({reviewsCount} نظر)
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <ShareIcon size="md" color="text-secondary" />
            <SaveIcon size="md" color="text-secondary" />
          </div>
        </div>
        <div className="flex gap-1 items-center">
          <DotIcon size="2xs" color="text-primary" />
<p className="text-[12px] font-light text-primary">{category}</p>
        </div>
        

        <div className="mt-4 flex flex-wrap gap-1">
          {tabs.map((tab) => (
            <Tab key={tab.id} label={tab.title} />
          ))}
        </div>

        {/* divider */}
        <div className="w-full">
          <div className="h-px gap-0 bg-gray-200" />
        </div>

        <p className="mt-5 text-[13px] font-light text-secondary">
          {description}
        </p>
        <div className="mt-5 flex items-center gap-1">
          <LocationIcon size="md" color="text-primary" />
          <p className="text-[13px] font-light text-primary">{location}</p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
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
        <div className="mt-5 flex flex-col">
          <div className="flex items-center gap-2">
            <PhoneIcon size="md" color="text-secondary" />
            <p className="font-regular text-[13px] text-secondary">
              شماره تماس:
            </p>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <PhoneIcon size="md" className="invisible" />
            <p className="font-regular text-[13px] text-secondary">{phone}</p>
          </div>

          <div className="flex items-center gap-1 mt-4">
            <LocationIcon size="md" color="text-secondary" />
            <p className="font-regular text-[13px] text-secondary">آدرس: </p>
          </div>
          <div className="flex items-center gap-1 mt-3">
            <LocationIcon size="md" className="invisible" />
            <p className="font-regular text-[13px] text-secondary">{address}</p>
          </div>

          <div className="flex items-center gap-1 mt-4">
            <ClockIcon size="md" color="text-secondary" />
            <p className="font-regular text-[13px] text-secondary">
              ساعت کاری:
            </p>
          </div>
          <div className="flex items-center gap-1 mt-3">
            <ClockIcon size="md" className="invisible" />
            <p className="font-regular text-[13px] text-secondary">
              {workingHours}
            </p>
          </div>

          <div className="flex items-center gap-1 mt-4">
            <InstagramIcon size="md" color="text-secondary" />
            <p className="font-regular text-[13px] text-secondary">instagram</p>
          </div>
        </div>
        <div className="mt-5 flex justify-center">
          <Button variant="primary" size="md" width="large" rounded="sm">
            <span className="text-[13px] font-medium">تماس با ما</span>
          </Button>
        </div>
        <SectionHeading
          className="mt-5"
          title="سفارش پیشنهادی"
          subtitle="آیتم پیشنهادی ما را امتحان کنید."
        />
      </Container>
    </div>
  );
}
