import { Shield, Eye, RefreshCw, FileCheck, ArrowRight, Lock, Server, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import guardianEmblem from "@/assets/guardian-emblem.png";

const features = [
  {
    icon: Shield,
    title: "Prevention First",
    desc: "Proactive rate limiting, behavioral scoring, and intelligent challenge mechanisms stop threats before they reach your application.",
  },
  {
    icon: Eye,
    title: "Behavioral Defense",
    desc: "Analyze request patterns with our Risk Field Engine. No raw IPs stored — only salted hashes and aggregated metrics.",
  },
  {
    icon: RefreshCw,
    title: "Self-Healing",
    desc: "Automatic policy rollback on error spikes, dynamic tuning suggestions, and circuit breakers keep your site available.",
  },
  {
    icon: FileCheck,
    title: "Full Transparency",
    desc: "Cryptographic integrity hashes of every policy. Export blockchain-friendly audit trails. No surveillance, no data selling.",
  },
];

const principles = [
  { icon: Lock, text: "Defensive only — no offensive capabilities" },
  { icon: Server, text: "Privacy-first — no raw IP storage" },
  { icon: Zap, text: "No surveillance — no tracking pixels" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen gradient-hero">
      {/* Nav */}
      <nav className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-guardian" />
            <span className="font-bold text-lg tracking-tight">Guardian AI</span>
            <span className="text-xs text-muted-foreground ml-1 hidden sm:inline">Cyber Dojo Edition</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/policies" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:inline">
              Policies
            </Link>
            <Link to="/integrations" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:inline">
              Integrations
            </Link>
            <Link to="/auth">
              <Button variant="outline" size="sm">Sign In</Button>
            </Link>
            <Link to="/dashboard">
              <Button size="sm">Dashboard</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="container pt-20 pb-32 relative">
        <div className="grid-pattern absolute inset-0 opacity-30 pointer-events-none" />
        <div className="relative flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="mb-8 relative">
            <img src={guardianEmblem} alt="Guardian AI Emblem" className="w-32 h-32 rounded-2xl glow-guardian-strong" />
            <div className="absolute inset-0 rounded-2xl bg-guardian/10 animate-pulse-guardian" />
          </div>
          <p className="text-guardian font-mono-data text-sm tracking-[0.3em] uppercase mb-4">Unite and Defend</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Guardian AI
            <span className="block text-guardian">Cyber Dojo Edition</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed">
            A defensive security platform that protects your websites with behavioral analysis,
            self-healing policies, and full transparency — without compromising privacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/dashboard">
              <Button size="lg" className="gap-2 px-8">
                Go to Dashboard <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline" size="lg" className="px-8">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="bg-card border border-border rounded-lg p-6 hover:border-guardian/30 transition-colors group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-md gradient-guardian flex items-center justify-center mb-4 group-hover:glow-guardian transition-shadow">
                <f.icon className="h-5 w-5 text-guardian" />
              </div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="container pb-24">
        <div className="bg-card border border-border rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold mb-2">Our Commitment</h2>
          <p className="text-muted-foreground mb-8">Defensive-only. Privacy-first. Fully transparent.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            {principles.map((p) => (
              <div key={p.text} className="flex items-center gap-3">
                <p.icon className="h-5 w-5 text-guardian shrink-0" />
                <span className="text-sm">{p.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-guardian" />
            <span>Guardian AI — Cyber Dojo Edition</span>
          </div>
          <p>Defensive security. No surveillance. No data selling.</p>
        </div>
      </footer>
    </div>
  );
}
