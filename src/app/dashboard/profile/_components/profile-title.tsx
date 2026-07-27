// src/app/dashboard/profile/components/profile-title.tsx
import { Text } from "@/src/shared/ui";

// ✅ تعریف تایپ مشترک برای آیکون‌ها (مطابق با تایپ آیکون‌های پروژه)
export interface IconProps {
  size?: "lg" | "sm" | "md" | "xs" | "xl" | "2xl";
  color?: string;
}

interface ProfileTitleProps {
  title: string;
  icon: React.ComponentType<IconProps>; // ← استفاده از تایپ دقیق
}

export function ProfileTitle({ title, icon: Icon }: ProfileTitleProps) {
  return (
    <div className="flex items-end gap-2 border-b-2 border-gray py-3">
      <Icon size="lg" color="text-primary" />
      <Text text={title} size="lg" weight="medium" color="primary" />
    </div>
  );
}
