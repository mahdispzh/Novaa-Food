import {
  DashboardMinusIcon,
  DashboardRefreshIcon,
  ErrorIcon,
  SuccessOutlineIcon,
} from "@/src/shared/constants/icons";

export const statusItems = [
  {
    id: 1,
    icon: <SuccessOutlineIcon color="text-success" size="lg" />,
    count: 2,
    label: "محصول در سایت فعال است",
  },
  {
    id: 2,
    icon: <DashboardRefreshIcon color="text-warning" size="lg" />,
    count: 40,
    label: "محصول در حال بررسی مجدد هستند",
  },
  {
    id: 3,
    icon: <ErrorIcon color="text-danger" size="lg" />,
    count: 5,
    label: "محصول حذف شدند",
  },
  {
    id: 4,
    icon: <DashboardMinusIcon color="text-primary" size="lg" />,
    count: 7,
    label: "محصول در انتظار تایید هستند",
  },
];
