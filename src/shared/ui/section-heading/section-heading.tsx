import clsx from "clsx";

import { SectionHeadingProps } from "./section-heading.types";
import CircleSvg from "@/shared/ui/assets/svg/CircleSvg";

export default function SectionHeading({
  title,
  subtitle,
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        "relative flex flex-col items-center",
        className
      )}
      {...props}
    >
      <div className="flex relative">
        <div className="relative top-0 -right-5">
          <CircleSvg />
        </div>

        <div className="flex flex-col absolute mr-5">
          <h2 className="text-primary text-xl font-bold whitespace-nowrap">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-0 text-gray whitespace-nowrap text-sm">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

