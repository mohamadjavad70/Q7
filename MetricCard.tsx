import { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: string;
  icon: LucideIcon;
  status: "normal" | "elevated" | "good" | "critical";
}

const statusColors: Record<string, string> = {
  normal: "text-muted-foreground",
  elevated: "text-warning",
  good: "text-success",
  critical: "text-danger",
};

const statusBorders: Record<string, string> = {
  normal: "border-border",
  elevated: "border-warning/30",
  good: "border-success/30",
  critical: "border-danger/30",
};

export default function MetricCard({ label, value, icon: Icon, status }: Props) {
  return (
    <div className={`bg-card border rounded-lg p-4 ${statusBorders[status]}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground">{label}</span>
        <Icon className={`h-4 w-4 ${statusColors[status]}`} />
      </div>
      <p className={`text-2xl font-bold font-mono-data ${statusColors[status]}`}>{value}</p>
    </div>
  );
}
