const routes = [
  { route: "/api/login", blocked: 142, challenged: 58 },
  { route: "/api/search", blocked: 89, challenged: 34 },
  { route: "/admin", blocked: 201, challenged: 12 },
  { route: "/checkout", blocked: 23, challenged: 67 },
  { route: "/api/data", blocked: 56, challenged: 29 },
];

export default function TopRoutes() {
  const maxTotal = Math.max(...routes.map((r) => r.blocked + r.challenged));

  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <h3 className="text-sm font-semibold mb-4">Top Blocked / Challenged Routes</h3>
      <div className="space-y-3">
        {routes.map((r) => {
          const total = r.blocked + r.challenged;
          const pct = (total / maxTotal) * 100;
          return (
            <div key={r.route}>
              <div className="flex items-center justify-between mb-1">
                <code className="text-xs font-mono-data text-muted-foreground">{r.route}</code>
                <span className="text-xs font-mono-data">{total}</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, hsl(0, 65%, 50%), hsl(35, 90%, 55%))`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-[10px] text-muted-foreground mt-4">
        No raw IPs shown. All identifiers are salted hashes.
      </p>
    </div>
  );
}
