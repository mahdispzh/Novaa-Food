"use client";

import { ComposeIcon } from "@/src/shared/constants/icons/compose-icon";
import { Text } from "@/src/shared/ui";
import { Checkbox } from "@/src/shared/ui/check-box/checkbox.ui";
import Image from "next/image";
import Link from "next/link";

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("fa-IR");
};

const getStatusInfo = (status: number) => {
  const statusMap: Record<number, { label: string; color: string }> = {
    0: { label: "پیش‌نویس", color: "bg-gray-200 text-gray-700" },
    1: { label: "منتشر شده", color: "bg-green-100 text-green-700" },
    2: { label: "زمان بندی شده", color: "bg-blue-100 text-blue-700" },
    3: { label: "منتشر نشده", color: "bg-red-100 text-red-700" },
  };
  return (
    statusMap[status] || { label: "نامشخص", color: "bg-gray-100 text-gray-500" }
  );
};

interface BlogsTableProps {
  blogs: any[];
  selectedIds: number[];
  onToggleSelect: (id: number) => void;
  onEdit: (slug: string) => void; // ✅ جدید
}

export function BlogsTable({
  blogs,
  selectedIds,
  onToggleSelect,
  onEdit, // ✅ جدید
}: BlogsTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full divide-y">
        <thead className="border-2 border-white bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-right"></th>
            <th className="px-7 py-2 whitespace-nowrap">
              <Text text="عکس" size="lg" weight="medium" color="secondary" />
            </th>
            <th className="px-4 py-3 whitespace-nowrap">
              <Text text="عنوان" size="lg" weight="medium" color="secondary" />
            </th>
            <th className="px-4 py-3 whitespace-nowrap">
              <Text
                text="آیدی سازنده"
                size="lg"
                weight="medium"
                color="secondary"
              />
            </th>
            <th className="px-4 py-3 whitespace-nowrap">
              <Text text="تاریخ" size="lg" weight="medium" color="secondary" />
            </th>
            <th className="px-4 py-3 whitespace-nowrap">
              <Text text="وضعیت" size="lg" weight="medium" color="secondary" />
            </th>
            <th className="px-4 py-3 whitespace-nowrap"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {blogs.map((blog) => {
            const statusInfo = getStatusInfo(blog.status);
            return (
              <tr key={blog.id} className="transition-colors hover:bg-gray-50">
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedIds.includes(blog.id)}
                    onChange={() => onToggleSelect(blog.id)}
                    variant="primary"
                  />
                </td>
                <td>
                  <Link
                    href={`/dashboard/blogs/${blog.slug}`}
                    className="block px-4 py-3"
                  >
                    <div className="h-[90px] w-[70px] cursor-pointer overflow-hidden rounded-xs bg-gray-100">
                      <Image
                        src={blog.image || "/images/image32.svg"}
                        alt={blog.title}
                        width={70}
                        height={90}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                  </Link>
                </td>
                <td>
                  <Link
                    href={`/dashboard/blogs/${blog.slug}`}
                    className="block cursor-pointer px-4 py-3"
                  >
                    <div className="flex w-[350px] flex-col gap-1">
                      <Text text={blog.title} size="md" weight="medium" />
                      <Text
                        text={blog.summary || ""}
                        size="sm"
                        weight="regular"
                        color="secondary"
                      />
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  <Text text={`${blog.user_id}`} size="md" weight="medium" />
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-600">
                  <Text
                    text={blog.created_at ? formatDate(blog.created_at) : "-"}
                    size="md"
                    weight="medium"
                  />
                </td>
                <td className="px-4 py-3">
                  <div
                    className={`flex h-8 w-24 items-center justify-center rounded-full ${statusInfo.color}`}
                  >
                    <Text text={statusInfo.label} size="md" weight="regular" />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button
                    className="cursor-pointer"
                    onClick={() => onEdit(blog.slug)}
                  >
                    <ComposeIcon size="md" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
