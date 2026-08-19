"use client";
import { ICONS } from "@/src/shared/constants/dynamic-icon";
import { Button } from "@/src/shared/ui";
import Image from "next/image";
import { ReviewFormProps } from "./review-form-type";


const { arrowRightIcon: ArrowRightIcon, chevronDownIcon: ChevronDownIcon } = ICONS;

export default function ReviewForm({ restaurantName, image,onBack }: ReviewFormProps) {

  return (
    <div className="flex flex-col ">
      {/* title and icon */}
      <div className="flex gap-2 p-5 items-center mx-3">
        <ArrowRightIcon size="md" color="text-primary" onClick={onBack} className="cursor-pointer"/>
        <p className="font-regular text-[16px] text-primary">ثبت دیدگاه</p>
      </div>
      {/* divider */}
      <div className="w-full">
        <div className="h-px gap-0 bg-primary" />
      </div>

      {/* image and restaurantName */}
      <div className="mt-7 flex gap-1 mx-3">
        <Image src={image} alt="" className="h-35 w-40" />
        <p className="font-regular text-[16px] text-primary">
          {restaurantName}
        </p>
      </div>

      {/* divider */}
      <div className="w-full mt-7">
        <div className="mx-[25px] h-px bg-beige" />
      </div>

      <p className="font-regular my-5 text-[16px] text-primary mx-6">متن دیدگاه:</p>
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
            rightIcon={<ChevronDownIcon size="sm" color="text-beige" />}
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
      {/* button */}
      <div className="mb-3 flex mx-3">
        <Button variant="primary" size="lg" rounded="sm" width="full">
          <span className="font-regular text-[13px] text-beige">
            ثبت دیدگاه
          </span>
        </Button>
      </div>

      <div className="mb-5 flex items-center justify-center">
        <p className="text-[10px] font-light">
          ثبت دیدگاه به معنی موافقت با
          <span className="text-red-500">قوانین انتشار سایت </span>
          است.
        </p>
      </div>
    </div>
  );
}
