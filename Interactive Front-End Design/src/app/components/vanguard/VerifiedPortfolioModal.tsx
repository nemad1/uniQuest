import { useMemo, useState } from "react";
import {
  X, Sparkles, CheckCircle2, Briefcase, GraduationCap, MapPin, Download,
  Share2, BadgeCheck, Coins, Trophy, Zap, Copy, Check,
} from "lucide-react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { missions } from "../data";
import { getRank } from "./ranks";

const POINTS = 2450;
const MISSIONS_COMPLETED = 5;

const SKILL_COLORS: Record<string, string> = {
  Design: "#A78BFA",
  Leadership: "#E8C547",
  Marketing: "#FF9F43",
  Technical: "#08E8F0",
  Communication: "#10E6A1",
};

const CERT_SEED = Math.floor(Math.random() * 9000) + 1000;

function certId(missionId: string) {
  const base = parseInt(missionId.replace(/\D/g, "") || "1", 10);
  return `CERT-${CERT_SEED + base * 7}`;
}

// Deterministic AI bullet generation per mission
function generateBullets(mission: any): string[] {
  const skills = mission.skillsDeveloped?.slice(0, 2).join(" and ") || "key skills";
  const cert = mission.certificateProgress || "mission certificate";
  return [
    `Collaborated with ${mission.club} to successfully deliver "${mission.title}", contributing to university-wide engagement goals.`,
    `Demonstrated advanced proficiency in ${skills}, ensuring high-quality outcomes and stakeholder satisfaction throughout the project lifecycle.`,
    `Received the ${cert} in recognition of outstanding contribution, earning ${mission.reward} campus points for verified impact.`,
  ];
}

export function VerifiedPortfolioModal({
  onClose,
  theme = "dark",
}: {
  onClose: () => void;
  theme?: "dark" | "light";
}) {
  const isDark = theme === "dark";
  const rank = getRank(POINTS);
  const completedMissions = useMemo(
    () => missions.filter((m) => m.skillsDeveloped && m.skillsDeveloped.length > 0),
    []
  );
  const [copied, setCopied] = useState(false);

  const radarData = [
    { subject: "Design", A: 120, fullMark: 150 },
    { subject: "Leadership", A: 98, fullMark: 150 },
    { subject: "Marketing", A: 86, fullMark: 150 },
    { subject: "Technical", A: 130, fullMark: 150 },
    { subject: "Communication", A: 110, fullMark: 150 },
  ];

  function handleCopy() {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      style={{ background: "rgba(5,11,31,0.75)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-5xl max-h-[92vh] overflow-hidden flex flex-col rounded-3xl shadow-2xl border transition-colors ${
          isDark ? "bg-[#090F24] border-white/10" : "bg-white border-slate-200"
        }`}
        style={{ animation: "slideUp 0.3s ease-out" }}
      >
        {/* ── Modal Header ─────────────────────────────────────── */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b flex-shrink-0 ${
            isDark ? "border-white/10" : "border-slate-100"
          }`}
          style={{
            background: isDark
              ? "linear-gradient(90deg, rgba(11,61,145,0.4) 0%, rgba(9,15,36,0) 100%)"
              : undefined,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className={`size-10 rounded-xl flex items-center justify-center border ${
                isDark ? "bg-[#E8C547]/10 border-[#E8C547]/30" : "bg-blue-50 border-blue-200"
              }`}
            >
              <Briefcase className={`size-5 ${isDark ? "text-[#E8C547]" : "text-blue-700"}`} />
            </div>
            <div>
              <h2
                className={`font-bold text-lg ${isDark ? "text-white" : "text-slate-900"}`}
              >
                Verified Impact Portfolio
              </h2>
              <p className={`text-xs ${isDark ? "text-white/50" : "text-slate-500"}`}>
                Cryptographically verified academic &amp; co-curricular achievements
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`size-9 flex items-center justify-center rounded-full transition-colors ${
              isDark ? "hover:bg-white/10" : "hover:bg-slate-100"
            }`}
          >
            <X className={`size-5 ${isDark ? "text-white/70" : "text-slate-500"}`} />
          </button>
        </div>

        {/* ── Scrollable body ──────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid lg:grid-cols-[280px_1fr] min-h-full">
            {/* ── Left Sidebar ─────────────────────────────────── */}
            <aside
              className={`flex flex-col gap-5 p-6 border-r ${
                isDark ? "border-white/10 bg-white/[0.015]" : "border-slate-100 bg-slate-50"
              }`}
            >
              {/* Profile card */}
              <div
                className={`p-5 rounded-2xl border flex flex-col items-center text-center ${
                  isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-slate-200 shadow-sm"
                }`}
              >
                <div
                  className={`size-20 rounded-full border-4 flex items-center justify-center text-2xl font-bold mb-3 ${
                    isDark
                      ? "bg-gradient-to-br from-[#0B3D91] to-[#0A2E6E] border-white/10 text-white"
                      : "bg-gradient-to-br from-blue-800 to-blue-600 border-white text-white shadow-lg"
                  }`}
                >
                  HM
                </div>
                <h3 className={`font-bold text-xl ${isDark ? "text-white" : "text-slate-900"}`}>
                  Haitham Mansour
                </h3>
                <div
                  className={`mt-2 flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${
                    isDark
                      ? "bg-[#10E6A1]/10 text-[#10E6A1] border-[#10E6A1]/20"
                      : "bg-emerald-50 text-emerald-700 border-emerald-200"
                  }`}
                >
                  <CheckCircle2 className="size-3.5" /> Identity Verified
                </div>

                <div
                  className={`mt-4 w-full pt-4 border-t space-y-2 text-sm ${
                    isDark ? "border-white/10 text-white/70" : "border-slate-200 text-slate-600"
                  }`}
                >
                  <div className="flex items-center gap-2 justify-center">
                    <GraduationCap className="size-4" />
                    Computer Science, Junior
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <MapPin className="size-4" />
                    Northbridge University
                  </div>
                </div>
              </div>

              {/* Impact summary stats */}
              <div
                className={`p-4 rounded-2xl border ${
                  isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-slate-200 shadow-sm"
                }`}
              >
                <div
                  className={`text-[9px] uppercase tracking-[0.25em] font-bold mb-3 ${
                    isDark ? "text-white/40" : "text-slate-400"
                  }`}
                >
                  Impact Summary
                </div>
                <div className="space-y-3">
                  {[
                    { Icon: Coins, label: "Total Points", value: POINTS.toLocaleString(), color: "#E8C547" },
                    { Icon: Trophy, label: "Vanguard Rank", value: rank.label, color: rank.color },
                    { Icon: Zap, label: "Missions Completed", value: String(MISSIONS_COMPLETED), color: "#10E6A1" },
                  ].map(({ Icon, label, value, color }) => (
                    <div key={label} className="flex items-center gap-2.5">
                      <div
                        className="size-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${color}18`, border: `1px solid ${color}40` }}
                      >
                        <Icon className="size-4" style={{ color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className={`text-[10px] font-bold ${isDark ? "text-white/40" : "text-slate-400"}`}
                        >
                          {label}
                        </div>
                        <div
                          className="text-sm font-bold tabular-nums"
                          style={{ color: isDark ? color : "#002147" }}
                        >
                          {value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* QR Code placeholder */}
              <div
                className={`p-5 rounded-2xl border flex flex-col items-center text-center ${
                  isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-slate-200 shadow-sm"
                }`}
              >
                {/* Decorative QR grid pattern */}
                <div
                  className={`size-32 rounded-xl overflow-hidden mb-3 relative border-2 ${
                    isDark ? "border-white/15" : "border-slate-200"
                  }`}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: isDark
                        ? `repeating-linear-gradient(0deg, rgba(232,197,71,0.12) 0px, rgba(232,197,71,0.12) 4px, transparent 4px, transparent 10px),
                           repeating-linear-gradient(90deg, rgba(232,197,71,0.12) 0px, rgba(232,197,71,0.12) 4px, transparent 4px, transparent 10px)`
                        : `repeating-linear-gradient(0deg, rgba(0,33,71,0.1) 0px, rgba(0,33,71,0.1) 4px, transparent 4px, transparent 10px),
                           repeating-linear-gradient(90deg, rgba(0,33,71,0.1) 0px, rgba(0,33,71,0.1) 4px, transparent 4px, transparent 10px)`,
                    }}
                  />
                  {/* Corner squares */}
                  {[
                    "top-2 left-2",
                    "top-2 right-2",
                    "bottom-2 left-2",
                    "bottom-2 right-2",
                  ].map((pos, i) => (
                    <div
                      key={i}
                      className={`absolute size-7 rounded-sm ${pos}`}
                      style={{
                        background: isDark ? "rgba(232,197,71,0.25)" : "rgba(0,33,71,0.15)",
                        border: isDark ? "2px solid rgba(232,197,71,0.5)" : "2px solid rgba(0,33,71,0.3)",
                      }}
                    >
                      <div
                        className="absolute size-3 top-0.5 left-0.5 rounded-sm"
                        style={{
                          background: isDark ? "rgba(232,197,71,0.6)" : "rgba(0,33,71,0.4)",
                        }}
                      />
                    </div>
                  ))}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div
                      className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                        isDark ? "bg-[#090F24]/80 text-[#E8C547]" : "bg-white/80 text-[#002147]"
                      }`}
                    >
                      NB-VIP
                    </div>
                  </div>
                </div>
                <div className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  Scan to Verify
                </div>
                <div className={`text-xs mt-1 leading-relaxed ${isDark ? "text-white/50" : "text-slate-500"}`}>
                  Employers can scan to view your cryptographically proven portfolio.
                </div>
                <div
                  className={`mt-2 text-[10px] font-bold tabular-nums px-2 py-1 rounded-lg ${
                    isDark ? "bg-white/5 text-white/40" : "bg-slate-100 text-slate-400"
                  }`}
                >
                  ID: NBU-{CERT_SEED}-HM
                </div>
              </div>
            </aside>

            {/* ── Main content ─────────────────────────────────── */}
            <main className="p-6 space-y-8">
              {/* Skill Growth Section */}
              <section>
                <div
                  className={`text-[10px] uppercase tracking-[0.25em] font-bold mb-1 ${
                    isDark ? "text-white/40" : "text-slate-400"
                  }`}
                >
                  Section 2 · Skill Growth
                </div>
                <h3
                  className={`font-bold text-lg mb-4 ${isDark ? "text-white" : "text-slate-900"}`}
                >
                  Skill Radar
                </h3>
                <div
                  className={`p-6 rounded-2xl border ${
                    isDark ? "bg-white/[0.02] border-white/10" : "bg-white border-slate-200 shadow-sm"
                  }`}
                >
                  <div className="grid sm:grid-cols-[1fr_auto] gap-4 items-center">
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                          <PolarGrid
                            stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}
                          />
                          <PolarAngleAxis
                            dataKey="subject"
                            tick={{
                              fill: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
                              fontSize: 12,
                              fontWeight: 700,
                            }}
                          />
                          <PolarRadiusAxis
                            angle={30}
                            domain={[0, 150]}
                            tick={false}
                            axisLine={false}
                          />
                          <Radar
                            name="Skills"
                            dataKey="A"
                            stroke="#E8C547"
                            fill="#E8C547"
                            fillOpacity={isDark ? 0.35 : 0.55}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                    {/* Skill score table */}
                    <div className="space-y-2 min-w-[140px]">
                      {radarData.map((d) => {
                        const color = SKILL_COLORS[d.subject] || "#E8C547";
                        const pct = Math.round((d.A / d.fullMark) * 100);
                        return (
                          <div key={d.subject} className="flex items-center gap-2">
                            <span
                              className="size-2 rounded-full flex-shrink-0"
                              style={{ background: color }}
                            />
                            <span
                              className={`text-xs font-bold flex-1 ${
                                isDark ? "text-white/70" : "text-slate-600"
                              }`}
                            >
                              {d.subject}
                            </span>
                            <span
                              className="text-xs font-bold tabular-nums"
                              style={{ color }}
                            >
                              {pct}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>

              {/* Verified Work Section */}
              <section>
                <div
                  className={`text-[10px] uppercase tracking-[0.25em] font-bold mb-1 ${
                    isDark ? "text-white/40" : "text-slate-400"
                  }`}
                >
                  Section 3 · Verified Work
                </div>
                <h3
                  className={`font-bold text-lg mb-4 ${isDark ? "text-white" : "text-slate-900"}`}
                >
                  Completed Missions
                </h3>
                <div className="space-y-4">
                  {completedMissions.map((mission) => (
                    <MissionPortfolioItem
                      key={mission.id}
                      mission={mission}
                      isDark={isDark}
                      certId={certId(mission.id)}
                    />
                  ))}
                  {completedMissions.length === 0 && (
                    <div
                      className={`p-10 text-center rounded-2xl border ${
                        isDark
                          ? "bg-white/[0.02] border-white/10 text-white/50"
                          : "bg-slate-50 border-slate-200 text-slate-500"
                      }`}
                    >
                      Complete missions with skill tags to build your portfolio.
                    </div>
                  )}
                </div>
              </section>
            </main>
          </div>
        </div>

        {/* ── Footer actions ───────────────────────────────────── */}
        <div
          className={`flex items-center justify-between gap-3 px-6 py-4 border-t flex-shrink-0 flex-wrap ${
            isDark ? "border-white/10 bg-white/[0.015]" : "border-slate-100 bg-slate-50"
          }`}
        >
          <div className={`text-xs font-medium ${isDark ? "text-white/40" : "text-slate-400"}`}>
            Verified by Northbridge University Student Affairs · {new Date().getFullYear()}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                isDark
                  ? "bg-white/[0.04] border-white/10 text-white/70 hover:border-white/30 hover:text-white"
                  : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              {copied ? (
                <><Check className="size-3.5 text-[#10E6A1]" /> Copied!</>
              ) : (
                <><Copy className="size-3.5" /> Share Portfolio Link</>
              )}
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                isDark
                  ? "bg-[#E8C547] text-[#0A1530] hover:bg-[#F5DD7A]"
                  : "bg-[#0B3D91] text-white hover:bg-[#0A2E6E]"
              }`}
            >
              <Download className="size-3.5" />
              Download Portfolio PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MissionPortfolioItem({
  mission,
  isDark,
  certId: certIdProp,
}: {
  mission: any;
  isDark: boolean;
  certId: string;
}) {
  const [generating, setGenerating] = useState(false);
  const [bullets, setBullets] = useState<string[]>([]);

  function handleGenerate() {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setBullets(generateBullets(mission));
    }, 1400);
  }

  return (
    <div
      className={`rounded-2xl border transition-all ${
        isDark
          ? "bg-white/[0.02] border-white/10 hover:border-white/20"
          : "bg-white border-slate-200 shadow-sm hover:shadow-md"
      }`}
    >
      {/* Mission header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          {/* Left: title + club */}
          <div className="flex-1 min-w-0">
            <h4
              className={`font-bold text-base leading-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              {mission.title}
            </h4>
            <div className={`text-xs mt-0.5 ${isDark ? "text-white/60" : "text-slate-500"}`}>
              Verified by{" "}
              <span className="font-semibold">{mission.club}</span>
            </div>

            {/* Skill tags */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {mission.skillsDeveloped?.map((s: string) => (
                <span
                  key={s}
                  className="text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wide"
                  style={{
                    background: `${SKILL_COLORS[s] || "#E8C547"}18`,
                    color: SKILL_COLORS[s] || "#E8C547",
                    borderColor: `${SKILL_COLORS[s] || "#E8C547"}40`,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Right: points + cert badge */}
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            {/* Points earned */}
            <div
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border ${
                isDark
                  ? "bg-[#E8C547]/10 text-[#E8C547] border-[#E8C547]/20"
                  : "bg-amber-50 text-amber-700 border-amber-200"
              }`}
            >
              <Coins className="size-3.5" />
              +{mission.reward} pts
            </div>

            {/* Certificate badge */}
            {mission.certificateProgress && (
              <div
                className={`flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1.5 rounded-xl border ${
                  isDark
                    ? "bg-[#10E6A1]/8 text-[#10E6A1] border-[#10E6A1]/20"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                }`}
              >
                <BadgeCheck className="size-3.5" />
                {mission.certificateProgress}
              </div>
            )}

            {/* Cert ID */}
            <div
              className={`text-[10px] font-bold tabular-nums px-2 py-1 rounded-lg ${
                isDark ? "bg-white/5 text-white/35" : "bg-slate-100 text-slate-400"
              }`}
            >
              #{certIdProp}
            </div>
          </div>
        </div>
      </div>

      {/* AI Bullets section */}
      <div
        className={`px-5 pb-5 pt-0 border-t ${isDark ? "border-white/8" : "border-slate-100"}`}
        style={{ marginTop: 0 }}
      >
        <div className="pt-4">
          {bullets.length > 0 ? (
            <div className="space-y-2">
              <div
                className={`text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5 ${
                  isDark ? "text-[#E8C547]/70" : "text-amber-600"
                }`}
              >
                <Sparkles className="size-3" /> AI-Generated Resume Bullet Points
              </div>
              <ul className="space-y-2">
                {bullets.map((b, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span
                      className={`mt-1.5 size-1.5 rounded-full flex-shrink-0 ${
                        isDark ? "bg-[#E8C547]" : "bg-amber-500"
                      }`}
                    />
                    <span
                      className={`text-sm leading-relaxed ${
                        isDark ? "text-white/80" : "text-slate-700"
                      }`}
                    >
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <button
              onClick={handleGenerate}
              disabled={generating}
              className={`flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl border transition-all ${
                generating ? "opacity-60 cursor-wait" : "hover:scale-[1.02]"
              } ${
                isDark
                  ? "bg-[#E8C547]/10 border-[#E8C547]/20 text-[#E8C547] hover:bg-[#E8C547]/20"
                  : "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
              }`}
            >
              <Sparkles className={`size-4 ${generating ? "animate-spin" : ""}`} />
              {generating ? "Generating..." : "Generate Resume Bullet Points"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
