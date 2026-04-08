import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ElevationPoint } from "../types";

interface PhotoMarker {
  elevation: number;
  id: string;
}

interface ElevationChartProps {
  elevationPoints: ElevationPoint[];
  height?: number;
  photoMarkers?: PhotoMarker[];
}

interface TooltipPayload {
  value: number;
  payload?: ElevationPoint;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string | number;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const pointLabel = payload[0]?.payload?.label;
  return (
    <div className="bg-card border border-border rounded px-3 py-2 shadow-warm text-sm max-w-[160px]">
      <p className="text-muted-foreground font-body text-xs">{label} km</p>
      <p className="font-display font-semibold text-foreground">
        {payload[0].value} m
      </p>
      {pointLabel && (
        <p className="text-xs text-primary font-body mt-0.5 leading-tight">
          {pointLabel}
        </p>
      )}
    </div>
  );
}

// Find the closest x (distance) value in the elevation profile for a given elevation
function findClosestDistance(
  elevationPoints: ElevationPoint[],
  targetElevation: number,
): number {
  let closest = elevationPoints[0];
  let minDiff = Math.abs(elevationPoints[0].elevation - targetElevation);
  for (const pt of elevationPoints) {
    const diff = Math.abs(pt.elevation - targetElevation);
    if (diff < minDiff) {
      minDiff = diff;
      closest = pt;
    }
  }
  return closest.distance;
}

export function ElevationChart({
  elevationPoints,
  height = 200,
  photoMarkers = [],
}: ElevationChartProps) {
  if (!elevationPoints.length) return null;

  const minElev = Math.min(...elevationPoints.map((p) => p.elevation));
  const maxElev = Math.max(...elevationPoints.map((p) => p.elevation));
  const padding = Math.max(100, (maxElev - minElev) * 0.15);
  const domainMin = Math.floor((minElev - padding) / 100) * 100;
  const domainMax = Math.ceil((maxElev + padding * 0.3) / 100) * 100;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart
        data={elevationPoints}
        margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="elevGradient" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="oklch(0.38 0.08 40)"
              stopOpacity={0.45}
            />
            <stop
              offset="95%"
              stopColor="oklch(0.38 0.08 40)"
              stopOpacity={0.03}
            />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="oklch(0.88 0.02 75)"
          vertical={false}
        />
        <XAxis
          dataKey="distance"
          tickFormatter={(v: number) => `${v} km`}
          tick={{
            fontSize: 11,
            fill: "oklch(0.5 0.02 50)",
            fontFamily: "var(--font-body)",
          }}
          axisLine={{ stroke: "oklch(0.88 0.02 75)" }}
          tickLine={false}
        />
        <YAxis
          domain={[domainMin, domainMax]}
          tickFormatter={(v: number) => `${v}m`}
          tick={{
            fontSize: 11,
            fill: "oklch(0.5 0.02 50)",
            fontFamily: "var(--font-body)",
          }}
          axisLine={false}
          tickLine={false}
          width={52}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="elevation"
          stroke="oklch(0.38 0.08 40)"
          strokeWidth={2.5}
          fill="url(#elevGradient)"
          dot={false}
          activeDot={{ r: 5, fill: "oklch(0.38 0.08 40)", strokeWidth: 0 }}
        />
        {photoMarkers.map((marker) => (
          <ReferenceDot
            key={marker.id}
            x={findClosestDistance(elevationPoints, marker.elevation)}
            y={marker.elevation}
            r={6}
            fill="oklch(0.52 0.1 70)"
            stroke="white"
            strokeWidth={2}
            label={{
              value: "📷",
              position: "top",
              fontSize: 12,
              offset: 4,
            }}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
