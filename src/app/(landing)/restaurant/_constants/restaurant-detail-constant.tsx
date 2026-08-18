import { RestaurantDetailProps } from "../_types/restaurant-detail-type";

export const restaurantDetailData: RestaurantDetailProps = {
  title: "سام کافه",
  category: "قهوه, صبحانه, نوشیدنی",
  image: "/restaurant-detail-image.svg",
  rating: "4.8",
  location: "شیراز، نیایش",
  description:
    "«سام کافه؛ ترکیبی از فضای گرم، نوشیدنی‌های باکیفیت و لحظاتی برای یک تجربه متفاوت.»",
  reviewsCount: 230,
  phone: " ۰۹۱۷۱۱۲۷۰۹۸ - ۰۷۱۳۲۴۵۶۰۷۰",
  address: "شیراز، بلوار صنایع، شهرک آرین، پارک علم و فناوری",
  workingHours: "همه روز ۸:۰۰ تا ۲۳:۳۰",
  instagram: "@saamcafe",
  contactDescription:
    "برای رزرو، هماهنگی یا دریافت اطلاعات بیشتر، از طریق راه‌های زیر با ما در ارتباط باشید.",

  tabs: [
    {
      id: "introduction",
      title: "معرفی",
    },
    {
      id: "reviews",
      title: "دیدگاه‌ها",
    },
    {
      id: "gallery",
      title: "گالری تصاویر",
    },
    {
      id: "bloggers",
      title: "بلاگرها",
    },
  ],

  badges: [
    {
      id: 1,
      title: "مناسب جلسات کاری",
    },
    {
      id: 2,
      title: "فضای کار اشتراکی",
    },
    {
      id: 3,
      title: "فضای باز",
    },
  ],
};
