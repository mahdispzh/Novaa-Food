"use client";
import { ICONS } from "@/src/shared/constants/dynamic-icon";
import Image from "next/image";
import bloggerCardShape from "../assets/shapes/blogger-card.svg";
import { Button } from "../button/Button";
import { BloggerCardProps } from "./blogger-card-typs";
import bloggerCardAvatar from "../blogger-card/blogger-card-avatar.svg"

const {
  verifiedIcon: VerifiedIcon,
  correctIcon: CorrectIcon,
  starIcon: StarIcon,
} = ICONS;

export default function BloggerCard({
  name,
  username,
  avatar,
  isVerified,
  role,
  reviewsCount,
}: BloggerCardProps) {
  return (
    <div className="relative w-[236px] h-[264px] mt-2">
      <Image src={bloggerCardShape} alt="" fill className="object-contain" />
      <div className="flex flex-col">
        <div className="absolute right-15 -top-2 h-30 w-30 overflow-hidden rounded-full border-4 border-white">
          <Image src={avatar} alt={name} fill className="object-cover" />
        </div>
        
        <div className="flex">
          <div className="absolute top-30 right-4 flex items-center gap-2">
            <VerifiedIcon size="sm" color="text-primary" />
            <p className="text-[13px] font-medium text-primary">{name}</p>
          </div>

          <p className="absolute top-30 right-40 text-[12px] font-light text-primary-50">
            {username}
          </p>
        </div>
        <p className="absolute top-37 right-4 text-[12px] font-light text-primary-50">
          {role}
        </p>

        <div className="absolute top-44 right-4 flex items-center gap-2">
          <CorrectIcon size="md" color="text-primary" />
          <p className="font-regular text-[12px] text-primary whitespace-nowrap">
            {reviewsCount} معرفی و پیشنهاد
          </p>
        </div>

        <Button
          className="absolute top-52 right-4"
          variant="primary"
          size="sm"
          width="medium"
          rounded="full"
        >
          <span className="font-regular text-[12px]">مشاهده پروفایل</span>
        </Button>
      </div>
    </div>
  );
}
