import type { ReactNode } from "react";

interface InfoCardProps {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
  highlight?: boolean;
}

export function InfoCard({
  label,
  value,
  icon,
  highlight = false,
}: InfoCardProps) {
  return (
    <div
      className={[
        "flex flex-col gap-1 p-3 rounded-lg border transition-smooth",
        highlight ? "bg-primary/8 border-primary/25" : "bg-card border-border",
      ].join(" ")}
    >
      <div className="flex items-center gap-1.5 text-muted-foreground">
        {icon && <span className="w-3.5 h-3.5 flex-shrink-0">{icon}</span>}
        <span className="text-[11px] font-body font-medium uppercase tracking-wide">
          {label}
        </span>
      </div>
      <div className="font-display font-semibold text-foreground text-sm leading-snug">
        {value}
      </div>
    </div>
  );
}
