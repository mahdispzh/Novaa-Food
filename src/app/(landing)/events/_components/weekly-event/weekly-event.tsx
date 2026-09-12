import headingFrame from "@/src/app/(landing)/events/_assets/frames/heading-frame.svg";
import Image from "next/image";
import { ICONS } from "@/src/shared/constants/dynamic-icon";

export function WeeklyEvent() {
  return (
    <div className="relative mx-auto aspect-358/100 w-full max-w-89.5" dir="rtl">
      <Image
        fill
        priority
        alt=""
        aria-hidden="true"
        className="object-contain"
        src={headingFrame}
      />

      {/* matches the SVG's top-right notch: y 0–30, x 228–358 */}
      <div
        className="absolute top-0 right-0 flex items-center justify-end"
        style={{ width: "36.31%", height: "30%" }}
      >
        <h1
          className="text-primary text-right whitespace-nowrap"
          style={{
            fontSize: "clamp(13px, 4.2vw, 16px)",
            lineHeight: 1,
            fontWeight: 700,
            transform: "translateX(6px)",
          }}
        >
          رویدادهای هفته
        </h1>
      </div>

      <p
        className="absolute text-right text-white"
        style={{
          bottom: "14%",
          left: "8%",
          right: "16.76%",
          fontSize: "clamp(11px, 3.91vw, 14px)",
          lineHeight: 1.4,
        }}
      >
        تخفیفات، افتتاحیه‌ها و تجربه‌های جدید و ویژه کافه و رستوران‌ها را از دست نده.
      </p>

      <ICONS.complexDesignIcon
        aria-hidden="true"
        className="absolute text-white"
        style={{ bottom: "16%", right: "3.35%" }}
        size={"4xl"}
      />
    </div>
  );
}