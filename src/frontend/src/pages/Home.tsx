import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { StageButton } from "../components/StageButton";
import { useAllGpx } from "../hooks/useGpx";
import { useStages } from "../hooks/useStages";
import type { ElevationPoint } from "../types";
import { parseGpx } from "../utils/parseGpx";

// ─── Per-stage elevation waypoints (fallback) ─────────────────────────────────
const STAGE_RAW: Record<number, [number, number, string?][]> = {
  1: [
    [0, 813, "Oberstdorf"],
    [2, 870],
    [4, 950],
    [6, 1100],
    [8, 1300],
    [10, 1550],
    [11.5, 1720],
    [13, 1844, "Kemptner Hütte"],
  ],
  2: [
    [0, 1844, "Kemptner Hütte"],
    [2, 2000, "Mädelejoch"],
    [4, 1700],
    [6, 1400],
    [9, 1200],
    [11, 1150],
    [13, 1100, "Holzgau"],
  ],
  3: [
    [0, 1100, "Holzgau"],
    [1, 1150],
    [3, 1600],
    [5, 1900],
    [7, 2100],
    [8.5, 2300],
    [10, 2380, "Ansbacher Hütte"],
  ],
  4: [
    [0, 2380, "Ansbacher Hütte"],
    [2, 2599, "Seescharte"],
    [4, 2200],
    [6, 2000],
    [8, 1950],
    [10, 2050],
    [12, 1900],
    [14, 1780, "Venet Gipfelhütte"],
  ],
  5: [
    [0, 1780, "Venet"],
    [3, 2208, "Venetberg"],
    [6, 1900],
    [9, 1400],
    [12, 1100],
    [15, 950],
    [17, 870, "Wenns"],
  ],
  6: [
    [0, 870, "Wenns"],
    [3, 1200],
    [6, 1700],
    [9, 2100],
    [12, 2500],
    [13.5, 2650],
    [15, 2759, "Braunschweiger Hütte"],
  ],
  7: [
    [0, 2759, "Braunschweiger Hütte"],
    [2, 2950, "Pitztaler Jöchl"],
    [4, 2600],
    [6, 2300],
    [8, 2100],
    [10, 2000],
    [12, 1900, "Vent"],
  ],
  8: [
    [0, 1900, "Vent"],
    [2, 2050],
    [4, 2200],
    [6, 2350],
    [8, 2400],
    [9.5, 2413, "Hochjoch Hospiz"],
  ],
  9: [
    [0, 2413, "Hochjoch Hospiz"],
    [1.5, 2600],
    [2.5, 2800],
    [3.5, 3000],
    [4, 3128, "Guslarspitze"],
    [4.5, 3000],
    [5.5, 2800],
    [6.5, 2600],
    [8, 2413, "zurück"],
  ],
  10: [
    [0, 2413, "Hochjoch Hospiz"],
    [2, 2300],
    [4, 2100],
    [6, 1900],
    [8, 1700, "Vernagthütte"],
  ],
  11: [
    [0, 1700, "Vernagthütte"],
    [2, 2100],
    [4, 2600],
    [5.5, 3019, "Similaun-Hütte"],
    [7, 2500],
    [9, 2000],
    [10.5, 1700],
    [12, 1500, "Schnals"],
  ],
  12: [
    [0, 1500, "Schnals"],
    [3, 1300],
    [6, 1100],
    [9, 900],
    [12, 700],
    [15, 500],
    [17, 400],
    [20, 325, "Meran"],
  ],
};

function buildTourProfile(
  gpxOverrides: Record<number, ElevationPoint[]>,
): ElevationPoint[] {
  const points: ElevationPoint[] = [];
  let cumKm = 0;
  for (let n = 1; n <= 12; n++) {
    const gpxPoints = gpxOverrides[n];
    if (gpxPoints && gpxPoints.length > 0) {
      for (const pt of gpxPoints) {
        points.push({
          distance: Math.round((cumKm + pt.distance) * 10) / 10,
          elevation: pt.elevation,
          label: pt.label,
        });
      }
      cumKm += gpxPoints[gpxPoints.length - 1].distance;
    } else {
      const raw = STAGE_RAW[n];
      if (!raw) continue;
      for (const [dist, elev, label] of raw) {
        points.push({
          distance: Math.round((cumKm + dist) * 10) / 10,
          elevation: elev,
          label,
        });
      }
      cumKm += raw[raw.length - 1][0];
    }
  }
  return points;
}

function buildBoundaries(
  gpxOverrides: Record<number, ElevationPoint[]>,
): { km: number; label: string }[] {
  const result: { km: number; label: string }[] = [];
  let cumKm = 0;
  for (let n = 1; n <= 12; n++) {
    const gpxPoints = gpxOverrides[n];
    result.push({ km: cumKm, label: `E${n}` });
    if (gpxPoints && gpxPoints.length > 0) {
      cumKm += gpxPoints[gpxPoints.length - 1].distance;
    } else {
      const raw = STAGE_RAW[n];
      if (!raw) continue;
      cumKm += raw[raw.length - 1][0];
    }
  }
  return result;
}

const STATIC_TOUR_PROFILE = buildTourProfile({});
const STATIC_BOUNDARIES = buildBoundaries({});

const TOUR_STATS = [
  { label: "Etappen", value: "12" },
  { label: "Gesamtdistanz", value: "~157 km" },
  { label: "Höhenmeter ↑", value: "~8.800 m" },
  { label: "Reisetage", value: "16" },
];

const STATIC_STAGES = [
  {
    id: "1",
    num: 1,
    from: "Oberstdorf",
    to: "Kemptner Hütte",
    date: "04.08.",
    km: 13,
    isGipfeltag: false,
    hasTaxi: false,
  },
  {
    id: "2",
    num: 2,
    from: "Kemptner Hütte",
    to: "Holzgau",
    date: "05.08.",
    km: 13,
    isGipfeltag: false,
    hasTaxi: false,
  },
  {
    id: "3",
    num: 3,
    from: "Holzgau",
    to: "Ansbacher Hütte",
    date: "06.08.",
    km: 10,
    isGipfeltag: false,
    hasTaxi: true,
  },
  {
    id: "4",
    num: 4,
    from: "Ansbacher Hütte",
    to: "Venet Gipfelhütte",
    date: "07.08.",
    km: 14,
    isGipfeltag: false,
    hasTaxi: false,
  },
  {
    id: "5",
    num: 5,
    from: "Venet",
    to: "Wenns",
    date: "08.08.",
    km: 17,
    isGipfeltag: false,
    hasTaxi: false,
  },
  {
    id: "6",
    num: 6,
    from: "Wenns",
    to: "Braunschweiger Hütte",
    date: "09.08.",
    km: 15,
    isGipfeltag: false,
    hasTaxi: false,
  },
  {
    id: "7",
    num: 7,
    from: "Braunschweiger Hütte",
    to: "Vent",
    date: "10.08.",
    km: 12,
    isGipfeltag: false,
    hasTaxi: false,
  },
  {
    id: "8",
    num: 8,
    from: "Vent",
    to: "Hochjoch Hospiz",
    date: "11.08.",
    km: 10,
    isGipfeltag: false,
    hasTaxi: false,
  },
  {
    id: "9",
    num: 9,
    from: "Hochjoch Hospiz",
    to: "Guslarspitze",
    date: "12.08.",
    km: 8,
    isGipfeltag: true,
    hasTaxi: false,
  },
  {
    id: "10",
    num: 10,
    from: "Hochjoch Hospiz",
    to: "Vernagthütte",
    date: "13.08.",
    km: 8,
    isGipfeltag: false,
    hasTaxi: false,
  },
  {
    id: "11",
    num: 11,
    from: "Vernagthütte",
    to: "Schnals",
    date: "14.08.",
    km: 12,
    isGipfeltag: false,
    hasTaxi: false,
  },
  {
    id: "12",
    num: 12,
    from: "Schnals",
    to: "Meran",
    date: "15.08.",
    km: 20,
    isGipfeltag: false,
    hasTaxi: false,
  },
];

// ─── Custom tooltip ───────────────────────────────────────────────────────────
interface TPayload {
  payload?: ElevationPoint;
  value?: number;
}
interface TProps {
  active?: boolean;
  payload?: TPayload[];
  label?: number;
}

function TourTooltip({ active, payload, label }: TProps) {
  if (!active || !payload?.length) return null;
  const pt = payload[0]?.payload;
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-warm-elevated text-sm">
      <p className="text-muted-foreground text-xs">{label} km vom Start</p>
      <p className="font-display font-bold text-foreground">
        {payload[0]?.value} m ü.M.
      </p>
      {pt?.label && <p className="text-primary text-xs mt-0.5">{pt.label}</p>}
    </div>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────
const ALL_STAGE_IDS = [1n, 2n, 3n, 4n, 5n, 6n, 7n, 8n, 9n, 10n, 11n, 12n];

export default function Home() {
  const navigate = useNavigate();
  const { data: stages = [], isLoading } = useStages();
  const { data: allGpxData } = useAllGpx(ALL_STAGE_IDS);

  // Parse GPX overrides for stages that have GPX data
  const [gpxOverrides, setGpxOverrides] = useState<
    Record<number, ElevationPoint[]>
  >({});

  useEffect(() => {
    if (!allGpxData) return;
    const overrides: Record<number, ElevationPoint[]> = {};
    const fetchPromises: Promise<void>[] = [];

    for (const [stageIdStr, gpxData] of Object.entries(allGpxData)) {
      const stageNum = Number(stageIdStr);
      const url = gpxData.blob.getDirectURL();
      fetchPromises.push(
        fetch(url)
          .then((res) => res.text())
          .then((xml) => {
            try {
              const pts = parseGpx(xml);
              if (pts.length > 0) overrides[stageNum] = pts;
            } catch {
              // ignore parse errors, keep fallback
            }
          })
          .catch(() => {}),
      );
    }

    if (fetchPromises.length === 0) return;

    Promise.all(fetchPromises)
      .then(() => {
        if (Object.keys(overrides).length > 0) {
          setGpxOverrides(overrides);
        }
      })
      .catch(() => {});
  }, [allGpxData]);

  const tourProfile =
    Object.keys(gpxOverrides).length > 0
      ? buildTourProfile(gpxOverrides)
      : STATIC_TOUR_PROFILE;

  const boundaries =
    Object.keys(gpxOverrides).length > 0
      ? buildBoundaries(gpxOverrides)
      : STATIC_BOUNDARIES;

  const sortedStages = [...stages].sort(
    (a, b) => Number(a.number) - Number(b.number),
  );

  const minElev = Math.min(...tourProfile.map((p) => p.elevation));
  const maxElev = Math.max(...tourProfile.map((p) => p.elevation));
  const domainMin = Math.floor((minElev - 150) / 100) * 100;
  const domainMax = Math.ceil((maxElev + 150) / 100) * 100;

  function goToStage(id: string) {
    void navigate({ to: "/etappe/$id", params: { id } });
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="bg-card border-b border-border py-10 px-4 text-center"
      >
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
          E5 · Oberstdorf → Meran
        </h1>
        <p className="font-display text-lg text-primary mt-1">August 2026</p>
        <p className="text-muted-foreground font-body max-w-xl mx-auto mt-3 text-sm sm:text-base leading-relaxed">
          Unser Wandertagebuch für die Alpenüberquerung — 12 Etappen, Gletscher,
          Berghütten und ein Gipfeltag mit der ganzen Familie.
        </p>
      </motion.section>

      {/* ── Stats bar ────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="border-b border-border bg-primary/[0.07]"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4">
          {TOUR_STATS.map(({ label, value }, i) => (
            <div
              key={label}
              className={[
                "flex flex-col items-center py-4 px-3",
                i % 2 === 0 ? "border-r border-border/50" : "",
                i === TOUR_STATS.length - 1
                  ? "sm:border-r-0"
                  : "sm:border-r sm:border-border/50",
              ].join(" ")}
            >
              <span className="font-display text-2xl font-bold text-primary">
                {value}
              </span>
              <span className="text-xs text-muted-foreground mt-0.5">
                {label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Tour elevation profile ────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="max-w-5xl mx-auto px-4 pt-8 pb-2"
      >
        <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-1">
          Gesamthöhenprofil
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Alle 12 Etappen — von Oberstdorf bis Meran. Hover für Details.
        </p>
        <div
          className="bg-card rounded-xl border border-border p-4 shadow-warm"
          data-ocid="tour-elevation-chart"
        >
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart
              data={tourProfile}
              margin={{ top: 16, right: 12, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="tourGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="oklch(0.38 0.08 40)"
                    stopOpacity={0.5}
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

              {boundaries.map(({ km, label }) => (
                <ReferenceLine
                  key={label}
                  x={km}
                  stroke="oklch(0.38 0.08 40)"
                  strokeOpacity={0.22}
                  strokeDasharray="4 4"
                  label={{
                    value: label,
                    position: "top",
                    fontSize: 9,
                    fill: "oklch(0.5 0.02 50)",
                    fontFamily: "var(--font-body)",
                  }}
                />
              ))}

              <XAxis
                dataKey="distance"
                tickFormatter={(v: number) => `${v} km`}
                tick={{
                  fontSize: 10,
                  fill: "oklch(0.5 0.02 50)",
                  fontFamily: "var(--font-body)",
                }}
                axisLine={{ stroke: "oklch(0.88 0.02 75)" }}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                domain={[domainMin, domainMax]}
                tickFormatter={(v: number) => `${v}m`}
                tick={{
                  fontSize: 10,
                  fill: "oklch(0.5 0.02 50)",
                  fontFamily: "var(--font-body)",
                }}
                axisLine={false}
                tickLine={false}
                width={52}
              />
              <Tooltip content={<TourTooltip />} />
              <Area
                type="monotone"
                dataKey="elevation"
                stroke="oklch(0.38 0.08 40)"
                strokeWidth={2.5}
                fill="url(#tourGrad)"
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "oklch(0.38 0.08 40)",
                  strokeWidth: 0,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>

          <div className="flex flex-wrap justify-between text-xs text-muted-foreground mt-2 px-1 gap-1">
            <span>Start: Oberstdorf 813 m</span>
            <span>Höchstpunkt: Guslarspitze 3.128 m</span>
            <span>Ziel: Meran 325 m</span>
          </div>
        </div>
      </motion.section>

      {/* ── Stage grid ───────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.55 }}
        className="max-w-5xl mx-auto px-4 pt-6 pb-10"
      >
        <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-1">
          Die 12 Etappen
        </h2>
        <p className="text-sm text-muted-foreground mb-5">
          Klicke auf eine Etappe für Höhenprofil, Infos und Fotos.
        </p>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {(
              [
                "s1",
                "s2",
                "s3",
                "s4",
                "s5",
                "s6",
                "s7",
                "s8",
                "s9",
                "s10",
                "s11",
                "s12",
              ] as const
            ).map((k) => (
              <div key={k} className="h-20 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        ) : sortedStages.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {sortedStages.map((stage, i) => (
              <motion.div
                key={stage.id.toString()}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.04 }}
              >
                <StageButton
                  stage={stage}
                  onClick={() => goToStage(stage.id.toString())}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          /* Static fallback grid when backend data hasn't loaded */
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {STATIC_STAGES.map((s, i) => (
              <motion.button
                key={s.id}
                type="button"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.04 }}
                onClick={() => goToStage(s.id)}
                data-ocid={`stage-btn-${s.num}`}
                className="group flex items-center gap-3 p-3 rounded-lg border transition-smooth text-left w-full bg-card border-border hover:border-primary/30 hover:shadow-warm-elevated hover:-translate-y-0.5"
              >
                <span className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm bg-primary/15 text-primary group-hover:bg-primary/25">
                  E{s.num}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-semibold text-sm text-foreground truncate leading-tight">
                    {s.from} → {s.to}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {s.date} · {s.km} km
                  </p>
                </div>
                <div className="flex flex-col gap-1 items-end flex-shrink-0">
                  {s.isGipfeltag && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-accent/20 text-accent-foreground border border-accent/30">
                      Gipfeltag
                    </span>
                  )}
                  {s.hasTaxi && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-destructive/10 text-destructive border border-destructive/20">
                      Taxi
                    </span>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </motion.section>
    </div>
  );
}
