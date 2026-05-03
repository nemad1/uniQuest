import { useEffect, useState } from "react";
import { BadgeCheck, Sparkles, Crown, Lock, Award, Trophy, ChevronRight, Coins, Zap, BookOpen, MapPin, Flame, Briefcase } from "lucide-react";
import { RANKS, getRank, getNextRank, type RankKey } from "./ranks";
import { missions } from "../data";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

const POINTS = 2450;
const WEEK_GAIN = 320;

export function VanguardDashboard({ theme = "dark", onOpenMissions, onOpenLeaderboard, onOpenCerts, onOpenPortfolio }: {
  theme?: "dark" | "light";
  onOpenMissions: () => void;
  onOpenLeaderboard: () => void;
  onOpenCerts: () => void;
  onOpenPortfolio: () => void;
}) {
  const isDark = theme === "dark";
  return (
    <div className="space-y-6 animate-slideUp">
      <StatusHeader isDark={isDark} />

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5">
        <PointsCard isDark={isDark} />
        <LeaderboardPreview isDark={isDark} onOpen={onOpenLeaderboard} />
      </div>

      <RankLadder isDark={isDark} />

      <ImpactPortfolioSection isDark={isDark} onOpenPortfolio={onOpenPortfolio} />

      <div className="grid lg:grid-cols-1 gap-5">
        <RecentActivity isDark={isDark} />
      </div>

      <CertificateVault isDark={isDark} onOpen={onOpenCerts} />
    </div>
  );
}

function StatusHeader({ isDark }: { isDark: boolean }) {
  const rank = getRank(POINTS);
  return (
    <div className={`relative overflow-hidden rounded-3xl border transition-all duration-500 ${isDark ? "border-white/10" : "border-[#002147]/10 shadow-lg"} backdrop-blur-xl p-6`}
      style={{ background: isDark ? "linear-gradient(135deg, rgba(11,61,145,0.5) 0%, rgba(232,197,71,0.12) 60%, rgba(5,11,31,0.7) 100%)" : "linear-gradient(135deg, #FFFFFF 0%, #F1F4F9 100%)" }}>
      <div className={`absolute -top-20 -right-20 size-72 rounded-full blur-3xl transition-opacity duration-1000 ${isDark ? "opacity-40" : "opacity-10"}`} style={{ background: rank.color }} />
      <div className={`absolute -bottom-24 -left-10 size-72 rounded-full blur-3xl transition-opacity duration-1000 ${isDark ? "opacity-25" : "opacity-5"}`} style={{ background: "#0B3D91" }} />

      <div className="relative flex items-start gap-5 flex-wrap">
        <div className="relative">
          <div className={`size-20 rounded-2xl bg-gradient-to-br ${isDark ? "from-[#0B3D91] to-[#0A2E6E] border-[#E8C547]/40 shadow-[0_0_30px_rgba(232,197,71,0.3)]" : "from-[#002147] to-[#003366] border-[#002147]/20 shadow-lg"} border flex items-center justify-center text-2xl text-white font-bold`}>
            HM
          </div>
          <RankBadge rank={rank.key} className="absolute -bottom-2 -right-2" />
        </div>

        <div className="flex-1 min-w-[220px]">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className={`font-bold ${isDark ? "text-white" : "text-[#002147]"}`} style={{ fontSize: 26 }}>Haitham Mansour</h2>
            <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-bold ${isDark ? "bg-[#08E8F0]/10 text-[#08E8F0] border-[#08E8F0]/30" : "bg-[#002147]/5 text-[#002147] border-[#002147]/10"} border text-[10px] uppercase tracking-wider`}>
              <BadgeCheck className="size-3" /> Verified Student
            </span>
          </div>
          <div className={`mt-1 font-medium ${isDark ? "text-white/60" : "text-[#002147]/60"} text-sm flex items-center gap-3 flex-wrap`}>
            <span className="flex items-center gap-1"><BookOpen className="size-3.5" /> CS · Junior</span>
            <span className="flex items-center gap-1"><MapPin className="size-3.5" /> Northbridge University</span>
          </div>

          <div className="mt-4 flex items-center gap-3 flex-wrap">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition ${isDark ? "bg-white/[0.05] border-white/10" : "bg-white border-[#002147]/10 shadow-sm"}`}>
              <span className="size-2 rounded-full" style={{ background: rank.color, boxShadow: isDark ? `0 0 12px ${rank.glow}` : "none" }} />
              <span className="text-sm font-bold" style={{ color: isDark ? rank.color : "#002147" }}>{rank.label}</span>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition ${isDark ? "bg-[#E8C547]/10 border-[#E8C547]/30" : "bg-[#002147]/5 border-[#002147]/10 shadow-sm"}`}>
              <Coins className={`size-3.5 ${isDark ? "text-[#E8C547]" : "text-[#002147]"}`} />
              <span className={`tabular-nums font-bold ${isDark ? "text-[#E8C547]" : "text-[#002147]"}`}>{POINTS.toLocaleString()}</span>
              <span className={`text-xs font-bold ${isDark ? "text-[#E8C547]/70" : "text-[#002147]/70"}`}>Campus Points</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <div className={`text-[10px] uppercase tracking-widest font-bold ${isDark ? "text-white/40" : "text-[#002147]/40"}`}>This week</div>
          <div className="text-[#10E6A1] tabular-nums font-bold" style={{ fontSize: 24 }}>+{WEEK_GAIN}</div>
          <div className={`text-[10px] font-bold ${isDark ? "text-white/30" : "text-[#002147]/30"}`}>#8 ON CAMPUS</div>
        </div>
      </div>
    </div>
  );
}

function PointsCard({ isDark }: { isDark: boolean }) {
  const rank = getRank(POINTS);
  const next = getNextRank(POINTS);
  const remaining = next ? next.min - POINTS : 0;
  const progress = next ? ((POINTS - rank.min) / (next.min - rank.min)) * 100 : 100;

  const [animProgress, setAnimProgress] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setAnimProgress(progress), 100);
    return () => clearTimeout(t);
  }, [progress]);

  return (
    <div className={`relative overflow-hidden rounded-3xl border backdrop-blur-xl p-6 transition-all duration-500 ${isDark ? "border-[#E8C547]/20" : "border-[#002147]/10 shadow-lg"}`}
      style={{ background: isDark ? "linear-gradient(140deg, rgba(232,197,71,0.10) 0%, rgba(11,61,145,0.35) 80%)" : "linear-gradient(140deg, #FFFFFF 0%, #F1F4F9 80%)" }}>
      <div className={`absolute -top-20 -right-10 size-64 rounded-full blur-3xl transition-opacity duration-1000 ${isDark ? "opacity-40" : "opacity-10"}`} style={{ background: "#E8C547" }} />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div className={`text-[10px] uppercase tracking-[0.3em] font-bold ${isDark ? "text-[#E8C547]/80" : "text-[#002147]/80"}`}>Campus Points</div>
          <Sparkles className={`size-4 ${isDark ? "text-[#E8C547]" : "text-[#002147]"}`} />
        </div>

        <div className="mt-4 flex items-baseline gap-3">
          <div className={`tabular-nums font-bold ${isDark ? "text-white" : "text-[#002147]"}`} style={{ fontSize: 56, lineHeight: 1 }}>
            {POINTS.toLocaleString()}
          </div>
          <div className={`px-2.5 py-1 rounded-lg border font-bold text-xs ${isDark ? "bg-[#10E6A1]/15 text-[#10E6A1] border-[#10E6A1]/30" : "bg-[#10E6A1]/10 text-[#006644] border-[#10E6A1]/20"}`}>
            +{WEEK_GAIN} this week
          </div>
        </div>

        <div className="mt-8">
          <div className={`flex items-center justify-between text-[10px] uppercase tracking-widest font-bold mb-2.5 ${isDark ? "text-white/60" : "text-[#002147]/60"}`}>
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full" style={{ background: rank.color }} />
              {rank.label}
            </span>
            {next && (
              <span className="flex items-center gap-1.5">
                {next.label}
                <span className="size-1.5 rounded-full" style={{ background: next.color }} />
              </span>
            )}
          </div>
          <div className={`relative h-2.5 rounded-full overflow-hidden border ${isDark ? "bg-white/5 border-white/5" : "bg-[#002147]/5 border-[#002147]/10 shadow-inner"}`}>
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${animProgress}%`,
                background: "linear-gradient(90deg, #C9A227, #E8C547, #F5DD7A)",
                boxShadow: isDark ? "0 0 16px rgba(232,197,71,0.6)" : "none",
              }}
            />
          </div>
          <div className={`mt-3 text-xs font-medium ${isDark ? "text-white/60" : "text-[#002147]/60"}`}>
            {next ? <><span className={`font-bold ${isDark ? "text-[#E8C547]" : "text-[#002147]"}`}>{remaining.toLocaleString()}</span> points to reach <span style={{ color: next.color, fontWeight: 700 }}>{next.label}</span></> : <span className="font-bold">Maximum rank reached</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

function LeaderboardPreview({ isDark, onOpen }: { isDark: boolean; onOpen: () => void }) {
  const top = [
    { name: "Aisha K.", pts: 6320, rank: "diamond" as RankKey },
    { name: "Omar D.", pts: 4870, rank: "platinum" as RankKey },
    { name: "Sara N.", pts: 3110, rank: "gold" as RankKey },
  ];
  return (
    <div className={`rounded-3xl border backdrop-blur-xl p-6 transition-all duration-500 ${isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-[#002147]/10 shadow-lg"}`}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Trophy className={`size-4 ${isDark ? "text-[#E8C547]" : "text-[#002147]"}`} />
          <h3 className={`font-bold ${isDark ? "text-white" : "text-[#002147]"}`} style={{ fontSize: 18 }}>Campus Leaderboard</h3>
        </div>
        <button onClick={onOpen} className={`text-xs font-bold flex items-center gap-1 transition ${isDark ? "text-[#08E8F0] hover:text-[#1FF5FF]" : "text-[#002147] hover:opacity-70"}`}>
          VIEW ALL <ChevronRight className="size-3" />
        </button>
      </div>

      <div className="space-y-2.5">
        {top.map((p, i) => {
          const r = RANKS.find((x) => x.key === p.rank)!;
          const colors = ["#E8C547", "#C0CBD8", "#C68B5C"];
          return (
            <div key={p.name} className={`flex items-center gap-3 p-3 rounded-xl border transition ${isDark ? "bg-white/[0.03] border-white/5 hover:border-white/15" : "bg-[#F1F4F9] border-transparent hover:border-[#002147]/10"}`}>
              <div className="size-7 rounded-lg flex items-center justify-center text-xs tabular-nums font-bold" style={{ background: `${colors[i]}20`, color: colors[i], border: `1px solid ${colors[i]}40` }}>
                #{i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-bold truncate ${isDark ? "text-white" : "text-[#002147]"}`}>{p.name}</div>
                <div className="text-[10px] font-bold" style={{ color: r.color }}>{r.label}</div>
              </div>
              <div className={`tabular-nums text-sm font-bold ${isDark ? "text-[#E8C547]" : "text-[#002147]"}`}>{p.pts.toLocaleString()}</div>
            </div>
          );
        })}

        <div className={`mt-4 pt-4 border-t flex items-center gap-3 p-3 rounded-xl transition ${isDark ? "border-white/5 bg-gradient-to-r from-[#E8C547]/10 to-[#E8C547]/02 border-[#E8C547]/30 shadow-[0_0_15px_rgba(232,197,71,0.1)]" : "border-[#002147]/10 bg-[#002147]/5 shadow-sm"}`}>
          <div className={`size-7 rounded-lg flex items-center justify-center text-xs tabular-nums font-bold ${isDark ? "bg-[#E8C547]/20 text-[#E8C547] border border-[#E8C547]/40" : "bg-[#002147]/10 text-[#002147] border border-[#002147]/20"}`}>
            #8
          </div>
          <div className="flex-1 min-w-0">
            <div className={`text-sm font-bold ${isDark ? "text-white" : "text-[#002147]"}`}>You — Haitham</div>
            <div className={`text-[10px] font-bold ${isDark ? "text-[#E8C547]" : "text-[#002147]/60"}`}>Gold Vanguard</div>
          </div>
          <div className={`tabular-nums text-sm font-bold ${isDark ? "text-[#E8C547]" : "text-[#002147]"}`}>{POINTS.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}

function RankLadder({ isDark }: { isDark: boolean }) {
  const current = getRank(POINTS);
  return (
    <div className={`rounded-3xl border backdrop-blur-xl p-6 transition-all duration-500 ${isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-[#002147]/10 shadow-lg"}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Crown className={`size-4 ${isDark ? "text-[#E8C547]" : "text-[#002147]"}`} />
            <h3 className={`font-bold ${isDark ? "text-white" : "text-[#002147]"}`} style={{ fontSize: 18 }}>Vanguard Progression</h3>
          </div>
          <div className={`text-xs mt-0.5 font-medium ${isDark ? "text-white/50" : "text-[#002147]/50"}`}>Climb the ranks · earn elite academic recognition</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {RANKS.map((r) => {
          const reached = POINTS >= r.min;
          const isCurrent = r.key === current.key;
          return (
            <div
              key={r.key}
              className={`relative group p-4 rounded-2xl border transition-all duration-500 ${isCurrent ? "scale-[1.02]" : reached ? "" : "opacity-40 grayscale-[0.5]"} ${reached ? (isDark ? "bg-white/[0.04]" : "bg-[#F1F4F9]") : (isDark ? "bg-white/[0.01]" : "bg-transparent")} hover:scale-[1.05] hover:grayscale-0`}
              style={{
                borderColor: isCurrent ? r.color : reached ? (isDark ? "rgba(255,255,255,0.15)" : "rgba(0,33,71,0.1)") : "rgba(255,255,255,0.05)",
                boxShadow: isCurrent && isDark ? `0 0 24px ${r.glow}` : "none",
              }}
            >
              <div className="flex items-center justify-between">
                <RankBadge rank={r.key} size={32} />
                {!reached && <Lock className={`size-3.5 ${isDark ? "text-white/20" : "text-[#002147]/20"}`} />}
                {isCurrent && <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-bold ${isDark ? "bg-[#E8C547]/20 text-[#E8C547] border-[#E8C547]/30" : "bg-[#002147]/10 text-[#002147] border-[#002147]/20"}`}>CURRENT</span>}
              </div>
              <div className="mt-4 text-sm font-bold" style={{ color: reached ? (isDark ? r.color : "#002147") : "rgba(100,100,100,0.5)" }}>
                {r.label}
              </div>
              <div className={`text-[10px] tabular-nums mt-0.5 font-bold ${isDark ? "text-white/40" : "text-[#002147]/40"}`}>
                {r.max < 99999 ? `${r.min}–${r.max} pts` : `${r.min.toLocaleString()}+ pts`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RankBadge({ rank, size = 28, className = "" }: { rank: RankKey; size?: number; className?: string }) {
  const r = RANKS.find((x) => x.key === rank)!;
  return (
    <div
      className={`rounded-lg flex items-center justify-center transition-all hover:scale-110 ${className}`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${r.color}30, ${r.color}10)`,
        border: `1px solid ${r.color}80`,
        boxShadow: `0 0 12px ${r.glow}`,
      }}
    >
      <Crown style={{ width: size * 0.5, height: size * 0.5, color: r.color }} />
    </div>
  );
}

function RecentActivity({ isDark }: { isDark: boolean }) {
  const items = [
    { Icon: BadgeCheck, l: "Mission proof approved · Tech Club", pts: 200, time: "5h ago", color: "#10E6A1" },
    { Icon: Flame, l: "Joined campus volunteering mission", pts: 120, time: "2d ago", color: "#E8C547" },
  ];
  return (
    <div className={`rounded-3xl border backdrop-blur-xl p-6 transition-all duration-500 ${isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-[#002147]/10 shadow-lg"}`}>
      <div className="flex items-center gap-2 mb-5">
        <Zap className={`size-4 ${isDark ? "text-[#E8C547]" : "text-[#002147]"}`} />
        <h3 className={`font-bold ${isDark ? "text-white" : "text-[#002147]"}`} style={{ fontSize: 18 }}>Activity Stream</h3>
      </div>

      <div className="space-y-3">
        {items.map((it, i) => (
          <div key={i} className={`flex items-center gap-4 p-3.5 rounded-xl border transition ${isDark ? "bg-white/[0.02] border-white/5 hover:bg-white/[0.05]" : "bg-[#F1F4F9] border-transparent hover:border-[#002147]/10"}`}>
            <div className="size-10 rounded-xl flex items-center justify-center shadow-sm" style={{ background: `${it.color}15`, border: `1px solid ${it.color}40` }}>
              <it.Icon className="size-5" style={{ color: it.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className={`text-sm font-bold truncate ${isDark ? "text-white/90" : "text-[#002147]/90"}`}>{it.l}</div>
              <div className={`text-[10px] mt-0.5 font-bold uppercase tracking-wider ${isDark ? "text-white/40" : "text-[#002147]/40"}`}>{it.time}</div>
            </div>
            <div className={`text-sm px-3 py-1 rounded-full tabular-nums font-bold shadow-sm ${isDark ? "bg-[#E8C547]/15 text-[#E8C547] border border-[#E8C547]/30" : "bg-[#002147]/10 text-[#002147] border border-[#002147]/20"}`}>+{it.pts}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CertificateVault({ isDark, onOpen }: { isDark: boolean; onOpen: () => void }) {
  const certs = [
    { name: "Campus Leadership", req: "Reach Platinum Vanguard", progress: 2450, total: 3000, unlocked: false, color: "#E8C547" },
    { name: "Volunteer Excellence", req: "Complete 10 volunteer missions", progress: 10, total: 10, unlocked: true, color: "#10E6A1" },
    { name: "Hackathon Support", req: "Support 3 hackathons", progress: 3, total: 3, unlocked: true, color: "#E8C547" },
  ];
  return (
    <div className={`rounded-3xl border backdrop-blur-xl p-6 transition-all duration-500 ${isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-[#002147]/10 shadow-lg"}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Award className={`size-4 ${isDark ? "text-[#E8C547]" : "text-[#002147]"}`} />
          <h3 className={`font-bold ${isDark ? "text-white" : "text-[#002147]"}`} style={{ fontSize: 18 }}>Milestone Recognition</h3>
        </div>
        <button onClick={onOpen} className={`text-xs font-bold flex items-center gap-1 transition ${isDark ? "text-[#08E8F0] hover:text-[#1FF5FF]" : "text-[#002147] hover:opacity-70"}`}>
          VIEW LIBRARY <ChevronRight className="size-3" />
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certs.map((c) => {
          const pct = Math.min(100, (c.progress / c.total) * 100);
          return (
            <div
              key={c.name}
              className={`relative overflow-hidden p-5 rounded-2xl border transition-all hover:scale-[1.02] ${c.unlocked ? (isDark ? "bg-white/[0.05]" : "bg-white shadow-md") : (isDark ? "bg-white/[0.01]" : "bg-[#F8F9FA]")}`}
              style={{
                borderColor: c.unlocked ? `${c.color}50` : (isDark ? "rgba(255,255,255,0.08)" : "rgba(0,33,71,0.05)"),
                boxShadow: c.unlocked && isDark ? `0 0 20px ${c.color}20` : "none",
              }}
            >
              {c.unlocked && isDark && (
                <div className="absolute -top-10 -right-10 size-32 rounded-full blur-2xl opacity-20" style={{ background: c.color }} />
              )}
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="size-12 rounded-xl flex items-center justify-center shadow-sm" style={{ background: `${c.color}15`, border: `1px solid ${c.color}40` }}>
                    {c.unlocked ? <Award className="size-6" style={{ color: c.color }} /> : <Lock className={`size-5 ${isDark ? "text-white/20" : "text-[#002147]/20"}`} />}
                  </div>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full border font-bold ${c.unlocked ? "" : (isDark ? "bg-white/5 text-white/40 border-white/10" : "bg-[#002147]/5 text-[#002147]/40 border-[#002147]/10")}`}
                    style={c.unlocked ? { background: `${c.color}20`, color: c.color, borderColor: `${c.color}50` } : {}}>
                    {c.unlocked ? "VERIFIED" : "LOCKED"}
                  </span>
                </div>
                <div className={`text-base font-bold ${isDark ? "text-white" : "text-[#002147]"}`}>{c.name}</div>
                <div className={`text-[11px] mt-1 font-medium ${isDark ? "text-white/50" : "text-[#002147]/50"}`}>{c.req}</div>

                <div className={`mt-4 h-2 rounded-full overflow-hidden ${isDark ? "bg-white/5" : "bg-[#002147]/5 shadow-inner"}`}>
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%`, background: c.color, boxShadow: isDark ? `0 0 10px ${c.color}80` : "none" }} />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className={`text-[10px] tabular-nums font-bold ${isDark ? "text-white/40" : "text-[#002147]/40"}`}>{c.progress.toLocaleString()} / {c.total.toLocaleString()}</span>
                  <button className="text-[11px] font-bold transition hover:opacity-70" style={{ color: c.color }}>
                    {c.unlocked ? "VIEW CERT" : "EARN PROGRESS"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const SKILL_COLORS: Record<string, string> = {
  Design: "#A78BFA",
  Leadership: "#E8C547",
  Marketing: "#FF9F43",
  Technical: "#08E8F0",
  Communication: "#10E6A1",
};

function ImpactPortfolioSection({ isDark, onOpenPortfolio }: { isDark: boolean; onOpenPortfolio: () => void }) {
  const radarData = [
    { subject: "Design", A: 120, fullMark: 150 },
    { subject: "Leadership", A: 98, fullMark: 150 },
    { subject: "Marketing", A: 86, fullMark: 150 },
    { subject: "Technical", A: 130, fullMark: 150 },
    { subject: "Communication", A: 110, fullMark: 150 },
  ];

  const completedMissions = missions.filter((m) => m.skillsDeveloped && m.skillsDeveloped.length > 0);

  const rank = getRank(POINTS);

  return (
    <div className={`rounded-3xl border backdrop-blur-xl p-6 transition-all duration-500 ${isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-[#002147]/10 shadow-lg"}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Briefcase className={`size-4 ${isDark ? "text-[#E8C547]" : "text-[#002147]"}`} />
          <h3 className={`font-bold ${isDark ? "text-white" : "text-[#002147]"}`} style={{ fontSize: 18 }}>Impact Portfolio</h3>
        </div>
        <button
          onClick={onOpenPortfolio}
          className={`text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm flex items-center gap-2 ${isDark ? "bg-[#E8C547] text-[#0A1530] hover:bg-[#F5DD7A]" : "bg-[#0B3D91] text-white hover:bg-[#0A2E6E]"}`}
        >
          <Sparkles className="size-3.5" />
          GENERATE VERIFIED PORTFOLIO
        </button>
      </div>

      {/* Section 1 — Impact Summary */}
      <div className="mb-6">
        <div className={`text-[10px] uppercase tracking-[0.25em] font-bold mb-3 ${isDark ? "text-white/40" : "text-[#002147]/40"}`}>
          Section 1 · Impact Summary
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Total Points", value: POINTS.toLocaleString(), color: "#E8C547", sub: "Campus Points" },
            { label: "Vanguard Rank", value: rank.label, color: rank.color, sub: "Current Rank" },
            { label: "Missions Done", value: String(completedMissions.length), color: "#10E6A1", sub: "Verified Work" },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`p-4 rounded-2xl border transition hover:scale-[1.02] ${isDark ? "bg-white/[0.03] border-white/10" : "bg-[#F8F9FB] border-[#002147]/10 shadow-sm"}`}
            >
              <div className={`text-[9px] uppercase tracking-widest font-bold mb-1.5 ${isDark ? "text-white/40" : "text-[#002147]/40"}`}>{stat.label}</div>
              <div className="tabular-nums font-bold" style={{ fontSize: 22, color: isDark ? stat.color : "#002147", lineHeight: 1.1 }}>
                {stat.value}
              </div>
              <div className={`text-[9px] mt-1 font-bold ${isDark ? "text-white/30" : "text-[#002147]/30"}`}>{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2 & 3 — Skill Growth + Verified Work */}
      <div className="grid md:grid-cols-2 lg:grid-cols-[1fr_1.5fr] gap-5">
        {/* Section 2 — Skill Growth Radar */}
        <div className={`p-5 rounded-2xl border ${isDark ? "bg-white/[0.02] border-white/5" : "bg-slate-50 border-slate-200"}`}>
          <div className={`text-[10px] uppercase tracking-[0.25em] font-bold mb-3 ${isDark ? "text-white/40" : "text-[#002147]/40"}`}>
            Section 2 · Skill Growth
          </div>
          <div className="h-48 w-full -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)", fontSize: 10, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar name="Skills" dataKey="A" stroke={isDark ? "#E8C547" : "#0B3D91"} fill={isDark ? "#E8C547" : "#0B3D91"} fillOpacity={isDark ? 0.3 : 0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          {/* Skill score legend */}
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
            {radarData.map((d) => {
              const color = SKILL_COLORS[d.subject] || "#E8C547";
              const pct = Math.round((d.A / d.fullMark) * 100);
              return (
                <div key={d.subject} className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                  <span className={`text-[10px] font-bold flex-1 ${isDark ? "text-white/60" : "text-[#002147]/60"}`}>{d.subject}</span>
                  <span className="text-[10px] font-bold tabular-nums" style={{ color }}>{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3 — Verified Work */}
        <div className={`p-5 rounded-2xl border flex flex-col ${isDark ? "bg-white/[0.02] border-white/5" : "bg-slate-50 border-slate-200"}`}>
          <div className={`text-[10px] uppercase tracking-[0.25em] font-bold mb-3 ${isDark ? "text-white/40" : "text-[#002147]/40"}`}>
            Section 3 · Verified Work
          </div>
          <div className="space-y-2.5 flex-1 overflow-y-auto max-h-72 pr-0.5">
            {completedMissions.map((mission) => (
              <div
                key={mission.id}
                className={`p-3.5 rounded-xl border flex flex-col gap-2 transition ${isDark ? "bg-white/5 border-white/10 hover:border-white/20" : "bg-white border-slate-200 shadow-sm hover:shadow-md"}`}
              >
                {/* Title + Club */}
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <div className={`text-xs font-bold leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>{mission.title}</div>
                    <div className={`text-[10px] mt-0.5 font-medium ${isDark ? "text-white/50" : "text-slate-500"}`}>{mission.club}</div>
                  </div>
                  <div className={`text-[10px] font-bold px-2 py-1 rounded-lg border tabular-nums flex-shrink-0 ${isDark ? "bg-[#E8C547]/10 text-[#E8C547] border-[#E8C547]/20" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
                    +{mission.reward} pts
                  </div>
                </div>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-1.5">
                  {mission.skillsDeveloped?.map((s) => (
                    <span
                      key={s}
                      className="text-[9px] px-1.5 py-0.5 rounded border font-bold uppercase"
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

                {/* Certificate badge */}
                {mission.certificateProgress && (
                  <div className={`flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-lg border w-fit ${isDark ? "bg-[#08E8F0]/8 text-[#08E8F0] border-[#08E8F0]/20" : "bg-sky-50 text-sky-700 border-sky-200"}`}>
                    <BadgeCheck className="size-3" />
                    {mission.certificateProgress}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
