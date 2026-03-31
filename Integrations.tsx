import { Shield, Server, Key, Copy, Check, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const nginxConfig = `# Guardian AI Smart Gateway — Nginx reverse proxy
upstream your_app {
  server 127.0.0.1:8000;
}

server {
  listen 80;
  server_name yourdomain.com;

  location / {
    # Forward to Guardian Gateway for inspection
    proxy_pass http://127.0.0.1:9000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}`;

const cloudflareConfig = `# Guardian AI — Cloudflare Worker (telemetry mode)
# Deploy as a Cloudflare Worker to send event summaries
# to your Guardian AI dashboard.

export default {
  async fetch(request, env) {
    const response = await fetch(request);

    // Send telemetry (non-blocking)
    ctx.waitUntil(
      fetch("https://your-guardian-api/api/ingest/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": env.GUARDIAN_API_KEY,
        },
        body: JSON.stringify({
          route: new URL(request.url).pathname,
          method: request.method,
          status: response.status,
          ua_class: classifyUA(request.headers.get("user-agent")),
        }),
      })
    );

    return response;
  },
};`;

const apiEndpoints = [
  { method: "POST", path: "/api/projects", desc: "Create a new protected project" },
  { method: "GET", path: "/api/projects", desc: "List your projects" },
  { method: "POST", path: "/api/projects/{id}/api-keys", desc: "Generate API key for a project" },
  { method: "POST", path: "/api/ingest/events", desc: "Ingest event summaries (requires API key)" },
  { method: "GET", path: "/api/dashboard/summary", desc: "Get dashboard summary metrics" },
  { method: "GET", path: "/api/dashboard/timeline", desc: "Get attack/defense timeline data" },
  { method: "POST", path: "/api/policies/{id}/publish", desc: "Publish new policy version" },
  { method: "POST", path: "/api/policies/{id}/rollback", desc: "Rollback to previous policy" },
  { method: "POST", path: "/api/self-heal/{id}/simulate", desc: "Simulate attack traffic for testing" },
  { method: "GET", path: "/api/integrity/{id}/latest", desc: "Get latest integrity hash" },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Button variant="ghost" size="sm" onClick={handleCopy} className="gap-1 text-xs">
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}

export default function IntegrationsPage() {
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
            <Server className="h-7 w-7 text-guardian" /> Integrations & API
          </h1>
          <p className="text-muted-foreground">
            Deploy the Smart Security Gateway as a reverse-proxy or use telemetry mode with your existing stack.
          </p>
        </div>

        {/* Config snippets */}
        <div>
          <h2 className="text-xl font-bold mb-4">Gateway Setup</h2>
          <Tabs defaultValue="nginx">
            <TabsList className="bg-card border border-border">
              <TabsTrigger value="nginx">Nginx</TabsTrigger>
              <TabsTrigger value="cloudflare">Cloudflare</TabsTrigger>
            </TabsList>
            <TabsContent value="nginx" className="mt-4">
              <div className="bg-card border border-border rounded-lg">
                <div className="flex items-center justify-between px-4 py-2 border-b border-border">
                  <span className="text-xs text-muted-foreground">nginx.conf</span>
                  <CopyButton text={nginxConfig} />
                </div>
                <pre className="p-4 text-xs font-mono-data overflow-x-auto">{nginxConfig}</pre>
              </div>
            </TabsContent>
            <TabsContent value="cloudflare" className="mt-4">
              <div className="bg-card border border-border rounded-lg">
                <div className="flex items-center justify-between px-4 py-2 border-b border-border">
                  <span className="text-xs text-muted-foreground">worker.js</span>
                  <CopyButton text={cloudflareConfig} />
                </div>
                <pre className="p-4 text-xs font-mono-data overflow-x-auto">{cloudflareConfig}</pre>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* API Keys */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            <Key className="h-5 w-5 text-guardian" /> API Keys
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Generate API keys in the Dashboard to authenticate telemetry from your deployed gateway.
            Keys are stored as salted hashes — we never store or display the raw key after creation.
          </p>
          <Link to="/dashboard">
            <Button size="sm">Manage Keys in Dashboard</Button>
          </Link>
        </div>

        {/* API Reference */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-guardian" /> API Reference
          </h2>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left p-3 font-medium">Method</th>
                  <th className="text-left p-3 font-medium">Endpoint</th>
                  <th className="text-left p-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {apiEndpoints.map((ep) => (
                  <tr key={ep.path + ep.method} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="p-3">
                      <span className={`font-mono-data font-semibold ${ep.method === "GET" ? "text-info" : "text-warning"}`}>
                        {ep.method}
                      </span>
                    </td>
                    <td className="p-3 font-mono-data">{ep.path}</td>
                    <td className="p-3 text-muted-foreground">{ep.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
