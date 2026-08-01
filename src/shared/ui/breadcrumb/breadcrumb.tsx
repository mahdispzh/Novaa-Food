import Link from "next/link";

import { cn } from "@/src/shared/lib/utils";

import {
  BreadcrumbProps,
} from "./breadcrumb-types";

import {
  breadcrumbVariants,
  breadcrumbItemVariants,
} from "./breadcrumb-variants";

export function Breadcrumb({
  items,
  separator = "/",
}: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb">
      <ol className={cn(breadcrumbVariants())}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={item.label}
              className="flex items-center gap-2"
            >
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    breadcrumbItemVariants({
                      active: false,
                    })
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    breadcrumbItemVariants({
                      active: true,
                    })
                  )}
                >
                  {item.label}
                </span>
              )}

              {!isLast && (
                <span className="text-gray">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}