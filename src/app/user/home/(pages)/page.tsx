"use client";

import {
  AccountActions,
  CommentsCard,
  ProfileHeader,
} from "@/src/app/user/home/_components/index";
import Main from "@/src/shared/ui/main/main";

// TODO: replace with real user data (session/auth context or API call)
const user = {
  name: "نام کاربر",
  username: "user_username",
  id: "09123456789",
  imageSrc: "/images/users/U1.png",
};

const profileStats = [
  { label: "مکان ذخیره‌شده", value: "۴۵" },
  { label: "رویداد ذخیره‌شده", value: "۳۲" },
  { label: "دنبال‌کننده", value: "۹۶" },
];

export default function Page() {
  return (
    <Main hideFooter className="h-screen overflow-hidden bg-light-beige px-4 py-4 pb-4 text-secondary">
      <section className="mx-auto flex max-w-104 flex-col gap-8 bg-light-beige">
        <ProfileHeader
          name={user.name}
          id={user.id}
          imageSrc={user.imageSrc}
          stats={profileStats}
        />
        <div className="px-4 pt-1">
          <CommentsCard />
        </div>
        <AccountActions />
      </section>
    </Main>
  );
}