"use client";
import { PublicAuthGuard } from "@/src/shared/components/auth/auth-guard";

export default function SendOtpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicAuthGuard>{children}</PublicAuthGuard>;
}
