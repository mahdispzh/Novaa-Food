import type { Event } from "../_types/event.types";

const e1 = "/images/bloggers/1.png";
const e2 = "/images/bloggers/2.png";

export const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    slug: "cafe-rood-opening-1",
    title: "افتتاحیه کافه رود",
    description: "جشن افتتاحیه کافه رود در کنار شما!",
    image: e1,
    day: "۰۹",
    month: "شهریور",
    timeRange: "از ساعت ۱۸:۰۰ الی ۲۱:۰۰",
    location: "شعبه اصلی، خیابان ولیعصر شماره ۲۴",
    isSaved: false,
  },
  {
    id: "2",
    slug: "cafe-rood-opening-2",
    title: "افتتاحیه کافه رود",
    description: "جشن افتتاحیه کافه رود در کنار شما!",
    image: e2,
    day: "۰۹",
    month: "شهریور",
    timeRange: "از ساعت ۱۸:۰۰ الی ۲۱:۰۰",
    location: "شعبه اصلی، خیابان ولیعصر شماره ۲۴",
    isSaved: false,
  },
];
