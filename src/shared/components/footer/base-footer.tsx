import Link from "next/link";
import { ICONS } from "@/src/shared/constants/dynamic-icon";

const footerItems = [
  {
    id: "homeIcon",
    label: "خانه",
    Icon: ICONS.homeIcon,
    ActiveIcon: ICONS.home,
    href: "/home",
  },
  {
    id: "searchIcon",
    label: "اکسپلور",
    Icon: ICONS.searchIcon,
    ActiveIcon: ICONS.explore,
    href: "/explore",
  },
  {
    id: "mapIcon",
    label: "نقشه",
    Icon: ICONS.mapIcon,
    ActiveIcon: ICONS.map,
    href: "/map",
  },
  {
    id: "eventIcon",
    label: "رویداد",
    Icon: ICONS.eventIcon,
    ActiveIcon: ICONS.event,
    href: "/events",
  },
  {
    id: "settingsIcon",
    label: "تنظیمات",
    Icon: ICONS.settingsIcon,
    ActiveIcon: ICONS.settings,
    href: "/settings",
  },
];

const activeItem = "homeIcon";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 w-full rounded-t-xl rounded-b-4xl bg-footer px-3 py-4 shadow-[0_18px_50px_rgba(0,0,0,0.25)]">
      <div className="grid grid-cols-5 gap-2">
        {footerItems.map(({ id, label, Icon, ActiveIcon, href }) => {
          const isActive = id === activeItem;
          return (
            <Link
              key={id}
              aria-label={label}
              className={`flex flex-col items-center gap-3 ${
                id === "homeIcon"
                  ? "relative -mt-6"
                  : "rounded-3xl px-2 py-1 transition"
              } ${isActive ? "text-white" : "text-white/70 hover:text-white"}`}
              href={href}>
              {isActive ? (
                // When active: render only the SVG and nothing else
                (() => {
                  const Render = ActiveIcon || Icon;
                  return <Render color="text-white" size="lg" />;
                })()
              ) : (
                <>
                  <span
                    className={`relative flex h-12 w-12 items-center justify-center rounded-full transition bg-white/10`}>
                    <Icon color="text-white" size="lg" />
                  </span>
                  <span className="text-[10px] font-medium leading-none">{label}</span>
                </>
              )}
            </Link>
          );
        })}
      </div>
    </footer>
  );
}