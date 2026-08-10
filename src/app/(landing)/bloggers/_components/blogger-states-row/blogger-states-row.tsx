import { ICONS } from "@/src/shared/constants/dynamic-icon";

import { BloggerStats } from "../../_types/blogger.types";
import { formatFollowers } from "../../_utils/format-followers";
import StatBadge from "../stat-badge/stat-badge";

interface BloggerStatsRowProps {
  stats: BloggerStats;
}

export default function BloggerStatsRow({ stats }: BloggerStatsRowProps) {
  return (
    <div className="flex left-30 items-stretch gap-2">
      <StatBadge
        icon={ICONS.heartIcon}
        value={formatFollowers(stats.followers)}
        label="دنبال‌کننده"
      />
      <StatBadge
        icon={ICONS.coffeeIcon}
        value={`${stats.cafesReviewed}+`}
        label="معرفی کافه"
      />
      <StatBadge
        icon={ICONS.profileIcon}
        value={`${stats.visitors}+`}
        label="بازدیدکننده"
      />
    </div>
  );
}