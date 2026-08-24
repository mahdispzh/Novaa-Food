// lib/mockData.js
// Mock "database" derived from your landing page constants.
// Later, swap this out for real Supabase/Postgres queries — same shape.

export const restaurants = [
  {
    id: "cafe-sam",
    title: "سام کافه",
    category: "قهوه, صبحانه, نوشیدنی",
    rating: 4.8,
    location: "شیراز، نیایش",
    description: "«سام کافه؛ ترکیبی از فضای گرم، نوشیدنی‌های باکیفیت و لحظاتی برای یک تجربه متفاوت.»",
    reviewsCount: 230,
    phone: "۰۹۱۷۱۱۲۷۰۹۸ - ۰۷۱۳۲۴۵۶۰۷۰",
    address: "شیراز، بلوار صنایع، شهرک آرین، پارک علم و فناوری",
    workingHours: "همه روز ۸:۰۰ تا ۲۳:۳۰",
    instagram: "@saamcafe",
    badges: ["مناسب جلسات کاری", "فضای کار اشتراکی", "فضای باز"],
  },
  {
    id: "cafe-radio",
    title: "کافه رادیو",
    category: "کافه",
    rating: 4.6,
    location: "شیراز، معالی آباد 3 کیلومتر",
    reviewsCount: 140,
  },
];

export const categories = [
  { id: "resturant", title: "رستوران‌ها" },
  { id: "fastfood", title: "فست‌فود‌ها" },
  { id: "bakery", title: "بیکری‌ها" },
];

export const reviews = [
  { id: 1, restaurant_id: "cafe-sam", name: "هدیه کوزی", date: "۱ تیر ۱۴۰۵", rating: 5, comment: "بسیار کافه خوبی بود، برخورد پرسنل خیلی محترمانه بود." },
  { id: 2, restaurant_id: "cafe-sam", name: "هدیه کوزی", date: "۱ تیر ۱۴۰۵", rating: 5, comment: "بسیار کافه خوبی بود، برخورد پرسنل خیلی محترمانه بود." },
  { id: 3, restaurant_id: "cafe-sam", name: "هدیه کوزی", date: "۱ تیر ۱۴۰۵", rating: 4, comment: "بسیار کافه خوبی بود، برخورد پرسنل خیلی محترمانه بود." },
];

export const events = [
  {
    id: "nova-cafe-opening",
    title: "افتتاحیه کافه نووا",
    description: "فرصت محدود برای خرید منتخب‌ترین جواهرات با قیمت‌های استثنایی.",
    weekday: "پنجشنبه",
    day: "۲۴",
    month: "شهریور",
    timeRange: "از ساعت ۱۸:۰۰ تا ساعت ۲۰:۳۰",
    location: "شیراز, آرین, پارک علم و فناوری",
  },
];

export const menuItems = [
  { id: 1, restaurant_id: "cafe-sam", title: "چیزکیک لوتوس" },
  { id: 2, restaurant_id: "cafe-sam", title: "چیزکیک لوتوس" },
];
