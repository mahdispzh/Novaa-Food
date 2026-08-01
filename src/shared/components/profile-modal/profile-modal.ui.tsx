// profile-modal.ui.tsx
"use client";

import { Caption, Text } from "@/src/shared/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ADMIN_MENU_ITEMS,
  LOGOUT_ITEM,
  MENU_ITEMS,
  MODAL_STYLES,
} from "./profile-modal.constants";
import { ProfileModalProps } from "./profile-modal.types";
import { useAdminStats } from "./use-admin-stats";
import { useProfileModal } from "./use-profile-modal";

export const ProfileModal = ({
  isOpen,
  onClose,
  anchorRef,
  userName: propsUserName = "",
  onLogout,
  userRole,
}: ProfileModalProps) => {
  const router = useRouter();
  const { position, modalRef, user, loading } = useProfileModal({
    isOpen,
    onClose,
    anchorRef,
  });

  const role = userRole ?? user?.role ?? 0;
  const isAdmin = role === 2;
  const menuItems = isAdmin ? ADMIN_MENU_ITEMS : MENU_ITEMS;
  const profileHref = isAdmin ? "/dashboard/home" : "/profile/home";

  const { stats: adminStats, loading: statsLoading } = useAdminStats(
    isAdmin && isOpen,
  );

  const handleLogoutClick = () => {
    onClose();
    if (onLogout) {
      onLogout();
    }
  };

  if (!isOpen) return null;

  const displayName = propsUserName || user?.name || "کاربر";

  return (
    <div className={MODAL_STYLES.container}>
      <div
        ref={modalRef}
        className={MODAL_STYLES.modal}
        style={{
          top: position.top,
          left: position.left,
        }}
      >
        {/* ================= HEADER ================= */}
        <div className={MODAL_STYLES.header}>
          <Link
            href={profileHref}
            onClick={onClose}
            className="flex items-start justify-between px-4 transition-colors hover:bg-gray-50"
          >
            <div className="flex flex-col gap-0.5">
              <Text
                text={loading ? "..." : displayName}
                size="lg"
                weight="medium"
                color="primary"
              />

              <Text
                text={loading ? "..." : (user?.phone ?? "")}
                size="sm"
                weight="medium"
                color="secondary"
              />
            </div>
            <div className="pt-2">
            </div>
          </Link>

          <div className={MODAL_STYLES.divider} />
        </div>

        {/* ================= ADMIN STATS (بلافاصله بعد از هدر) ================= */}
        {isAdmin && (
          <div className="grid grid-cols-3 gap-2 px-4 py-3">
            {(adminStats ?? []).map((stat) => {

              return (
                <div
                  key={stat.id}
                  className="border-border flex flex-col items-center justify-center rounded-sm border border-accent p-1"
                >
                  <Caption text={stat.label} size="xs" color="secondary" />
                  <div className="flex items-center justify-center gap-0.5">
                    {statsLoading ? (
                      <Caption text="..." size="xs" color="secondary" />
                    ) : (
                      <Text
                        text={String(stat.value)}
                        size="md"
                        weight="medium"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ================= MENU ================= */}
        <div>
          {menuItems.map((item, index) => {

            return (
              <div key={item.id}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={MODAL_STYLES.menuItem}
                >
                  <div className={MODAL_STYLES.iconWrapper}>
                  </div>
                  <Text
                    text={item.label}
                    size="md"
                    weight="regular"
                    color="primary"
                  />
                </Link>

                {index < menuItems.length - 1 && (
                  <div className={MODAL_STYLES.itemDivider}>
                    <div className={MODAL_STYLES.itemDividerLine} />
                  </div>
                )}
              </div>
            );
          })}
          <div className={MODAL_STYLES.itemDivider}>
            <div className={MODAL_STYLES.itemDividerLine} />
          </div>
          {/* ================= LOGOUT ================= */}
          <div
            onClick={handleLogoutClick}
            className={`${MODAL_STYLES.menuItem} ${MODAL_STYLES.menuItemDanger}`}
          >
            <div className={MODAL_STYLES.iconWrapper}>
            </div>
            <Text
              text={LOGOUT_ITEM.label}
              size="md"
              weight="regular"
              color="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
