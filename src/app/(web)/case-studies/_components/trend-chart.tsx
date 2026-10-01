import { TrendUpIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export function TrendChart({
  id,
  trend,
  label,
  className,
}: {
  id: string;
  trend: number[];
  label: string;
  className?: string;
}) {
  const width = 480;
  const height = 190;
  const pad = 8;
  const max = Math.max(...trend);
  const min = Math.min(...trend) * 0.6;
  const x = (index: number) =>
    pad + (index / (trend.length - 1)) * (width - pad * 2);
  const y = (value: number) =>
    pad + (1 - (value - min) / (max - min)) * (height - pad * 2);
  const line = trend
    .map((value, index) => `${index ? "L" : "M"}${x(index)},${y(value)}`)
    .join(" ");
  const area = `${line} L${x(trend.length - 1)},${height} L${x(0)},${height} Z`;
  const last = trend.length - 1;
  const gradient = `trend-fill-${id}`;

  return (
    <figure
      aria-hidden
      className={cn(
        "relative rounded-[20px] border border-neutral-200 bg-white p-4 md:p-5",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-[13px] font-semibold text-heading">{label}</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[12px] font-semibold text-brand-deep">
          <TrendUpIcon className="size-3.5" />
          Month on month
        </span>
      </div>
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${width} ${height}`}
        className="mt-4 h-auto w-full overflow-visible"
      >
        <defs>
          <linearGradient id={gradient} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((ratio) => (
          <line
            key={ratio}
            x1={0}
            x2={width}
            y1={height * ratio}
            y2={height * ratio}
            stroke="currentColor"
            strokeDasharray="3 5"
            className="text-neutral-200"
          />
        ))}
        <path d={area} fill={`url(#${gradient})`} />
        <path
          d={line}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx={x(last)}
          cy={y(trend[last])}
          r="6"
          fill="white"
          stroke="var(--primary)"
          strokeWidth="3"
        />
      </svg>
      <div className="mt-2 flex justify-between text-[11.5px] text-neutral-400">
        <span>Start</span>
        <span>Month {trend.length - 1}</span>
      </div>
    </figure>
  );
}
