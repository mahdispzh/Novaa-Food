"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DashboardUserIcon, PencilIcon } from "../../constants/icons";
import menuItems from "../../constants/texts/sidebar.json";
import { Badge, Text } from "../../ui";
import { StyledButton } from "../../ui/styled-button/styled-button.ui";
import { User } from "../profile-modal/profile-modal.types";
import { profileApi } from "../profile-modal/profile.api";
import { SidebarModalUI } from "./sidebar-modal";
import { sidebarIcons } from "./sidebar.constants";
import { useSidebar } from "./useSidebar";
import { useSidebarCounts } from "./Usesidebarcounts";

interface SidebarProps {
  onLogoutClick?: () => void;
}

// آیتم‌هایی که باید count نمایش داده شود
const ITEMS_WITH_COUNT = ["order", "like", "comment", "location"];

export function Sidebar({ onLogoutClick }: SidebarProps) {
  const { selected, handleSelect } = useSidebar();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const counts = useSidebarCounts();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // نگاشت آیکون هر آیتم به عدد واقعی (به‌جای count ثابتی که از JSON میومد)
  const countsByIcon: Record<string, number> = {
    order: counts.order,
    like: counts.like,
    comment: counts.comment,
    location: counts.location,
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await profileApi.getCurrentUser();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleItemClick = (item: any, event?: React.MouseEvent) => {
    if (item.icon === "exit") {
      event?.preventDefault();
      onLogoutClick?.();
    } else {
      handleSelect(item.icon);
    }
  };

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  const handleConfirmEdit = (data: { name: string; phone: string }) => {
    // اینجا می‌توانید اطلاعات را به API ارسال کنید
    console.log("اطلاعات جدید:", data);
    // به‌روزرسانی state user
    setUser((prev) =>
      prev ? { ...prev, name: data.name, phone: data.phone } : null,
    );
    // بستن مودال
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="menu-item-padding menu-item-border gap-layout sticky top-[140px] flex flex-col">
        {/* Header Section */}
        <div className="flex flex-row items-center justify-between gap-2">
          <div className="flex gap-2">
            <DashboardUserIcon color="text-gray" size="2xl" />
            <div className="flex flex-col">
              <Text
                text={user?.name || "کاربر"}
                size="lg"
                weight="medium"
                color="primary"
              />
              <Text
                text={user?.phone || "شماره ثبت نشده"}
                size="sm"
                weight="medium"
                color="secondary"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <StyledButton
              variant="icon"
              icon={<PencilIcon size="sm" />}
              action={handleEditProfile}
            />
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col">
          {menuItems.map((item, index) => {
            const isActive = selected === item.icon;
            const Icon = sidebarIcons[item.icon as keyof typeof sidebarIcons];

            // عدد واقعی این آیتم (اگه جزو آیتم‌های دارای بج باشه)
            const itemCount = countsByIcon[item.icon] ?? 0;

            // بررسی آیا این آیتم باید count داشته باشد
            const shouldShowCount =
              ITEMS_WITH_COUNT.includes(item.icon) && itemCount > 0;

            // آیتم خروج
            if (item.icon === "exit") {
              return (
                <div
                  key={index}
                  onClick={(e) => handleItemClick(item, e)}
                  className="flex cursor-pointer items-center justify-between border-t border-gray px-6 py-4 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size="md"
                      color={isActive ? "text-danger" : "text-primary"}
                    />
                    <Text
                      size="sm"
                      weight={isActive ? "medium" : "regular"}
                      text={item.title}
                      color={isActive ? "danger" : "primary"}
                    />
                  </div>
                </div>
              );
            }

            // آیتم‌های عادی
            return (
              <Link
                href={"/profile" + item.link}
                key={index}
                onClick={() => handleSelect(item.icon)}
                className="flex cursor-pointer items-center justify-between border-t border-gray px-6 py-4 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size="md"
                    color={isActive ? "text-danger" : "text-primary"}
                  />
                  <Text
                    size="sm"
                    weight={isActive ? "medium" : "regular"}
                    text={item.title}
                    color={isActive ? "danger" : "primary"}
                  />
                </div>

                {/* فقط برای آیتم‌های خاص و در صورت وجود count واقعی */}
                {shouldShowCount && <Badge type="number" number={itemCount} />}
              </Link>
            );
          })}
        </div>
      </div>

      {/* مودال ویرایش اطلاعات */}
      <SidebarModalUI
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmEdit}
        initialName={user?.name || ""}
        initialPhone={user?.phone || ""}
        title="ویرایش اطلاعات کاربری"
        description="لطفا اطلاعات خود را به‌روزرسانی کنید."
      />
    </>
  );
}
