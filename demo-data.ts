export function generateDemoTimeline() {
  const data = [];
  const now = Date.now();
  for (let i = 29; i >= 0; i--) {
    const t = new Date(now - i * 60000);
    const rate = 0.2 + Math.random() * 0.4 + (i < 10 ? 0.3 : 0);
    const entropy = 0.3 + Math.random() * 0.3 + (i < 8 ? 0.25 : 0);
    const anomaly = Math.random() * 0.3 + (i < 6 ? 0.4 : 0);
    const reputation = 0.7 + Math.random() * 0.2 - (i < 10 ? 0.3 : 0);
    const phi = 0.3 * rate + 0.25 * entropy + 0.3 * anomaly - 0.15 * reputation;
    data.push({
      time: t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      phi: +phi.toFixed(3),
      attacks: Math.floor(Math.random() * 20 + (i < 10 ? 30 : 5)),
      defenses: Math.floor(Math.random() * 15 + (i < 10 ? 25 : 3)),
      rate: +rate.toFixed(2),
      entropy: +entropy.toFixed(2),
      anomaly: +anomaly.toFixed(2),
      reputation: +reputation.toFixed(2),
    });
  }
  return data;
}

export function generateDemoEvents() {
  const actions = ["slowdown", "challenge", "allow", "tarpit", "isolate"] as const;
  const routes = ["/api/login", "/api/search", "/checkout", "/admin", "/api/data"];
  return Array.from({ length: 12 }, (_, i) => ({
    id: `evt-${i}`,
    ts: new Date(Date.now() - i * 45000).toLocaleTimeString(),
    route: routes[i % routes.length],
    clientHash: `c${(0x1a2b3c + i * 0x111).toString(16)}`,
    action: actions[i % actions.length],
    phi: +(Math.random() * 0.8 + 0.1).toFixed(3),
    reason: i % 3 === 0 ? "rate_exceeded" : i % 3 === 1 ? "entropy_spike" : "anomaly_detected",
  }));
}

export function generateSelfHealEvents() {
  return [
    { id: "sh-1", ts: new Date(Date.now() - 120000).toLocaleTimeString(), route: "—", clientHash: "—", action: "rollback", phi: 0, reason: "5xx_spike_detected" },
    { id: "sh-2", ts: new Date(Date.now() - 300000).toLocaleTimeString(), route: "—", clientHash: "—", action: "tune", phi: 0, reason: "false_positive_reduction" },
    { id: "sh-3", ts: new Date(Date.now() - 600000).toLocaleTimeString(), route: "—", clientHash: "—", action: "circuit_breaker", phi: 0, reason: "overload_detected" },
  ];
}
