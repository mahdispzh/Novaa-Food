"use client";

import type { ComponentType, CSSProperties } from "react";
import Link from "next/link";

import type { IconProps } from "@/src/shared/types/IconTypes";
import { cn } from "@/src/shared/utils/cn";

export interface FooterNavItem {
  href: string;
  label: string;
  style: CSSProperties;
  center: string;
  activeIcon: ComponentType<Partial<IconProps>>;
}

export interface BaseFooterProps {
  icon: ComponentType<IconProps>;
  className?: string;
  spacerClassName?: string;
  iconClassName?: string;
  label?: string;
  iconProps?: Partial<IconProps>;
  navItems?: FooterNavItem[];
  activeCenter?: string;
  ActiveIcon?: ComponentType<Partial<IconProps>>;
  size?: IconProps["size"];
  color?: string;
  onNavItemPress?: (href: string) => void;
}

export default function BaseFooter({
  icon: Icon,
  className,
  spacerClassName,
  iconClassName,
  label = "Bottom footer",
  iconProps,
  navItems = [],
  activeCenter,
  ActiveIcon,
  size,
  color,
  onNavItemPress,
}: BaseFooterProps) {
  return (
    <>
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none h-[5.25rem] w-full sm:h-[6rem] md:h-[6.5rem]",
          spacerClassName,
        )}
      />
      <footer
        aria-label={label}
        className={cn(
          "fixed inset-x-0 right-0 bottom-0 left-0 z-[60] mx-0 w-full max-w-none bg-transparent px-0 py-0",
          className,
        )}
      >
        <div className="w-full pb-[env(safe-area-inset-bottom)]">
          <div className="relative flex w-full items-center justify-center overflow-hidden">
            <div className={cn("flex w-full items-center justify-center", iconClassName)}>
              <Icon {...iconProps} />
            </div>

            {activeCenter && (
              <div
                aria-hidden="true"
                className="absolute flex aspect-square items-center justify-center rounded-full bg-[#8E977D] transition-[left] duration-500 ease-out"
                style={{
                  left: activeCenter,
                  top: "30.5%",
                  width: "17.6%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {ActiveIcon && <ActiveIcon size={size} color={color} />}
              </div>
            )}

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                className="absolute top-0 z-10 h-full outline-none"
                style={item.style}
                onClick={() => onNavItemPress?.(item.href)}
              >
                {}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}