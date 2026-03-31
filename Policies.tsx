import { Shield, FileText, Hash, Download, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const behaviors = [
  {
    title: "Rate Limiting",
    desc: "Requests exceeding configured thresholds per route are slowed down. A token-bucket algorithm ensures fair access while preventing floods.",
    why: "Prevents resource exhaustion from automated request floods.",
  },
  {
    title: "Behavioral Scoring",
    desc: "Each request contributes to a Risk Field score (Φ) combining rate, entropy, anomaly, and reputation dimensions.",
    why: "Identifies patterns that deviate from normal human browsing without inspecting content.",
  },
  {
    title: "Challenge Mechanisms",
    desc: "Requests with elevated Φ scores may be slowed or asked to complete a lightweight proof-of-work or captcha.",
    why: "Distinguishes automated clients from real users without blocking outright.",
  },
  {
    title: "Defense Tarpit",
    desc: "Highly suspicious requests are routed to fake endpoints that return benign static content after artificial delays.",
    why: "Wastes attacker resources without retaliation or exposure of real data.",
  },
  {
    title: "Self-Healing",
    desc: "If false positive rates or server errors spike, policies automatically roll back to the last known-good configuration.",
    why: "Ensures legitimate users are never locked out due to overly aggressive rules.",
  },
];

const sampleHash = {
  policy_version: "v2.4.1",
  timestamp: new Date().toISOString(),
  config_hash: "sha256:e3b0c44298fc1c149afbf4c8996fb924...",
  note: "This hash covers security configuration only. No traffic or user data is included.",
};

export default function PoliciesPage() {
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(sampleHash, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "guardian-integrity-hash.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 z-50 bg-background/90 backdrop-blur-sm">
        <div className="container flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-guardian" />
            <span className="font-bold text-sm">Guardian AI</span>
          </Link>
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">Dashboard</Button>
          </Link>
        </div>
      </header>

      <div className="container py-12 max-w-3xl space-y-10">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <FileText className="h-7 w-7 text-guardian" /> Policies & Transparency
          </h1>
          <p className="text-muted-foreground">
            Every defense mechanism explained in plain language. We believe security should be auditable and understandable.
          </p>
        </div>

        <div className="space-y-4">
          {behaviors.map((b) => (
            <div key={b.title} className="bg-card border border-border rounded-lg p-5">
              <h3 className="font-semibold mb-1">{b.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{b.desc}</p>
              <div className="flex items-start gap-2 text-xs bg-muted/50 rounded p-3">
                <Info className="h-3.5 w-3.5 text-guardian shrink-0 mt-0.5" />
                <span className="text-guardian">{b.why}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Hash className="h-5 w-5 text-guardian" /> Integrity Hashes
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            We publish cryptographic hashes of our security configuration. These hashes contain <strong>no traffic or personal data</strong> — only policy version, timestamp, and configuration hash.
          </p>
          <pre className="bg-muted rounded-lg p-4 text-xs font-mono-data overflow-x-auto mb-4">
            {JSON.stringify(sampleHash, null, 2)}
          </pre>
          <Button variant="outline" size="sm" onClick={handleExport} className="gap-2">
            <Download className="h-4 w-4" /> Export for Blockchain Publishing
          </Button>
        </div>
      </div>
    </div>
  );
}
