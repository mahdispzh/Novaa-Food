import headingFrame from "@/src/app/(landing)/events/_assets/frames/heading-frame.svg";
import Image from "next/image";
import { ICONS } from "@/src/shared/constants/dynamic-icon";

export function WeeklyEvent(){
  return <div className="relative mx-auto aspect-358/100 w-full max-w-89.5" dir="rtl">
        <Image
          fill
          priority
          alt=""
          aria-hidden="true"
          className="object-contain"
          src={headingFrame}
        />
        <h1 className="absolute right-3 top-1 text-16 text-[#8e977d]">
          رویدادهای هفته
        </h1>
        <p className="absolute bottom-8 left-[8%] right-15 text-right text-[13px] leading-7 text-white">
          تخفیفات، افتتاحیه‌ها و تجربه‌های جدید و ویژه کافه و رستوران‌ها را از دست نده.
        </p>
        <ICONS.complexDesignIcon
          aria-hidden="true"
          className="absolute bottom-5 right-3 text-white"
          size={"4xl"}
        />
    </div>;
}