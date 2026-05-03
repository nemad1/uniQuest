import { Trophy, Crown, TrendingUp } from "lucide-react";
import { RANKS } from "./ranks";

const board = [
  { name: "Aisha K.", pts: 6320, rank: "diamond", major: "CS · Senior", delta: "+420" },
  { name: "Omar D.", pts: 4870, rank: "platinum", major: "EE · Senior", delta: "+310" },
  { name: "Sara N.", pts: 3110, rank: "gold", major: "Design · Junior", delta: "+280" },
  { name: "Kenji T.", pts: 2980, rank: "gold", major: "Math · Junior", delta: "+190" },
  { name: "Layla F.", pts: 2820, rank: "gold", major: "CS · Junior", delta: "+260" },
  { name: "Marcus L.", pts: 2710, rank: "gold", major: "Business · Senior", delta: "+150" },
  { name: "Devon S.", pts: 2580, rank: "gold", major: "Design · Junior", delta: "+220" },
  { name: "Haitham M.", pts: 2450, rank: "gold", major: "CS · Junior", delta: "+320", you: true },
  { name: "Chen W.", pts: 2210, rank: "gold", major: "Linguistics · Senior", delta: "+90" },
  { name: "Aanya R.", pts: 1980, rank: "silver", major: "Photo · Junior", delta: "+180" },
];

export function Leaderboard({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const isDark = theme === "dark";
  return (
    <div className="space-y-5 animate-slideUp">
      <div className="flex items-center gap-2">
        <Trophy className={`size-5 ${isDark ? "text-[#E8C547]" : "text-[#002147]"}`} />
        <h2 className={isDark ? "text-white" : "text-[#002147]"} style={{ fontSize: 26, fontWeight: 600 }}>Campus Leaderboard</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        {board.slice(0, 3).map((p, i) => {
          const r = RANKS.find((x) => x.key === p.rank)!;
          const podiums = ["#E8C547", "#C0CBD8", "#C68B5C"];
          const c = podiums[i];
          return (
            <div key={p.name} className={`relative overflow-hidden rounded-3xl border p-5 backdrop-blur-xl transition hover:scale-[1.02] ${isDark ? "" : "shadow-lg bg-white"}`}
              style={{ 
                borderColor: isDark ? `${c}40` : `${c}60`, 
                background: isDark ? `linear-gradient(140deg, ${c}15 0%, rgba(11,61,145,0.3) 80%)` : `linear-gradient(140deg, ${c}10 0%, #FFFFFF 100%)`,
                boxShadow: isDark ? `0 0 24px ${c}25` : `0 4px 20px ${c}15`
              }}>
              <div className={`absolute -top-12 -right-12 size-32 rounded-full blur-3xl ${isDark ? "opacity-30" : "opacity-10"}`} style={{ background: c }} />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="size-10 rounded-xl flex items-center justify-center" style={{ background: `${c}20`, border: `1px solid ${c}50` }}>
                    <Crown className="size-5" style={{ color: c }} />
                  </div>
                  <span className="text-2xl tabular-nums font-bold" style={{ color: c }}>#{i + 1}</span>
                </div>
                <div className={`mt-4 font-bold ${isDark ? "text-white" : "text-[#002147]"}`} style={{ fontSize: 18 }}>{p.name}</div>
                <div className={`text-xs font-bold ${isDark ? "text-white/50" : "text-[#002147]/50"}`}>{p.major}</div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className={`tabular-nums font-bold ${isDark ? "text-[#E8C547]" : "text-[#002147]"}`} style={{ fontSize: 24 }}>{p.pts.toLocaleString()}</span>
                  <span className={`text-xs font-bold ${isDark ? "text-white/50" : "text-[#002147]/50"}`}>pts</span>
                </div>
                <div className="text-[11px] font-bold" style={{ color: isDark ? r.color : "#002147" }}>{r.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={`rounded-2xl border backdrop-blur-xl divide-y ${isDark ? "border-white/10 bg-white/[0.03] divide-white/5" : "border-[#002147]/10 bg-white divide-[#002147]/5 shadow-sm"}`}>
        {board.slice(3).map((p, i) => {
          const r = RANKS.find((x) => x.key === p.rank)!;
          return (
            <div key={p.name} className={`flex items-center gap-4 p-4 transition ${p.you ? (isDark ? "bg-[#E8C547]/5" : "bg-[#002147]/5") : (isDark ? "hover:bg-white/[0.02]" : "hover:bg-[#F1F4F9]")}`}>
              <div className={`size-8 rounded-full border flex items-center justify-center text-xs tabular-nums font-bold ${isDark ? "bg-white/5 border-white/10 text-white/60" : "bg-[#002147]/5 border-[#002147]/10 text-[#002147]/60"}`}>
                #{i + 4}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold ${p.you ? (isDark ? "text-[#E8C547]" : "text-[#002147]") : (isDark ? "text-white" : "text-[#002147]")}`}>{p.name}</span>
                  {p.you && <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-bold ${isDark ? "bg-[#E8C547]/20 text-[#E8C547] border-[#E8C547]/30" : "bg-[#002147]/10 text-[#002147] border-[#002147]/20"}`}>YOU</span>}
                </div>
                <div className="text-[11px] font-bold" style={{ color: isDark ? r.color : "#002147" }}>{r.label} · <span className={`font-medium ${isDark ? "text-white/40" : "text-[#002147]/40"}`}>{p.major}</span></div>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#10E6A1] font-bold">
                <TrendingUp className="size-3" /> {p.delta}
              </div>
              <div className={`tabular-nums w-20 text-right font-bold ${isDark ? "text-[#E8C547]" : "text-[#002147]"}`}>{p.pts.toLocaleString()}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
