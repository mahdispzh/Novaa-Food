"use client";
import { ICONS } from "@/src/shared/constants/dynamic-icon";
import { Button } from "@/src/shared/ui";
import Image from "next/image";
import { ReviewFormProps } from "./review-form-type";

const { starIcon: StarIcon, chevronDownIcon: ChevronDownIcon } = ICONS;
export default function ReviewForm({ restaurantName, image }: ReviewFormProps) {
  return (
    <div className="flex flex-col">
      {/* title and icon */}
      <div className="flex gap-1 p-5">
        <StarIcon size="md" color="text-beige" />
        <p className="font-regular text-[16px] text-primary">ثبت دیدگاه</p>
      </div>
      {/* divider */}
      <div className="w-full">
        <div className="h-px gap-0 bg-gray-500" />
      </div>

      {/* image and restaurantName */}
      <div className="mt-7 flex gap-1">
        <Image src={image} alt="" className="h-35 w-40" />
        <p className="font-regular text-[16px] text-primary">
          {restaurantName}
        </p>
      </div>
      {/* divider */}
      <div className="w-full mx-10">
        <div className="h-px gap-0 bg-gray-500" />
      </div>

      <p className="font-regular my-5 text-[16px] text-primary">متن دیدگاه:</p>
      <div className="m-5 flex flex-col rounded-sm border border-beige">
        <p className="mt-5 pr-3 text-[12px] font-light text-primary">
          نظر خود را با دیگران به اشتراک بگذارید.
        </p>
        <div className="mt-25 mb-3 w-full">
          <div className="h-px gap-0 bg-beige" />
        </div>

        {/* button */}
        <div className="mb-3 flex justify-end pl-3">
          <Button
            variant="primary"
            size="sm"
            rounded="sm"
            width="Xsmall"
            rightIcon={<ChevronDownIcon size="md" color="text-beige" />}
          >
            <span className="font-regular text-[13px] text-beige">
              ارسال با نام شما
            </span>
          </Button>
        </div>
      </div>

      {/* divider */}
      <div className="mt-70 w-full">
        <div className="h-px gap-0 bg-beige" />
      </div>
      <div className="mb-3 flex">
        <Button variant="primary" size="lg" rounded="sm" width="full">
          <span className="font-regular text-[13px] text-beige">
            ثبت دیدگاه
          </span>
        </Button>
      </div>

      <div className="flex items-center justify-center mb-5">
        <p className="text-[10px] font-light">
          ثبت دیدگاه به معنی موافقت با
          <span className="text-red-500">قوانین انتشار سایت </span>
          است.
        </p>
      </div>
    </div>
  );
}
