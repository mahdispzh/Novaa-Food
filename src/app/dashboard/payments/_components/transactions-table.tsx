// _components/transactions-table.tsx
"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { Caption, Subtitle, Text } from "@/src/shared/ui";
import { SimpleButton } from "@/src/shared/ui/simple-button/simple-button.ui";
import { usePaymentsList } from "../_hooks/usePayments";
import { PaymentRow } from "../_services/payments.api";

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

const STATUS_MAP: Record<number, { label: string; color: string; dot: string }> = {
  0: { label: "در انتظار",       color: "bg-yellow-50",  dot: "bg-yellow-400" },
  1: { label: "پرداخت موفق",    color: "bg-success/15", dot: "bg-success"    },
  2: { label: "پرداخت ناموفق",  color: "bg-danger/15",  dot: "bg-danger"     },
  3: { label: "نامشخص",         color: "bg-gray/20",    dot: "bg-gray"       },
};

function StatusBadge({ status }: { status: number }) {
const s = STATUS_MAP[status] ?? { label: "نامشخص", color: "bg-gray/20", dot: "bg-gray" };
  return (
    <span className={`inline-flex flex-row justify-center items-center gap-1.5 rounded-md px-3 py-1 w-fit ${s.color}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      <Text text={s.label} size="sm" weight="regular" />
    </span>
  );
}

const TABLE_COLUMNS_CLASS = "grid grid-cols-[1fr_1fr_1.4fr_1fr_1fr]";

export function TransactionsTable() {
  const router = useRouter();
  const { data, isLoading } = usePaymentsList({ page: 1, limit: 10 });
  const rows = data?.data ?? [];

  const handleNavigateToAll = useCallback(() => {
    router.push("/dashboard/payments/all");
  }, [router]);

  const handleRowClick = useCallback((row: PaymentRow) => {
    router.push(`/dashboard/payments/${row.id}`);
  }, [router]);

  return (
    <div className="flex h-auto w-full flex-col rounded-sm bg-pure-white shadow-xl">
      <div className="flex flex-row items-start justify-between px-6 py-5">
        <div className="text-right">
          <Subtitle text="تراکنش‌ها" size="2xl" color="primary" weight="bold" />
          <div className="pt-1">
            <Text text="تراکنش‌های اخیر شما" size="sm" color="secondary" weight="regular" />
          </div>
        </div>
        <div className="flex items-end">
          <SimpleButton
            label="مشاهده همه تراکنش‌ها"
            icon={<ChevronLeftIcon className="h-4 w-4" />}
            iconPosition="right"
            variant="secondary"
            action={handleNavigateToAll}
          />
        </div>
      </div>

      <div className={`${TABLE_COLUMNS_CLASS} bg-accent px-6 py-3`}>
        <Text text="شناسه پرداخت" size="md" color="secondary" weight="bold" />
        <Text text="مبلغ (ریال)"  size="md" color="secondary" weight="bold" />
        <Text text="توضیحات"      size="md" color="secondary" weight="bold" />
        <Text text="تاریخ و ساعت" size="md" color="secondary" weight="bold" />
        <Text text="وضعیت"        size="md" color="secondary" weight="bold" />
      </div>

      <div className="flex flex-col">
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Caption text="در حال بارگذاری..." size="xs" color="secondary" weight="regular" />
          </div>
        )}

        {!isLoading && rows.length === 0 && (
          <div className="flex items-center justify-center py-8">
            <Caption text="تراکنشی یافت نشد" size="xs" color="secondary" weight="regular" />
          </div>
        )}

        {rows.map((row, index) => {
          const date = new Date(row.created_at).toLocaleDateString("fa-IR");
          const time = new Date(row.created_at).toLocaleTimeString("fa-IR");
          return (
            <div
              key={row.id}
              onClick={() => handleRowClick(row)}
              className={`${TABLE_COLUMNS_CLASS} cursor-pointer items-center px-6 py-5 transition-colors hover:bg-modal-item ${
                index !== rows.length - 1 ? "border-b border-accent" : ""
              }`}
            >
              <Text text={String(row.id)} size="md" color="primary" weight="regular" />
              <Text text={row.amount.toLocaleString("fa-IR")} size="md" color="primary" weight="regular" />
              <div className="flex flex-col items-start gap-1">
                <Text text="خرید" size="sm" color="primary" weight="regular" />
                <Caption text={`به شماره سفارش: ${row.order_id}`} size="xs" color="secondary" weight="regular" />
              </div>
              <div className="flex flex-col items-start gap-1">
                <Text text={date} size="sm" color="primary" weight="regular" />
                <Caption text={time} size="xs" color="secondary" weight="regular" />
              </div>
              <StatusBadge status={row.status} />
            </div>
          );
        })}
      </div>
    </div>
  );
}