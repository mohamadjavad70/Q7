interface Event {
  id: string;
  ts: string;
  route: string;
  clientHash: string;
  action: string;
  phi: number;
  reason: string;
}

const actionColors: Record<string, string> = {
  allow: "text-success",
  slowdown: "text-warning",
  challenge: "text-info",
  tarpit: "text-muted-foreground",
  isolate: "text-danger",
  rollback: "text-warning",
  tune: "text-info",
  circuit_breaker: "text-danger",
};

const educationalExplanations: Record<string, string> = {
  rate_exceeded: "This client sent too many requests in a short window, which may indicate automated tooling.",
  entropy_spike: "Request patterns showed unusual randomness, often a sign of scanning or probing behavior.",
  anomaly_detected: "The request deviated significantly from normal traffic patterns for this route.",
  "5xx_spike_detected": "A sudden increase in server errors triggered automatic rollback to the last stable policy.",
  false_positive_reduction: "The system suggested tuning parameters to reduce blocking legitimate users.",
  overload_detected: "Traffic exceeded safe thresholds. Circuit breaker activated minimal-defense mode to keep the site available.",
};

interface Props {
  events: Event[];
  educationalMode: boolean;
}

export default function EventsLog({ events, educationalMode }: Props) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left p-3 font-medium">Time</th>
              <th className="text-left p-3 font-medium">Route</th>
              <th className="text-left p-3 font-medium">Client</th>
              <th className="text-left p-3 font-medium">Action</th>
              <th className="text-left p-3 font-medium">Φ</th>
              <th className="text-left p-3 font-medium">Reason</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="p-3 font-mono-data">{e.ts}</td>
                <td className="p-3 font-mono-data">{e.route}</td>
                <td className="p-3 font-mono-data">{e.clientHash}</td>
                <td className={`p-3 font-semibold ${actionColors[e.action] || "text-foreground"}`}>{e.action}</td>
                <td className="p-3 font-mono-data">{e.phi || "—"}</td>
                <td className="p-3">
                  <span className="text-muted-foreground">{e.reason}</span>
                  {educationalMode && educationalExplanations[e.reason] && (
                    <p className="mt-1 text-guardian text-[11px] leading-relaxed">
                      ℹ {educationalExplanations[e.reason]}
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
