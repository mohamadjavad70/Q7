import { useState } from "react";
import { Shield, Activity, BarChart3, Zap, Clock, Route, Settings, BookOpen, Hash, ChevronDown, AlertTriangle, CheckCircle, XCircle, Timer, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RiskFieldChart from "@/components/dashboard/RiskFieldChart";
import TimelineChart from "@/components/dashboard/TimelineChart";
import EventsLog from "@/components/dashboard/EventsLog";
import TopRoutes from "@/components/dashboard/TopRoutes";
import MetricCard from "@/components/dashboard/MetricCard";
import { generateDemoEvents, generateDemoTimeline, generateSelfHealEvents } from "@/lib/demo-data";

export default function Dashboard() {
  const [educationalMode, setEducationalMode] = useState(false);
  const [sensitivity, setSensitivity] = useState([50]);
  const [demoEvents] = useState(generateDemoEvents);
  const [demoTimeline] = useState(generateDemoTimeline);
  const [selfHealEvents] = useState(generateSelfHealEvents);

  const handleSimulate = () => {
    // In production, this would POST to /api/self-heal/{project_id}/simulate
    alert("Simulated attack traffic generated. In production, this sends synthetic events to the gateway API for defensive education.");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="border-b border-border sticky top-0 z-50 bg-background/90 backdrop-blur-sm">
        <div className="container flex items-center justify-between h-14">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-guardian" />
              <span className="font-bold text-sm">Guardian AI</span>
            </Link>
            <span className="text-xs text-muted-foreground">/ Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Demo Project</span>
            <Link to="/policies">
              <Button variant="ghost" size="sm" className="text-xs">Policies</Button>
            </Link>
            <Link to="/integrations">
              <Button variant="ghost" size="sm" className="text-xs">Integrations</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container py-6 space-y-6">
        {/* Controls bar */}
        <div className="flex flex-wrap items-center gap-6 bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-3">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Educational Mode</span>
            <Switch checked={educationalMode} onCheckedChange={setEducationalMode} />
          </div>
          <div className="flex items-center gap-3 min-w-[200px]">
            <Settings className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm whitespace-nowrap">Sensitivity</span>
            <Slider value={sensitivity} onValueChange={setSensitivity} max={100} step={1} className="flex-1" />
            <span className="text-xs font-mono-data text-muted-foreground w-8">{sensitivity[0]}%</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleSimulate} className="gap-2 ml-auto">
            <Bot className="h-4 w-4" /> Simulate Traffic
          </Button>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard label="Rate Score" value="0.32" icon={Activity} status="normal" />
          <MetricCard label="Entropy" value="0.58" icon={BarChart3} status="elevated" />
          <MetricCard label="Anomaly" value="0.12" icon={AlertTriangle} status="normal" />
          <MetricCard label="Reputation" value="0.85" icon={CheckCircle} status="good" />
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Zap className="h-4 w-4 text-guardian" /> Risk Field (Φ over time)
            </h3>
            <RiskFieldChart data={demoTimeline} />
          </div>
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4 text-guardian" /> Attack vs Defense Timeline
            </h3>
            <TimelineChart data={demoTimeline} />
          </div>
        </div>

        {/* Lower panels */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="events">
              <TabsList className="bg-card border border-border">
                <TabsTrigger value="events">Self-Healing Events</TabsTrigger>
                <TabsTrigger value="actions">Actions Log</TabsTrigger>
              </TabsList>
              <TabsContent value="events" className="mt-4">
                <EventsLog events={selfHealEvents} educationalMode={educationalMode} />
              </TabsContent>
              <TabsContent value="actions" className="mt-4">
                <EventsLog events={demoEvents} educationalMode={educationalMode} />
              </TabsContent>
            </Tabs>
          </div>
          <div>
            <TopRoutes />
          </div>
        </div>

        {/* Integrity hash */}
        <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-3">
          <Hash className="h-4 w-4 text-guardian" />
          <span className="text-xs text-muted-foreground">Integrity State Hash:</span>
          <code className="text-xs font-mono-data text-guardian">
            e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
          </code>
        </div>
      </div>
    </div>
  );
}
