// _constants/landing-navbar._constants.ts

import navbarTexts from "../../constants/texts/navbar.json";
import { NavLink } from "./navbar-landing.types";

// Destructure کردن landing از آبجکت اصلی
const { landing } = navbarTexts;

// لینک‌های ناوبری لندینگ
export const navLinks: NavLink[] = [
  {
    key: "home",
    label: landing.home,
    href: "/",
  },
  {
    key: "categories",
    label: landing.category,
    href: "/categories",
  },
  {
    key: "blog",
    label: landing.blog,
    href: "/blogs",
  },
  {
    key: "tutorial",
    label: landing.tutorial,
    href: "/tutorial",
  },
  {
    key: "app",
    label: landing.app,
    href: "/application",
  },
  {
    key: "faq",
    label: landing.faq,
    href: "/faq",
  },
  {
    key: "support",
    label: landing.support,
    href: "/about-us",
  },
];
