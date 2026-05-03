import { useState } from "react";
import { Palette, Code2, AlertTriangle, ShieldCheck, FileCode } from "lucide-react";

export function ModeToggle() {
  const [mode, setMode] = useState<"design" | "dev">("design");
  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-slate-900 text-sm">MCP Workspace Mode</div>
          <div className="text-xs text-slate-500">Steered by /root/.steering-rules</div>
        </div>
        <div className="flex p-0.5 rounded-lg bg-slate-100">
          <button
            onClick={() => setMode("design")}
            className={`text-xs px-3 py-1.5 rounded-md flex items-center gap-1.5 transition ${mode === "design" ? "bg-white shadow-sm text-[#0B3D91]" : "text-slate-500"}`}
          >
            <Palette className="size-3.5" /> Design
          </button>
          <button
            onClick={() => setMode("dev")}
            className={`text-xs px-3 py-1.5 rounded-md flex items-center gap-1.5 transition ${mode === "dev" ? "bg-white shadow-sm text-[#0B3D91]" : "text-slate-500"}`}
          >
            <Code2 className="size-3.5" /> Developer
          </button>
        </div>
      </div>

      {mode === "design" ? (
        <div className="space-y-2">
          <Bridge label="Figma Bridge" status="Synced" tone="ok" />
          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200/80 text-xs text-[#0B3D91] flex items-start gap-2">
            <FileCode className="size-3.5 mt-0.5 shrink-0" />
            <span>Detected change on layer <code className="px-1 rounded bg-white">btn_primary_mission</code> — radius 8 → 12. Apply to CSS?</span>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 text-xs py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50">Dismiss</button>
            <button className="flex-1 text-xs py-1.5 rounded-lg bg-[#0B3D91] text-white">Apply update</button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <Bridge label="Spring 4 compliance" status="Active" tone="ok" />
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start gap-2">
            <AlertTriangle className="size-3.5 mt-0.5 shrink-0" />
            <span><b>Violation:</b> External library (axios) detected. Reverting to Spring 4–compliant <code className="px-1 rounded bg-white">RestTemplate</code>.</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
            <ShieldCheck className="size-3.5 mt-0.5 text-emerald-600 shrink-0" />
            <span>EscrowService bean wired for all student-deposit transactions per workspace rule #2.</span>
          </div>
        </div>
      )}
    </div>
  );
}

function Bridge({ label, status, tone }: { label: string; status: string; tone: "ok" | "warn" }) {
  return (
    <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-50">
      <span className="text-slate-700">{label}</span>
      <span className={`flex items-center gap-1 ${tone === "ok" ? "text-emerald-600" : "text-amber-700"}`}>
        <span className={`size-1.5 rounded-full ${tone === "ok" ? "bg-emerald-500" : "bg-amber-500"} animate-pulse`} />
        {status}
      </span>
    </div>
  );
}
