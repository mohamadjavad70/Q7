import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface Props {
  data: Array<{ time: string; attacks: number; defenses: number }>;
}

export default function TimelineChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <XAxis dataKey="time" tick={{ fontSize: 10, fill: "hsl(220, 10%, 55%)" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 10, fill: "hsl(220, 10%, 55%)" }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ backgroundColor: "hsl(220, 18%, 12%)", border: "1px solid hsl(220, 15%, 18%)", borderRadius: "6px", fontSize: 12 }}
          labelStyle={{ color: "hsl(160, 10%, 90%)" }}
        />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <Bar dataKey="attacks" fill="hsl(0, 65%, 50%)" radius={[2, 2, 0, 0]} name="Threats" />
        <Bar dataKey="defenses" fill="hsl(160, 60%, 45%)" radius={[2, 2, 0, 0]} name="Defenses" />
      </BarChart>
    </ResponsiveContainer>
  );
}
