// _components/factor-table.ui.tsx
"use client";

import { Text } from "@/src/shared/ui";
import { Checkbox } from "@/src/shared/ui/check-box/checkbox.ui";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Factor } from "../_types/factors.types";
import { formatDate, formatAmount } from "../_utils/factors.utils";
import { getStatusInfo } from "../_constants/status-icons";

interface FactorsTableProps {
  factors: Factor[];
  selectedIds: number[];
  onToggleSelect: (id: number) => void;
}

export function FactorsTable({
  factors,
  selectedIds,
  onToggleSelect,
}: FactorsTableProps) {
  const router = useRouter();

  const handleRowClick = (id: number) => {
    router.push(`/dashboard/factors/${id}`);
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full divide-y">
        <thead className="border-2 border-white">
          <tr>
            <th className="px-4 py-3 text-right"></th>
            <th className="px-7 py-2 whitespace-nowrap">
              <Text text="عکس" size="lg" weight="medium" color="secondary" />
            </th>
            <th className="px-4 py-3 whitespace-nowrap">
              <Text text="فاکتور" size="lg" weight="medium" color="secondary" />
            </th>
            <th className="px-12 py-3 whitespace-nowrap">
              <Text text="مبلغ" size="lg" weight="medium" color="secondary" />
            </th>
            <th className="px-4 py-3 whitespace-nowrap">
              <Text text="مبلغ بعد از تخفیف" size="lg" weight="medium" color="secondary" />
            </th>
            <th className="px-10 py-3 whitespace-nowrap text-center">
              <Text text="توضیحات" size="lg" weight="medium" color="secondary" />
            </th>
            <th className="px-7 py-3 whitespace-nowrap">
              <Text text="تاریخ" size="lg" weight="medium" color="secondary" />
            </th>
            <th className="px-16 py-3 whitespace-nowrap">
              <Text text="وضعیت" size="lg" weight="medium" color="secondary" />
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 bg-white">
          {factors.map((factor) => {
            const statusInfo = getStatusInfo(factor.status);
            return (
              <tr
                key={factor.id}
                onClick={() => handleRowClick(factor.id)}
                className="cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-pure-white hover:shadow-sm"
              >
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedIds.includes(factor.id)}
                    onChange={() => onToggleSelect(factor.id)}
                    variant="primary"
                  />
                </td>

                <td className="px-4 py-3">
                  <div className="h-[80px] w-[70px] cursor-pointer overflow-hidden rounded-sm bg-gray-100">
                    <Image
                      src={factor.image || "/images/image32.svg"}
                      alt={factor.title}
                      width={70}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </td>

                <td className="px-6 py-3 text-center text-sm text-gray-600">
                  <Text text={`${factor.factor_number}`} size="md" weight="medium" />
                </td>

                <td className="px-4 py-3 whitespace-nowrap text-center">
                  <Text text={formatAmount(factor.amount)} size="md" weight="medium" />
                </td>

                <td className="px-8 py-3 whitespace-nowrap text-center">
                  <Text
                    text={formatAmount(factor.discounted_amount)}
                    size="md"
                    weight="medium"
                    color="primary"
                  />
                </td>

                <td className="py-5 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-1">
                    <Text text={factor.title} size="md" weight="medium" />
                    <Text text={factor.description || "-"} size="sm" weight="regular" color="secondary" />
                  </div>
                </td>

                <td className="px-4 py-3 text-center text-sm whitespace-nowrap text-gray-600">
                  <Text text={factor.created_at ? formatDate(factor.created_at) : "-"} size="md" weight="medium" />
                </td>

                <td className="px-4 py-3">
                  <div className={`flex flex-row items-center justify-center gap-1.5 whitespace-nowrap ${statusInfo.color}`}>
                    {statusInfo.icon}
                    <Text text={statusInfo.label} size="md" weight="regular" />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}