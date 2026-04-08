import { Car, Mountain } from "lucide-react";
import type { Stage } from "../types";

interface StageButtonProps {
  stage: Stage;
  onClick: () => void;
  isActive?: boolean;
}

export function StageButton({
  stage,
  onClick,
  isActive = false,
}: StageButtonProps) {
  const num = Number(stage.number);

  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={`stage-btn-${num}`}
      className={[
        "group relative flex items-center gap-3 p-3 rounded-lg border transition-smooth text-left w-full",
        "hover:shadow-warm-elevated hover:-translate-y-0.5",
        isActive
          ? "bg-primary/10 border-primary/50 shadow-warm"
          : "bg-card border-border hover:border-primary/30",
      ].join(" ")}
    >
      {/* Stage number badge */}
      <span
        className={[
          "flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm",
          isActive
            ? "bg-primary text-primary-foreground"
            : "bg-primary/15 text-primary group-hover:bg-primary/25",
        ].join(" ")}
      >
        E{num}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="font-display font-semibold text-sm text-foreground truncate leading-tight">
          {stage.startLocation} → {stage.endLocation}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {stage.dateFrom} · {Number(stage.distanceKm)} km
        </p>
      </div>

      {/* Special badges */}
      <div className="flex flex-col gap-1 items-end flex-shrink-0">
        {stage.isGipfeltag && (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-accent/20 text-accent-foreground border border-accent/30">
            <Mountain className="w-2.5 h-2.5" />
            Gipfeltag
          </span>
        )}
        {stage.taxiInfo && (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-destructive/10 text-destructive border border-destructive/20">
            <Car className="w-2.5 h-2.5" />
            Taxi
          </span>
        )}
      </div>
    </button>
  );
}
