// _constants/factors.constants.ts

import { Factor, OrderStatus, ProductDetail, SalesStatus } from "../_types/factors.types";


// ===== استپ‌های وضعیت =====
export const STATUS_STEPS = [2, 3, 4, 5, 6];

// ===== توضیحات وضعیت‌ها =====
export const STATUS_DESCRIPTIONS = [
  "سفارش مشتری ثبت شده و در انتظار تایید اولیه است",
  "سفارش تایید شده و در حال آماده‌سازی برای ارسال است",
  "سفارش بسته‌بندی و تحویل پست شده است",
  "سفارش در مسیر ارسال به مقصد است",
  "سفارش به شهر مقصد رسیده و در حال توزیع است",
  "سفارش با موفقیت تحویل مشتری شده است",
];

// ===== دیتای فیک فاکتورها =====
export const FAKE_FACTORS: Factor[] = [
  {
    id: 1,
    factor_number: 18,
    image: "/images/image32.svg",
    title: "اورال زنانه",
    description: "لباس لباس لباس",
    amount: 2380000,
    discounted_amount: 2380000,
    status: 0,
    created_at: "2026-10-27",
  },
  {
    id: 2,
    factor_number: 80,
    image: "/images/image32.svg",
    title: "اورال زنانه",
    description: "لباس لباس لباس",
    amount: 2380000,
    discounted_amount: 2380000,
    status: 1,
    created_at: "2026-10-27",
  },
  {
    id: 3,
    factor_number: 13,
    image: "/images/image32.svg",
    title: "اورال زنانه",
    description: "لباس لباس لباس",
    amount: 2380000,
    discounted_amount: 2380000,
    status: 2,
    created_at: "2026-10-27",
  },
  {
    id: 4,
    factor_number: 83,
    image: "/images/image32.svg",
    title: "اورال زنانه",
    description: "لباس لباس لباس",
    amount: 2380000,
    discounted_amount: 2380000,
    status: 1,
    created_at: "2026-10-27",
  },
  {
    id: 5,
    factor_number: 1803,
    image: "/images/image32.svg",
    title: "اورال زنانه",
    description: "لباس لباس لباس",
    amount: 2380000,
    discounted_amount: 2380000,
    status: 1,
    created_at: "2026-10-27",
  },
  {
    id: 6,
    factor_number: 22,
    image: "/images/image32.svg",
    title: "پیراهن مجلسی",
    description: "پیراهن بلند مجلسی زنانه",
    amount: 4200000,
    discounted_amount: 3800000,
    status: 0,
    created_at: "2026-10-26",
  },
  {
    id: 7,
    factor_number: 45,
    image: "/images/image32.svg",
    title: "کت اسپرت",
    description: "کت اسپرت مردانه",
    amount: 3100000,
    discounted_amount: 3100000,
    status: 3,
    created_at: "2026-10-25",
  },
];

// ===== آمار فیک سایدبار =====
export const FAKE_SALES_STATUS: SalesStatus = {
  total_settled_amount: 238000000,
  products_in_progress_amount: 300000000,
};

export const FAKE_ORDER_STATUS: OrderStatus = {
  new_orders: 62,
  in_progress_orders: 367,
  completed_orders: 8359,
};

// ===== محصولات فیک برای جزئیات =====
export const MOCK_PRODUCTS: ProductDetail[] = [
  {
    id: 1,
    image: "/images/p5.png",
    name: "کت چرم",
    price: "۲,۸۹۰,۰۰۰",
    currentPrice: "۲,۵۰۰,۰۰۰",
    quantity: "۱",
    size: "XL",
    color: "#3B2A1A",
    brand: "بنامی گالری",
    features: "چرم طبیعی",
    code: "PRD-4569873",
    description:
      "کت چرم طبیعی با دوخت دستی، مناسب برای فصل پاییز و زمستان. دارای آستر داخلی ابریشمی و دکمه‌های فلزی مستحکم.",
  },
  {
    id: 2,
    image: "/images/p5.png",
    name: "شلوار جین",
    price: "۱,۴۵۰,۰۰۰",
    currentPrice: "۱,۲۰۰,۰۰۰",
    quantity: "۲",
    size: "M",
    color: "#1C3A5F",
    brand: "بنامی گالری",
    features: "دنیم ۱۰۰٪",
    code: "PRD-4569874",
    description:
      "شلوار جین آبی کلاسیک با برش اسلیم فیت، مناسب برای استفاده روزمره. جنس دنیم مرغوب با کیفیت بالا.",
  },
  {
    id: 3,
    image: "/images/p5.png",
    name: "کفش چرم",
    price: "۳,۲۰۰,۰۰۰",
    currentPrice: "۲,۹۰۰,۰۰۰",
    quantity: "۱",
    size: "42",
    color: "#000000",
    brand: "بنامی شوز",
    features: "چرم گاوی",
    code: "PRD-4569875",
    description:
      "کفش رسمی چرم مشکی با زیره لاستیکی مقاوم. مناسب برای محیط کار و مجالس رسمی. دارای گارانتی ۶ ماهه.",
  },
  
];

// ===== محدودیت‌های جدول =====
export const MAX_DESCRIPTION_LENGTH = 28;
export const DEFAULT_PAGE_SIZE = 10;