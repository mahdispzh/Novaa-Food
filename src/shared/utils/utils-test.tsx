"use client";

import { calculateRating } from "@/src/shared/utils/calculate-rating";
import { toEnglishDigits, toPersianDigits } from "@/src/shared/utils/digits";
import { filterProducts } from "@/src/shared/utils/filter-products";
import { formatDateTime } from "@/src/shared/utils/format-date-time";
import { formatFileSize } from "@/src/shared/utils/format-file-size";
import { formatNumber } from "@/src/shared/utils/format-number";
import { formatPrice } from "@/src/shared/utils/format-price";
import { formatShamsiDate } from "@/src/shared/utils/format-shamsi-date";
import { generateId } from "@/src/shared/utils/generate-id";
import { formatPercentage } from "@/src/shared/utils/percentage";
import { slugify } from "@/src/shared/utils/slugify";
import { sortProducts } from "@/src/shared/utils/sort-products";
// import { timeAgo } from "@/src/shared/utils/time-ago";
import { truncate } from "@/src/shared/utils/truncate";

const products = [
  {
    id: 1,
    title: "iPhone 15 Pro",
    price: 120000000,
    rating: 4.8,
    sales: 250,
    createdAt: "2026-05-01",
  },
  {
    id: 2,
    title: "Samsung S24 Ultra",
    price: 95000000,
    rating: 4.6,
    sales: 180,
    createdAt: "2026-04-15",
  },
];

export default function UtilsTestPage() {
  return (
    <div className="space-y-10 p-10 text-sm">
      {/* Digits */}
      <section className="space-y-2">
        <h2 className="text-xl font-bold">Digits</h2>

        <div>Persian Digits: {toPersianDigits(123456)}</div>

        <div>English Digits: {toEnglishDigits("۱۲۳۴۵۶")}</div>
      </section>

      {/* Numbers */}
      <section className="space-y-2">
        <h2 className="text-xl font-bold">Numbers</h2>

        <div>{formatNumber(2500000)}</div>

        <div>{formatPrice(8900000)}</div>

        <div>{formatPercentage(25)}</div>
      </section>

      {/* Text */}
      <section className="space-y-2">
        <h2 className="text-xl font-bold">Text</h2>

        <div>
          {truncate(
            "این یک متن تستی بسیار طولانی برای بررسی تابع truncate میباشد",
            25,
          )}
        </div>

        <div>{slugify("گوشی موبایل سامسونگ S24 Ultra")}</div>
      </section>

      {/* Date */}
      <section className="space-y-2">
        <h2 className="text-xl font-bold">Date</h2>

        <div>{formatShamsiDate(new Date())}</div>

        <div>{formatDateTime(new Date())}</div>

        {/* <div>{timeAgo(new Date(Date.now() - 1000 * 60 * 60 * 5))}</div> */}
      </section>

      {/* Files */}
      <section className="space-y-2">
        <h2 className="text-xl font-bold">Files</h2>

        <div>{formatFileSize(1024 * 1024 * 5)}</div>
      </section>

      {/* Rating */}
      <section className="space-y-2">
        <h2 className="text-xl font-bold">Rating</h2>

        <div>{calculateRating(4.8, 125)}</div>
      </section>

      {/* Generate ID */}
      <section className="space-y-2">
        <h2 className="text-xl font-bold">Generate ID</h2>

        <div>{generateId()}</div>
      </section>

      {/* Sort */}
      <section className="space-y-2">
        <h2 className="text-xl font-bold">Sort Products</h2>

        <pre className="overflow-auto rounded-xl bg-gray-100 p-4">
          {JSON.stringify(sortProducts(products, "price-high"), null, 2)}
        </pre>
      </section>

      {/* Filter */}
      <section className="space-y-2">
        <h2 className="text-xl font-bold">Filter Products</h2>

        <pre className="overflow-auto rounded-xl bg-gray-100 p-4">
          {JSON.stringify(filterProducts(products, "iphone"), null, 2)}
        </pre>
      </section>
    </div>
  );
}
