import clsx from "clsx";

import { SectionHeadingProps } from "./section-heading.types";
import CircleSvg from "@/src/shared/ui/assets/svg/CircleSvg";

export default function SectionHeading({
  title,
  subtitle,
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        "relative flex flex-col",
        className
      )}
      {...props}
    >
      <div className="flex relative ">
        <div className="relative top-0">
          <CircleSvg />
        </div>

        <div className="flex flex-col absolute top-1 right-9">
          <h2 className="text-primary text-[16px] font-bold whitespace-nowrap">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-0 text-gray whitespace-nowrap text-[13px]">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

