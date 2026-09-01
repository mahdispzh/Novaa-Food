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
    <h1 className="absolute right-1 top-0 text-12 text-primary">
      رویدادهای هفته
    </h1>
    <p className="absolute bottom-3.5 left-[8%] right-15 text-right text-[14px] leading-5 text-white">
      تخفیفات، افتتاحیه‌ها و تجربه‌های جدید و ویژه کافه و رستوران‌ها را از دست نده.
    </p>
    <ICONS.complexDesignIcon
      aria-hidden="true"
      className="absolute bottom-4 right-3 text-white"
      size={"4xl"}
    />
  </div>;
}