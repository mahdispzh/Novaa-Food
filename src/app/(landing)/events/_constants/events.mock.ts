import type { Event } from "../_types/event.types";

// TODO: swap these for real event photos once they're available — reusing
// existing images here just so the cards render with something valid.
const EVENT_IMAGE_1 = "/images/bloggers/1.png";
const EVENT_IMAGE_2 = "/images/bloggers/2.png";

export const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    slug: "cafe-rood-opening-1",
    title: "افتتاحیه کافه رود",
    description: "جشن افتتاحیه کافه رود در کنار شما!",
    image: EVENT_IMAGE_1,
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
    image: EVENT_IMAGE_2,
    day: "۰۹",
    month: "شهریور",
    timeRange: "از ساعت ۱۸:۰۰ الی ۲۱:۰۰",
    location: "شعبه اصلی، خیابان ولیعصر شماره ۲۴",
    isSaved: false,
  },
];
