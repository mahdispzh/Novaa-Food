// _components/all-transactions-table.tsx
"use client";

import { SearchIcon } from "@/src/shared/constants/icons";
import { Caption, StatusBadge, Text } from "@/src/shared/ui";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { usePaymentsList } from "../_hooks/usePayments";
import { PaymentRow, PaymentsFilters } from "../_services/payments.api";
import {
  TransactionsFilterModal,
  type TransactionsFilters,
} from "./transactions-filter-modal.ui";

const PAGE_SIZE = 10;
const LOAD_MORE_THRESHOLD_PX = 80;
const SEARCH_DEBOUNCE_MS = 400;

const STATUS_MAP: Record<
  number,
  { label: string; color: "success" | "danger" | "warning" | "gray" }
> = {
  0: { label: "در انتظار", color: "warning" },
  1: { label: "پرداخت موفق", color: "success" },
  2: { label: "پرداخت ناموفق", color: "danger" },
  3: { label: "نامشخص", color: "gray" },
};

function FilterIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6h16M7 12h10M10 18h4" />
    </svg>
  );
}

function PaymentStatusBadge({ status }: { status: number }) {
  const s = STATUS_MAP[status] ?? { label: "نامشخص", color: "gray" as const };
  return <StatusBadge text={s.label} color={s.color} />;
}

const TABLE_COLUMNS_CLASS = "grid grid-cols-[1fr_1fr_1.4fr_1fr_1fr]";

// این مقادیر باید با enum وضعیت پرداخت در بک‌اند هماهنگ بمونه:
// 0 = در انتظار، 1 = موفق، 2 = ناموفق، 3 = نامشخص
const STATUS_VALUE_MAP: Record<
  Exclude<TransactionsFilters["status"], "all">,
  number
> = {
  success: 1,
  failed: 2,
  pending: 0,
  unknown: 3,
};

export function AllTransactionsTable() {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [allRows, setAllRows] = useState<PaymentRow[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [apiFilters, setApiFilters] = useState<PaymentsFilters>({
    limit: PAGE_SIZE,
  });

  const isLoadingMoreRef = useRef(false);
  const prevRequestKeyRef = useRef("");
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data, isLoading, isFetching, isPlaceholderData } = usePaymentsList({
    ...apiFilters,
    page,
  });

  // کلید یکتا برای این درخواست خاص (فیلترها + صفحه)، نه فقط شماره صفحه.
  // چون با اعمال فیلتر جدید صفحه دوباره می‌شه ۱، و اگه فقط بر اساس شماره صفحه
  // تشخیص بدیم، دیتای placeholder (نتیجه‌ی فیلتر قبلی که هم صفحه‌ش ۱ بود)
  // اشتباهی به‌جای دیتای واقعی پردازش می‌شه و آپدیت واقعی رد می‌شه.
  const requestKey = `${JSON.stringify(apiFilters)}::${page}`;

  // ردیف‌های جدید رو به لیست اضافه کن — فقط وقتی دیتا واقعاً برای همین
  // درخواست هست (نه placeholderData باقی‌مونده از فیلتر قبلی)
  if (
    data?.data &&
    !isPlaceholderData &&
    requestKey !== prevRequestKeyRef.current
  ) {
    prevRequestKeyRef.current = requestKey;
    if (page === 1) {
      setAllRows(data.data);
    } else {
      setAllRows((prev) => [...prev, ...data.data]);
    }
    isLoadingMoreRef.current = false;
  }

  const hasMore = data ? data.meta.page * PAGE_SIZE < data.meta.total : false;

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      if (isLoadingMoreRef.current || !hasMore || isFetching) return;
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
      if (scrollHeight - scrollTop - clientHeight > LOAD_MORE_THRESHOLD_PX)
        return;
      isLoadingMoreRef.current = true;
      setPage((prev) => prev + 1);
    },
    [hasMore, isFetching],
  );

  const resetAndFetch = (newFilters: PaymentsFilters) => {
    setAllRows([]);
    setPage(1);
    setApiFilters(newFilters);
  };

  const handleRowClick = (row: PaymentRow) => {
    router.push(`/dashboard/payments/${row.id}`);
  };

  const handleApplyFilters = (nextFilters: TransactionsFilters) => {
    const newApiFilters: PaymentsFilters = { limit: PAGE_SIZE };

    // سرچ فعلی رو حفظ کن، فیلترها جایگزین بقیه‌ی state میشن نه خود سرچ
    if (apiFilters.search) newApiFilters.search = apiFilters.search;

    if (nextFilters.statusEnabled && nextFilters.status !== "all") {
      const mapped = STATUS_VALUE_MAP[nextFilters.status];
      if (mapped != null) newApiFilters.status = mapped;
    }

    if (nextFilters.dateEnabled) {
      if (nextFilters.fromDate) newApiFilters.fromDate = nextFilters.fromDate;
      if (nextFilters.toDate) newApiFilters.toDate = nextFilters.toDate;
    }

    if (nextFilters.amountEnabled) {
      if (nextFilters.amountFrom.trim()) {
        const num = Number(nextFilters.amountFrom.replace(/,/g, ""));
        if (!isNaN(num)) newApiFilters.minAmount = num;
      }
      if (nextFilters.amountTo.trim()) {
        const num = Number(nextFilters.amountTo.replace(/,/g, ""));
        if (!isNaN(num)) newApiFilters.maxAmount = num;
      }
    }

    resetAndFetch(newApiFilters);
  };

  const handleSearch = (value: string) => {
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      const trimmed = value.trim();
      const newFilters: PaymentsFilters = { ...apiFilters, limit: PAGE_SIZE };
      if (trimmed) {
        newFilters.search = trimmed;
      } else {
        delete newFilters.search;
      }
      resetAndFetch(newFilters);
    }, SEARCH_DEBOUNCE_MS);
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between gap-2 pb-4">
        <div className="relative max-w-md flex-1">
          <input
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
            className="text-regular h-10 w-full rounded-full border border-secondary/50 bg-white px-4 pr-10 text-sm shadow-sm outline-none placeholder:text-secondary"
          />
          <span className="absolute top-1/2 right-3 -translate-y-1/2">
            <SearchIcon size="md" />
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsFilterOpen(true)}
          className="flex cursor-pointer flex-row items-center gap-2 rounded-sm border border-gray px-4 py-2 text-primary"
        >
          <FilterIcon className="h-4 w-4" />
          <Text text="فیلتر" size="sm" color="primary" weight="regular" />
        </button>
      </div>

      <div className="flex h-auto w-full flex-col rounded-sm bg-pure-white shadow-xl">
        <div
          className={`${TABLE_COLUMNS_CLASS} rounded-t-sm bg-accent px-6 py-3`}
        >
          <Text text="شناسه پرداخت" size="md" color="secondary" weight="bold" />
          <Text text="مبلغ (ریال)" size="md" color="secondary" weight="bold" />
          <Text text="توضیحات" size="md" color="secondary" weight="bold" />
          <Text text="تاریخ و ساعت" size="md" color="secondary" weight="bold" />
          <Text text="وضعیت" size="md" color="secondary" weight="bold" />
        </div>

        <div
          onScroll={handleScroll}
          className="flex max-h-105 flex-col overflow-y-auto"
        >
          {isLoading && allRows.length === 0 && (
            <div className="flex items-center justify-center py-8">
              <Caption
                text="در حال بارگذاری..."
                size="xs"
                color="secondary"
                weight="regular"
              />
            </div>
          )}

          {!isLoading && allRows.length === 0 && (
            <div className="flex items-center justify-center py-8">
              <Caption
                text="تراکنشی یافت نشد"
                size="xs"
                color="secondary"
                weight="regular"
              />
            </div>
          )}

          {allRows.map((row, index) => {
            const date = new Date(row.created_at).toLocaleDateString("fa-IR");
            const time = new Date(row.created_at).toLocaleTimeString("fa-IR");
            return (
              <div
                key={row.id}
                onClick={() => handleRowClick(row)}
                className={`${TABLE_COLUMNS_CLASS} cursor-pointer items-center px-6 py-5 transition-colors hover:bg-modal-item ${
                  index !== allRows.length - 1 ? "border-b border-accent" : ""
                }`}
              >
                <Text
                  text={String(row.id)}
                  size="md"
                  color="primary"
                  weight="regular"
                />
                <Text
                  text={row.amount.toLocaleString("fa-IR")}
                  size="md"
                  color="primary"
                  weight="regular"
                />
                <div className="flex flex-col items-start gap-1">
                  <Text
                    text="خرید"
                    size="sm"
                    color="primary"
                    weight="regular"
                  />
                  <Caption
                    text={`به شماره سفارش: ${row.order_id}`}
                    size="xs"
                    color="secondary"
                    weight="regular"
                  />
                </div>
                <div className="flex flex-col items-start gap-1">
                  <Text
                    text={date}
                    size="sm"
                    color="primary"
                    weight="regular"
                  />
                  <Caption
                    text={time}
                    size="xs"
                    color="secondary"
                    weight="regular"
                  />
                </div>
                <PaymentStatusBadge status={row.status} />
              </div>
            );
          })}

          {isFetching && allRows.length > 0 && (
            <div className="flex items-center justify-center py-4">
              <Caption
                text="در حال بارگذاری..."
                size="xs"
                color="secondary"
                weight="regular"
              />
            </div>
          )}

          {!hasMore && allRows.length > 0 && (
            <div className="flex items-center justify-center py-4">
              <Caption
                text="همه تراکنش‌ها نمایش داده شد"
                size="xs"
                color="secondary"
                weight="regular"
              />
            </div>
          )}
        </div>
      </div>

      <TransactionsFilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilters}
      />
    </>
  );
}
