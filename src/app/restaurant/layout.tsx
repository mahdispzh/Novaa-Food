"use client";
import { UserGuard } from "@/src/shared/providers/user-provider";

// TODO: this used to wrap children in NavbarLanding / ProfileContainer /
// ProfileSidebar / ProfileMain + a logout modal, but none of those
// components exist in this project yet. Stripped down to unblock the
// build — bring back a real nav/sidebar shell here once it's built.
export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserGuard>{children}</UserGuard>;
}
