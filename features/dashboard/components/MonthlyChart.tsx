"use client";

import { IMonthlyStat } from "@/features/dashboard/types";
import { useMemo } from "react";

interface MonthlyChartProps {
  data: IMonthlyStat[];
}

export function MonthlyChart({ data }: MonthlyChartProps) {
  const maxRevenue = useMemo(
    () => Math.max(...data.map((d) => d.totalRevenue), 1),
    [data],
  );
  const maxOrders = useMemo(
    () => Math.max(...data.map((d) => d.totalOrders), 1),
    [data],
  );
  const maxPayments = useMemo(
    () => Math.max(...data.map((d) => d.totalPayments), 1),
    [data],
  );
  const points = useMemo(() => {
    const step = data.length > 1 ? 680 / (data.length - 1) : 680;
    return data.map((d, i) => {
      const x = i * step;
      const y = 160 - (d.totalRevenue / maxRevenue) * 160;
      return { x, y, value: d.totalRevenue, month: d.month };
    });
  }, [data, maxRevenue]);

  const areaPath = useMemo(() => {
    if (points.length === 0) return "";
    const line = points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
      .join(" ");
    const last = points[points.length - 1];
    return `${line} L ${last.x} 180 L ${points[0].x} 180 Z`;
  }, [points]);

  const linePath = useMemo(
    () => points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" "),
    [points],
  );

  if (data.length === 0) {
    return (
      <div className="flex h-52 flex-col items-center justify-center text-sm text-muted-foreground">
        لا توجد بيانات لعرضها
      </div>
    );
  }

  return (
    <div>
      <div className="relative h-52 w-full">
        <svg
          viewBox="0 0 720 200"
          className="h-full w-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>

          <line
            x1="0"
            y1="20"
            x2="720"
            y2="20"
            stroke="currentColor"
            strokeOpacity="0.1"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="60"
            x2="720"
            y2="60"
            stroke="currentColor"
            strokeOpacity="0.1"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="100"
            x2="720"
            y2="100"
            stroke="currentColor"
            strokeOpacity="0.1"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="140"
            x2="720"
            y2="140"
            stroke="currentColor"
            strokeOpacity="0.1"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="180"
            x2="720"
            y2="180"
            stroke="currentColor"
            strokeOpacity="0.1"
            strokeWidth="1"
          />

          <path d={areaPath} fill="url(#revenueFill)" className="text-primary" />
          <path
            d={linePath}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-primary"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {points.map((p) => (
            <g key={`rev-${p.month}`}>
              <circle
                cx={p.x}
                cy={p.y}
                r="4"
                fill="var(--background)"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary"
              />
              <circle cx={p.x} cy={p.y} r="9" fill="transparent">
                <title>{`${p.month}: ${p.value.toLocaleString()}`}</title>
              </circle>
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-1">
        {data.map((d) => {
          const barHeight = Math.round((d.totalRevenue / maxRevenue) * 64);
          const ordersHeight = Math.round((d.totalOrders / maxOrders) * 24);
          const paymentsHeight = Math.round(
            (d.totalPayments / maxPayments) * 14,
          );
          return (
            <div key={d.month} className="flex flex-col items-center gap-1">
              <div className="relative flex h-24 w-full items-end justify-center gap-0.5">
                <div
                  className="w-[45%] max-w-[14px] rounded-t-sm bg-primary/80 transition-all"
                  style={{ height: `${barHeight}px` }}
                  title={`إيرادات ${d.month}`}
                />
                <div
                  className="w-[30%] max-w-[10px] rounded-t-sm bg-blue-500/80 transition-all"
                  style={{ height: `${ordersHeight}px` }}
                  title={`طلبات ${d.month}`}
                />
                <div
                  className="w-[25%] max-w-[8px] rounded-t-sm bg-emerald-500/80 transition-all"
                  style={{ height: `${paymentsHeight}px` }}
                  title={`مدفوعات ${d.month}`}
                />
              </div>
              <span className="text-[10px] text-muted-foreground">
                {d.month}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
