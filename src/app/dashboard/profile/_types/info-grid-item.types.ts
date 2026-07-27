import { ReactNode } from "react";

export interface InfoGridItemProps {
  label: string;
  value: string;
  status: "approved" | "pending" | "rejected";

  borderClassName?: string;

  onEdit: () => void;

  icon?: ReactNode;
}
