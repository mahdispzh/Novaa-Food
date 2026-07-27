import { NextResponse } from "next/server";

import { withAuth } from "@/src/shared/auth/with-auth";

import { getPaymentsCharts } from "./_lib/chart";
import { getPaymentsReport } from "./_lib/report";
import { getPaymentsSummary } from "./_lib/summary";

export const GET = withAuth(async () => {
  const [summary, report] = await Promise.all([
    getPaymentsSummary(),
    getPaymentsReport(),
  ]);

  const charts = await getPaymentsCharts(summary, report);

  return NextResponse.json({
    summary,
    report,
    charts,
  });
}, [2]);
