import { withAuth } from "@/src/shared/components/auth/with-auth";
import { NextResponse } from "next/server";

import { getProductsCharts } from "./_lib/chart";
import { getProductsReport } from "./_lib/report";
import { getProductsSummary } from "./_lib/summary";

export const GET = withAuth(async () => {
  const [summary, report] = await Promise.all([
    getProductsSummary(),
    getProductsReport(),
  ]);

  const charts = await getProductsCharts({ summary, report });

  return NextResponse.json({
    summary,
    report,
    charts,
  });
}, [2]);
