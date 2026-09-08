"use client";

import {
  AccountActions,
  CommentsCard,
  ProfileHeader,
  ProfileStats,
} from "@/src/app/user/home/_components/index";
import Main from "@/src/shared/ui/main/main";

const profileStats = [
  { label: "مکان ذخیره‌شده", value: "۴۵" },
  { label: "رویداد ذخیره‌شده", value: "۳۲" },
  { label: "دنبال‌کننده", value: "۹۶" },
];

export default function Page() {
  return (
    <Main className="min-h-screen bg-[#f7f6f4] px-4 py-4 text-[#3d332f]">
      <div dir="rtl">
        <section className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-104 flex-col bg-[#fcfbfa] shadow-sm">
          <ProfileHeader name="علی محمدی" username="@ali محمدی" />
          <div className="px-4 pt-1">
            <ProfileStats stats={profileStats} />
            <CommentsCard />
          </div>
          <AccountActions />
        </section>
      </div>
    </Main>
  );
}