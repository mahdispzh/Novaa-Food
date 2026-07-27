// page.tsx
"use client";

import { DashboardContainer } from "@/src/shared/components/dashboard-container";
import { DashboardMain } from "@/src/shared/components/dashboard-main";
import { DashboardSidebar } from "@/src/shared/components/dashboard-sidebar";
import { SearchIcon } from "@/src/shared/constants/icons";
import { DualSquareEmpty } from "@/src/shared/constants/icons/dual-square-empty";
import { DualSquareOutline } from "@/src/shared/constants/icons/dual-square-outline";
import { ExportIcon } from "@/src/shared/constants/icons/export-icon";
import { useState } from "react";
import { useDashboardFactors } from "../_hooks/useDashboardFactors";
import { DashboardSidebarStats } from "../_components/dashboard-sidebar-stats.ui";
import { FactorsTable } from "../_components/factor-table.ui";
import { exportSelectedFactors } from "../_utils/exportExcel";
import { useDebounce } from "@/src/shared/hooks/useDebounce";

export default function DashboardFactors() {
 const [selectedIds, setSelectedIds] = useState<number[]>([]);
const [search, setSearch] = useState("");
const [page, setPage] = useState(1);

const debouncedSearch = useDebounce(search, 500);

const { data, isLoading, error } = useDashboardFactors(
  page,
  1000,
  debouncedSearch
);

const factors = data?.data || [];
  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === factors.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(factors.map((f) => f.id));
    }
  };

  const isAllSelected = factors.length > 0 && selectedIds.length === factors.length;
const filteredFactors = factors;
const {
  data: stats,
  isLoading: statsLoading,
} = useDashboardFactors();
  if (isLoading) {
    return (
      <DashboardContainer>
        <DashboardSidebar>
          <div className="flex h-40 items-center justify-center">در حال بارگذاری...</div>
        </DashboardSidebar>
        <DashboardMain>
          <div className="flex h-40 items-center justify-center">در حال بارگذاری...</div>
        </DashboardMain>
      </DashboardContainer>
    );
  }

  if (error) {
    return (
      <DashboardContainer>
        <DashboardMain>
          <div className="flex h-40 items-center justify-center text-red-500">
            خطا در دریافت فاکتورها: {error.message}
          </div>
        </DashboardMain>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <DashboardSidebar>
  {!statsLoading && stats && (
    <DashboardSidebarStats
     
    />
  )}
</DashboardSidebar>
      <DashboardMain>
        {/* نوار ابزار */}
        <div className="flex flex-row items-center justify-between gap-2">
          <div className="relative max-w-md flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-regular shadow-sm h-10 w-full rounded-full border border-secondary/50 bg-white px-4 pr-10 text-sm outline-none placeholder:text-secondary"
            />
            <span className="absolute top-1/2 right-3 -translate-y-1/2">
              <SearchIcon size="md" />
            </span>
          </div>
          <div className="flex flex-row gap-2 pl-5 -mb-5">
           <div
  className="cursor-pointer text-primary"
  title="خروجی"
  onClick={() => exportSelectedFactors(filteredFactors, selectedIds)}
>
  <ExportIcon size="md" />
</div>
            <div className="cursor-pointer text-primary" onClick={toggleSelectAll}>
              {isAllSelected ? (
                <DualSquareEmpty size="md" />
              ) : (
                <DualSquareOutline size="md" />
              )}
            </div>
          </div>
        </div>

        {/* جدول */}
        <div className="h-auto w-full overflow-x-auto rounded-xs border-2 border-accent">
          <FactorsTable
            factors={filteredFactors}
            selectedIds={selectedIds}
            onToggleSelect={toggleSelect}
          />
        </div>
      </DashboardMain>
    </DashboardContainer>
  );
}