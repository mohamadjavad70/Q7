import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

interface Props {
  data: Array<{ time: string; phi: number }>;
}

export default function RiskFieldChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="phiGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(160, 60%, 45%)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(160, 60%, 45%)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="time" tick={{ fontSize: 10, fill: "hsl(220, 10%, 55%)" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 10, fill: "hsl(220, 10%, 55%)" }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ backgroundColor: "hsl(220, 18%, 12%)", border: "1px solid hsl(220, 15%, 18%)", borderRadius: "6px", fontSize: 12 }}
          labelStyle={{ color: "hsl(160, 10%, 90%)" }}
        />
        <Area type="monotone" dataKey="phi" stroke="hsl(160, 60%, 45%)" fill="url(#phiGradient)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
