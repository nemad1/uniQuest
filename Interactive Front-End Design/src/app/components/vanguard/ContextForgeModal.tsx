import { useMemo, useState } from "react";
import {
  X, Copy, Check, Terminal, Sparkles, Download, Cpu, FileJson,
  ChevronRight, BookOpen, Layers, Code2, Zap, BadgeCheck,
} from "lucide-react";
import { missions } from "../data";
import { getRank } from "./ranks";

const POINTS = 2450;

const SKILL_COLORS: Record<string, string> = {
  Design: "#A78BFA",
  Leadership: "#E8C547",
  Marketing: "#FF9F43",
  Technical: "#08E8F0",
  Communication: "#10E6A1",
};

interface ContextForgeProps {
  studentData: {
    name: string;
    major: string;
    year: string;
    rank: string;
    points: number;
    skills: string[];
    missions: any[];
    certs: any[];
  };
  onClose: () => void;
  theme: "dark" | "light";
}

type ForgeTab = "prompt" | "json" | "connect";

export function ContextForgeModal({ studentData, onClose, theme }: ContextForgeProps) {
  const isDark = theme === "dark";
  const [tab, setTab] = useState<ForgeTab>("prompt");
  const [copied, setCopied] = useState(false);

  const rank = getRank(POINTS);

  // Derive enriched data from real mission records
  const completedMissions = useMemo(
    () => missions.filter((m) => m.skillsDeveloped && m.skillsDeveloped.length > 0),
    []
  );

  // Aggregate all unique skills across missions
  const allSkills = useMemo(() => {
    const set = new Set<string>();
    completedMissions.forEach((m) => m.skillsDeveloped?.forEach((s: string) => set.add(s)));
    return Array.from(set);
  }, [completedMissions]);

  // Skill score map (simulated proficiency %)
  const skillScores: Record<string, number> = {
    Design: 80, Leadership: 65, Marketing: 57, Technical: 87, Communication: 73,
  };

  // Unique certs
  const earnedCerts = useMemo(() => {
    const seen = new Set<string>();
    const result: { name: string; club: string }[] = [];
    completedMissions.forEach((m) => {
      if (m.certificateProgress && !seen.has(m.certificateProgress)) {
        seen.add(m.certificateProgress);
        result.push({ name: m.certificateProgress, club: m.club });
      }
    });
    return result;
  }, [completedMissions]);

  const CERT_ID = useMemo(() => `DWT-CTX-2026-${Math.floor(Math.random() * 900000) + 100000}`, []);

  // ── Prompt output ──────────────────────────────────────────────
  const mcpPrompt = `# VERIFIED STUDENT PERFORMANCE CONTEXT
# Source: Downtown Hub — Northbridge University Vanguard System
# Verification ID: ${CERT_ID}

## ── IDENTITY & STATUS ─────────────────────────────────────────
- **Full Name**: ${studentData.name}
- **Academic Path**: ${studentData.major} · ${studentData.year}
- **Institution**: Northbridge University
- **Vanguard Rank**: ${rank.label} (${POINTS.toLocaleString()} Campus Points)
- **Campus Standing**: #8 on university leaderboard

## ── VERIFIED SKILL PROFILE ────────────────────────────────────
${allSkills.map((s) => `- **${s}**: ${skillScores[s] ?? 70}% proficiency (earned through verified missions)`).join("\n")}
- **Technical Stack**: ${studentData.skills.join(", ")}

## ── MISSION HISTORY (Verified Achievements) ──────────────────
${completedMissions.map((m, i) => `${i + 1}. **${m.title}**
   - Club/Issuer: ${m.club}
   - Skills Applied: ${m.skillsDeveloped?.join(", ") ?? "N/A"}
   - Points Earned: +${m.reward} campus pts
   - Certificate: ${m.certificateProgress ?? "None"}
   - Difficulty: ${m.difficulty ?? "Standard"}`).join("\n\n")}

## ── VERIFIED CREDENTIALS ──────────────────────────────────────
${earnedCerts.map((c) => `- **${c.name}** — Issued by ${c.club} · Northbridge University`).join("\n")}

## ── AI INSTRUCTIONS ───────────────────────────────────────────
You are an expert AI Career Architect. Using ONLY the verified data above, generate:

1. **Resume Bullet Points** (STAR method per mission):
   For each mission, write 2–3 bullet points using:
   Situation → Task → Action → Result format.
   Use strong action verbs. Quantify impact where possible.

2. **LinkedIn Headline & About Section**:
   Craft a compelling 1-line headline and a 3-paragraph About section
   that highlights the student's verified campus impact.

3. **Skill Gap Analysis**:
   Compare the student's current skill profile against top graduate
   expectations in ${studentData.major}. Suggest 3–5 specific campus
   missions they should take next to close the gap.

4. **Cover Letter Draft**:
   Write a 3-paragraph cover letter template for a ${studentData.major}
   internship, referencing specific verified achievements above.

*Begin with the Resume Bullet Points section.*`;

  // ── JSON payload ───────────────────────────────────────────────
  const jsonPayload = JSON.stringify(
    {
      schema: "downtown-vanguard-context/v2",
      verificationId: CERT_ID,
      student: {
        name: studentData.name,
        major: studentData.major,
        year: studentData.year,
        institution: "Northbridge University",
        rank: rank.label,
        campusPoints: POINTS,
        leaderboardPosition: 8,
      },
      skills: allSkills.map((s) => ({
        name: s,
        proficiency: skillScores[s] ?? 70,
        color: SKILL_COLORS[s],
      })),
      technicalStack: studentData.skills,
      missions: completedMissions.map((m) => ({
        id: m.id,
        title: m.title,
        club: m.club,
        skillsDeveloped: m.skillsDeveloped,
        pointsEarned: m.reward,
        certificate: m.certificateProgress,
        difficulty: m.difficulty,
        verified: m.verified,
      })),
      certificates: earnedCerts,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );

  function getActiveContent() {
    return tab === "json" ? jsonPayload : mcpPrompt;
  }

  function handleCopy() {
    navigator.clipboard.writeText(getActiveContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    const ext = tab === "json" ? "json" : "md";
    const blob = new Blob([getActiveContent()], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vanguard-context-${studentData.name.toLowerCase().replace(/\s+/g, "-")}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const tabs: { v: ForgeTab; l: string; Icon: any }[] = [
    { v: "prompt", l: "AI Prompt", Icon: Terminal },
    { v: "json", l: "JSON Schema", Icon: FileJson },
    { v: "connect", l: "Connect to AI", Icon: Cpu },
  ];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ background: "rgba(5,11,31,0.85)", backdropFilter: "blur(16px)" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-2xl rounded-3xl border overflow-hidden shadow-2xl transition-all ${
          isDark ? "bg-[#090F24] border-white/10" : "bg-white border-[#002147]/15"
        }`}
        style={{ animation: "popIn 0.3s ease-out" }}
      >
        {/* ── Header ───────────────────────────────────────── */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${
            isDark ? "border-white/10" : "border-[#002147]/10"
          }`}
          style={{
            background: isDark
              ? "linear-gradient(90deg, rgba(11,61,145,0.35) 0%, transparent 100%)"
              : undefined,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className={`size-10 rounded-xl flex items-center justify-center border ${
                isDark
                  ? "bg-[#E8C547]/10 border-[#E8C547]/30 text-[#E8C547]"
                  : "bg-[#002147]/5 border-[#002147]/15 text-[#002147]"
              }`}
            >
              <Cpu className="size-5" />
            </div>
            <div>
              <h3 className={`font-bold ${isDark ? "text-white" : "text-[#002147]"}`}>
                Context Forge{" "}
                <span className="text-[9px] ml-1 px-1.5 py-0.5 rounded-full bg-[#E8C547]/20 text-[#E8C547] border border-[#E8C547]/30 font-bold tracking-wide">
                  BETA
                </span>
              </h3>
              <p className={`text-xs ${isDark ? "text-white/50" : "text-[#002147]/50"}`}>
                MCP-compatible AI context from your verified portfolio
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`size-8 rounded-full flex items-center justify-center transition ${
              isDark ? "hover:bg-white/8 text-white/40" : "hover:bg-[#002147]/5 text-[#002147]/40"
            }`}
          >
            <X className="size-4" />
          </button>
        </div>

        {/* ── Tab bar ──────────────────────────────────────── */}
        <div className={`flex gap-1 px-6 pt-4 pb-0 ${isDark ? "" : ""}`}>
          {tabs.map(({ v, l, Icon }) => (
            <button
              key={v}
              onClick={() => setTab(v)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border-b-2 ${
                tab === v
                  ? isDark
                    ? "text-[#E8C547] border-[#E8C547]"
                    : "text-[#002147] border-[#002147]"
                  : isDark
                  ? "text-white/40 border-transparent hover:text-white/70"
                  : "text-[#002147]/40 border-transparent hover:text-[#002147]/70"
              }`}
            >
              <Icon className="size-3.5" />
              {l}
            </button>
          ))}
        </div>

        {/* ── Content ──────────────────────────────────────── */}
        <div className="p-6 space-y-4">
          {/* Prompt / JSON panels */}
          {tab !== "connect" && (
            <>
              <div
                className={`rounded-2xl border overflow-hidden ${
                  isDark ? "bg-[#050B1F] border-white/10" : "bg-[#F8F9FA] border-[#002147]/10"
                }`}
              >
                {/* Panel toolbar */}
                <div
                  className={`flex items-center justify-between px-4 py-2.5 border-b ${
                    isDark ? "border-white/8" : "border-[#002147]/8"
                  }`}
                >
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold" style={{ color: "#E8C547" }}>
                    <Terminal className="size-3" />
                    {tab === "json" ? "JSON Schema Output" : "System Prompt Output"}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleDownload}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                        isDark
                          ? "bg-white/5 hover:bg-white/10 text-white/60"
                          : "bg-white border border-[#002147]/10 hover:bg-[#F1F4F9] text-[#002147]/60"
                      }`}
                    >
                      <Download className="size-3" />
                      {tab === "json" ? ".json" : ".md"}
                    </button>
                    <button
                      onClick={handleCopy}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                        copied
                          ? "bg-[#10E6A1] text-[#0A1530]"
                          : isDark
                          ? "bg-white/5 hover:bg-white/10 text-white/70"
                          : "bg-white border border-[#002147]/10 hover:bg-[#F1F4F9] text-[#002147]/70"
                      }`}
                    >
                      {copied ? (
                        <><Check className="size-3" /> Copied!</>
                      ) : (
                        <><Copy className="size-3" /> Copy</>
                      )}
                    </button>
                  </div>
                </div>

                {/* Prompt text */}
                <pre
                  className={`text-[11px] leading-relaxed overflow-y-auto max-h-[280px] whitespace-pre-wrap p-4 ${
                    isDark ? "text-white/75" : "text-[#002147]/75"
                  }`}
                  style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace" }}
                >
                  {tab === "json" ? jsonPayload : mcpPrompt}
                </pre>
              </div>

              {/* Skills included */}
              <div className={`rounded-xl border p-3.5 ${isDark ? "bg-white/[0.02] border-white/8" : "bg-slate-50 border-slate-200"}`}>
                <div className={`text-[9px] uppercase tracking-[0.2em] font-bold mb-2 ${isDark ? "text-white/40" : "text-slate-400"}`}>
                  Skills included in context
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {allSkills.map((s) => {
                    const color = SKILL_COLORS[s] || "#E8C547";
                    return (
                      <span
                        key={s}
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wide"
                        style={{
                          background: `${color}18`,
                          color,
                          borderColor: `${color}40`,
                        }}
                      >
                        {s} · {skillScores[s] ?? 70}%
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Tip banner */}
              <div
                className={`p-3.5 rounded-xl flex items-start gap-3 ${
                  isDark
                    ? "bg-[#10E6A1]/5 border border-[#10E6A1]/20"
                    : "bg-emerald-50 border border-emerald-200"
                }`}
              >
                <Sparkles className={`size-4 mt-0.5 shrink-0 ${isDark ? "text-[#10E6A1]" : "text-emerald-600"}`} />
                <p className={`text-[11px] leading-relaxed ${isDark ? "text-[#10E6A1]/90" : "text-emerald-700"}`}>
                  Paste the <strong>AI Prompt</strong> directly into Claude, ChatGPT, or Gemini to generate a tailored resume, LinkedIn profile, and skill gap analysis — all grounded in your verified campus achievements.
                </p>
              </div>
            </>
          )}

          {/* Connect to AI panel */}
          {tab === "connect" && (
            <div className="space-y-3">
              <p className={`text-sm ${isDark ? "text-white/60" : "text-slate-500"}`}>
                Connect your verified Vanguard context to these AI tools:
              </p>

              {[
                {
                  name: "Claude (Anthropic)",
                  desc: "Paste the prompt into claude.ai for STAR-method resume generation.",
                  color: "#E8A87C",
                  Icon: Sparkles,
                  action: "Open Claude →",
                },
                {
                  name: "ChatGPT (OpenAI)",
                  desc: "Use the JSON schema as a custom GPT knowledge source.",
                  color: "#10E6A1",
                  Icon: Zap,
                  action: "Open ChatGPT →",
                },
                {
                  name: "MCP Server Integration",
                  desc: "Add this schema to your local MCP config for real-time context injection.",
                  color: "#08E8F0",
                  Icon: Code2,
                  action: "View Docs →",
                },
                {
                  name: "LinkedIn AI Writer",
                  desc: "Export as structured context for LinkedIn's AI profile writer.",
                  color: "#A78BFA",
                  Icon: BookOpen,
                  action: "Open LinkedIn →",
                },
              ].map((tool) => (
                <div
                  key={tool.name}
                  className={`flex items-center gap-4 p-4 rounded-2xl border transition hover:scale-[1.01] cursor-pointer ${
                    isDark ? "bg-white/[0.02] border-white/10 hover:border-white/20" : "bg-white border-slate-200 hover:shadow-md"
                  }`}
                >
                  <div
                    className="size-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${tool.color}18`, border: `1px solid ${tool.color}40` }}
                  >
                    <tool.Icon className="size-5" style={{ color: tool.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                      {tool.name}
                    </div>
                    <div className={`text-xs mt-0.5 ${isDark ? "text-white/50" : "text-slate-500"}`}>
                      {tool.desc}
                    </div>
                  </div>
                  <span className="text-xs font-bold flex items-center gap-1" style={{ color: tool.color }}>
                    {tool.action} <ChevronRight className="size-3" />
                  </span>
                </div>
              ))}

              {/* MCP config snippet */}
              <div
                className={`mt-2 rounded-xl border overflow-hidden ${
                  isDark ? "bg-[#050B1F] border-white/10" : "bg-slate-900 border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#E8C547]">
                    MCP Config Snippet
                  </span>
                  <div className="flex gap-1">
                    {["#FF5F57", "#FFBD2E", "#28CA41"].map((c) => (
                      <span key={c} className="size-3 rounded-full" style={{ background: c }} />
                    ))}
                  </div>
                </div>
                <pre className="text-[11px] p-4 text-emerald-400 overflow-x-auto" style={{ fontFamily: "monospace" }}>
{`{
  "mcpServers": {
    "downtown-vanguard": {
      "command": "npx",
      "args": ["-y", "@downtown/mcp-server"],
      "env": {
        "STUDENT_ID": "NBU-HM-2026",
        "CONTEXT_ID": "${CERT_ID}"
      }
    }
  }
}`}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* ── Footer ───────────────────────────────────────── */}
        <div
          className={`px-6 py-3 border-t flex items-center justify-between ${
            isDark ? "border-white/8 bg-white/[0.01]" : "border-slate-100 bg-slate-50"
          }`}
        >
          <div className={`flex items-center gap-2 text-[10px] font-bold ${isDark ? "text-white/30" : "text-slate-400"}`}>
            <BadgeCheck className="size-3.5 text-[#10E6A1]" />
            Verified ID: {CERT_ID}
          </div>
          <div className={`flex items-center gap-1.5 text-[10px] font-bold ${isDark ? "text-white/30" : "text-slate-400"}`}>
            <Layers className="size-3" />
            {completedMissions.length} missions · {allSkills.length} skills · {earnedCerts.length} certs
          </div>
        </div>
      </div>
    </div>
  );
}
