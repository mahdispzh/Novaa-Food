"use client";

import { ICONS } from "@/src/shared/constants/dynamic-icon";
import Main from "@/src/shared/ui/main/main";

const stats = [
  { label: "مکان ذخیره‌شده", value: "۴۵" },
  { label: "رویداد ذخیره‌شده", value: "۳۲" },
  { label: "دنبال‌کننده", value: "۹۶" },
];

export default function Page() {
  return (
    <Main className="min-h-screen bg-[#f7f6f4] px-4 py-4 text-[#3d332f]" dir="rtl">
      <section className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-104 flex-col bg-[#fcfbfa] shadow-sm">
        <header className="flex items-center justify-start px-4 py-2">
          <button
            aria-label="بازگشت"
            className="flex h-10 w-10 items-center justify-center"
            type="button"
          >
            <ICONS.arrowRightIcon color="text-[#3d332f]" size="lg" />
          </button>
        </header>

        <div className="px-4 pt-1">
          <div className="flex items-center gap-3">
            <div className="flex flex-1 flex-col gap-2">
              <h1 className="text-lg font-bold">علی محمدی</h1>
              <p className="text-xs text-[#9a928d]">@ali محمدی</p>
            </div>

            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-[#75a8a5]">
              <div className="absolute inset-x-5 bottom-0 h-12 rounded-t-[50%] bg-white/90" />
              <div className="absolute left-1/2 top-3 h-10 w-9 -translate-x-1/2 rounded-full bg-[#9e694f]" />
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 border-b border-[#ebe7e3] pb-4 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <strong className="text-sm font-bold">{stat.value}</strong>
                <span className="text-[10px] text-[#817873]">{stat.label}</span>
              </div>
            ))}
          </div>

          <button
            className="mt-4 flex min-h-16 w-full flex-col items-start justify-center gap-1 rounded-md border border-[#d8d0c2] bg-[#f5f0e7] px-4 text-right"
            type="button"
          >
            <span className="flex w-full items-center justify-between text-sm font-medium">
              دیدگاه‌های من
              <ICONS.messageIcon color="text-[#3d332f]" size="md" />
            </span>
            <span className="text-[10px] text-[#817873]">
              اینجا می‌توانید دیدگاه‌های ثبت‌شده خود را مشاهده و مدیریت کنید.
            </span>
          </button>
        </div>

        <div className="mt-auto border-t border-[#e5e0dc] px-4 py-4">
          <button className="flex w-full items-center gap-2 py-2 text-sm" type="button">
            <ICONS.arrowRightIcon color="text-[#3d332f]" size="md" />
            خروج از حساب کاربری
          </button>
          <button className="flex w-full items-center gap-2 py-2 text-sm" type="button">
            <span className="text-base">♧</span>
            پاک کردن حساب کاربری
          </button>
        </div>
      </section>
    </Main>
  );
}