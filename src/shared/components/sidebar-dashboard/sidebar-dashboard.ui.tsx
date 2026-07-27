"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  SIDEBAR_BOTTOM_ACTIONS,
  SidebarDashboard,
} from "./sidebar-dashboard.constants";

import { DropdownArrowIcon } from "../../constants/icons";
import { Badge, Subtitle, Text } from "../../ui";

type Props = {
  pathname?: string;
};

export function Sidebar({ pathname = "" }: Props) {
  const [opened, setOpened] = useState("shop");
  const [selected, setSelected] = useState(pathname);

  return (
    <aside className="flex h-screen w-[20vw] flex-col bg-white">
      {/* Logo */}
      <div className="flex items-center gap-[0.5vw] px-[1.5vw] pt-[1.5vw]">
        <Image
          src="/images/circular-icon.svg"
          alt="logo"
          width={0}
          height={0}
          className="aspect-square w-[1.8vw] lg:w-[2.6vw]"
        />

        <Subtitle
          text="بونامی"
          color="secondary"
          size="2xl"
        />
      </div>

      {/* Menu */}
      <div className="flex-1 px-[1vw] py-[1.5vw]">
        <nav className="space-y-[0.5vw]">
          {SidebarDashboard.map((item) => {
            const Icon = item.icon;

            const isOpened = opened === item.id;
            const isSelected =
              selected === item.href || (!item.href && isOpened);

            return (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (item.items) {
                      setOpened((prev) =>
                        prev === item.id ? "" : item.id
                      );
                    }

                    if (item.href) {
                      setSelected(item.href);
                    }
                  }}
                  className={`
                    group
                    flex
                    h-[3.5vw]
                    w-full
                    cursor-pointer
                    items-center
                    justify-between
                    rounded-[0.4vw]
                    px-[1vw]
                    transition-all
                    duration-200
                    ${
                      isSelected
                        ? "bg-accent/50"
                        : "hover:bg-accent/20"
                    }
                  `}
                >
                  <div className="flex items-center gap-[0.75vw]">
                    {Icon && (
                      <Icon
                        size="md"
                        color={
                          isSelected
                            ? "text-secondary"
                            : "text-primary"
                        }
                      />
                    )}

                    <Text
                      text={item.title}
                      color={
                        isSelected
                          ? "secondary"
                          : "primary"
                      }
                      weight={
                        isSelected
                          ? "medium"
                          : "regular"
                      }
                    />
                  </div>

                  {item.items && (
                    <div
                      className={`
                        transition-transform
                        duration-300
                        ${
                          isOpened
                            ? "rotate-180"
                            : ""
                        }
                      `}
                    >
                      <DropdownArrowIcon
                        size="sm"
                        color={
                          isSelected
                            ? "text-secondary"
                            : "text-primary"
                        }
                      />
                    </div>
                  )}
                </button>

                {/* Submenu */}
                {isOpened && item.items && (
                  <div className="mr-[1.5vw] mt-[0.5vw] space-y-[0.25vw]">
                    {item.items.map((child) => {
                      const active =
                        selected === child.href;

                      return (
                        <Link
                          key={child.id}
                          href={child.href!}
                          onClick={() =>
                            setSelected(child.href!)
                          }
                          className={`
                            flex
                            h-[2.75vw]
                            cursor-pointer
                            items-center
                            justify-between
                            rounded-l-[0.4vw]
                            px-[0.75vw]
                            transition-all
                            duration-200
                            ${
                              active
                                ? "bg-accent/50 border-secondary border-r-[0.15vw]"
                                : "hover:bg-accent/20 "
                            }
                          `}
                        >
                          <Text
                            text={child.title}
                            color={
                              active
                                ? "secondary"
                                : "primary"
                            }
                            weight={
                              active
                                ? "medium"
                                : "regular"
                            }
                          />

                          {/* ✅ تغییر اینجا: نمایش badge بر اساس داده */}
                          {child.badge !== undefined && (
                            <Badge
                              type="counter"
                              number={child.badge}
                            />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="space-y-[0.5vw] border-t-[0.1vw] border-gray-200 px-[1vw] py-[1.25vw]">
        {SIDEBAR_BOTTOM_ACTIONS.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              href={item.href!}
              className="
                flex
                h-[3vw]
                cursor-pointer
                items-center
                gap-[0.75vw]
                rounded-[0.4vw]
                px-[1vw]
                transition-all
                duration-200
                hover:bg-accent/20
              "
            >
              {Icon && (
                <Icon
                  size="md"
                  color="text-primary"
                />
              )}

              <Text
                text={item.title}
                color="primary"
                weight="regular"
              />
            </Link>
          );
        })}
      </div>
    </aside>
  );
}