import { useState } from "react";
import { BadgeCheck, Clock, Flame, Users, Award, ChevronRight, Filter, Shield, Hourglass } from "lucide-react";
import { missions } from "../data";
import { Mission, MissionCategory, MISSION_CATEGORIES } from "../types";

const POINTS_PER_DOLLAR = 4;

type FilterKey = "all" | MissionCategory;

export function MissionList({ theme = "dark", onOpen }: { theme?: "dark" | "light"; onOpen: (m: Mission) => void }) {
  const isDark = theme === "dark";
  const [filter, setFilter] = useState<FilterKey>("all");
  const visible = filter === "all" ? missions : missions.filter((m) => m.missionCategory === filter);

  return (
    <div className="space-y-5">
      <div>
        <h2 className={isDark ? "text-white" : "text-[#002147]"} style={{ fontSize: 26, fontWeight: 600 }}>Active Missions</h2>
        <p className={`text-sm mt-1 ${isDark ? "text-white/50" : "text-[#002147]/50"}`}>Sorted by urgency · earn points, certificates, and badges</p>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto -mx-1 px-1">
        <Filter className={`size-4 shrink-0 ${isDark ? "text-white/40" : "text-[#002147]/40"}`} />
        <Chip label="All" active={filter === "all"} onClick={() => setFilter("all")} isDark={isDark} />
        {(Object.values(MISSION_CATEGORIES)).map((cat) => (
          <Chip
            key={cat.key}
            label={cat.shortLabel}
            color={cat.color}
            active={filter === cat.key}
            onClick={() => setFilter(cat.key)}
            isDark={isDark}
          />
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {visible.map((m) => (
          <MissionTile key={m.id} mission={m} onOpen={() => onOpen(m)} isDark={isDark} />
        ))}
      </div>
    </div>
  );
}

function Chip({ label, active, onClick, color, isDark }: { label: string; active: boolean; onClick: () => void; color?: string; isDark: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-3 py-1.5 rounded-full border whitespace-nowrap transition ${
        active
          ? `${isDark ? "text-white" : "text-[#0A1530]"} border-transparent shadow-sm`
          : isDark 
            ? "bg-white/[0.04] text-white/60 border-white/10 hover:border-white/30" 
            : "bg-[#002147]/5 text-[#002147]/60 border-[#002147]/10 hover:border-[#002147]/30"
      }`}
      style={active ? { background: color || "#E8C547" } : undefined}
    >
      {label}
    </button>
  );
}



function MissionTile({ mission, onOpen, isDark }: { mission: Mission; onOpen: () => void; isDark: boolean }) {
  const cat = mission.missionCategory ? MISSION_CATEGORIES[mission.missionCategory] : null;
  const points = mission.reward * POINTS_PER_DOLLAR;
  const color = cat?.color || "#E8C547";
  const difficulty = mission.difficulty || (mission.reward >= 200 ? "Hard" : mission.reward >= 80 ? "Medium" : "Easy");
  const diffStyles: Record<NonNullable<Mission["difficulty"]>, string> = {
    Easy: "text-[#10E6A1]",
    Medium: isDark ? "text-[#E8C547]" : "text-[#002147]",
    Hard: "text-[#FF6B6B]",
  };

  return (
    <button
      onClick={onOpen}
      className={`group text-left w-full p-5 rounded-2xl border backdrop-blur-xl transition-all relative overflow-hidden ${
        isDark 
          ? "bg-white/[0.03] border-white/10 hover:border-white/30 hover:bg-white/[0.05]" 
          : "bg-white border-[#002147]/10 hover:border-[#002147]/30 hover:bg-white shadow-sm"
      } hover:-translate-y-0.5`}
    >
      <div className={`absolute -top-12 -right-12 size-32 rounded-full blur-2xl transition-opacity ${isDark ? "opacity-0 group-hover:opacity-30" : "opacity-0 group-hover:opacity-10"}`} style={{ background: color }} />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-xs flex-wrap">
            {cat && (
              <span
                className="px-2 py-0.5 rounded-full border font-medium"
                style={{ background: `${color}1A`, color: isDark ? color : "#002147", borderColor: `${color}55` }}
              >
                {cat.shortLabel}
              </span>
            )}
            {mission.verified && <BadgeCheck className="size-3.5 text-[#08E8F0]" />}
            {mission.urgency === "high" && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FF6B6B]/15 text-[#FF6B6B] border border-[#FF6B6B]/30 font-medium">
                <Flame className="size-3" /> Urgent
              </span>
            )}
            {(mission.generateCertificate || mission.certificateProgress) && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#10E6A1]/15 text-[#10E6A1] border border-[#10E6A1]/30 font-medium">
                <Award className="size-3" /> Certificate
              </span>
            )}
          </div>
        </div>

        <div className={`mt-3 leading-snug font-semibold ${isDark ? "text-white" : "text-[#002147]"}`}>{mission.title}</div>
        <div className={`text-xs mt-1 ${isDark ? "text-white/50" : "text-[#002147]/50"}`}>By {mission.createdBy || mission.club}</div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-xl border" style={{ background: `${color}1A`, borderColor: `${color}40` }}>
            <div className="text-[10px] uppercase tracking-wider font-bold" style={{ color: isDark ? color : "#002147" }}>Reward</div>
            <div className="flex items-baseline gap-1">
              <span className="tabular-nums font-bold" style={{ color: isDark ? color : "#002147", fontSize: 20 }}>+{points}</span>
              <span className="text-[10px] font-bold" style={{ color: isDark ? color : "#002147" }}>pts</span>
            </div>
            {mission.moneyReward ? (
              <div className="text-[10px] text-[#08E8F0] flex items-center gap-1 font-medium">
                + RM {mission.moneyReward} <span className={isDark ? "text-white/40" : "text-[#002147]/40"}>optional</span>
              </div>
            ) : null}
            {mission.volunteerHours && (
              <div className={`text-[10px] flex items-center gap-1 ${isDark ? "text-white/50" : "text-[#002147]/50"}`}>
                <Hourglass className="size-2.5" /> +{mission.volunteerHours}h volunteer
              </div>
            )}
          </div>
          <div className={`p-2.5 rounded-xl border ${isDark ? "bg-white/[0.04] border-white/10" : "bg-[#002147]/5 border-[#002147]/10"}`}>
            <div className={`text-[10px] uppercase tracking-wider font-medium ${isDark ? "text-white/50" : "text-[#002147]/50"}`}>Difficulty</div>
            <div className={`font-bold ${diffStyles[difficulty]}`}>{difficulty}</div>
            <div className={`text-[10px] flex items-center gap-1 ${isDark ? "text-white/40" : "text-[#002147]/40"}`}>
              <Clock className="size-2.5" /> {mission.deadline || "1 week"}
            </div>
          </div>
        </div>

        {(mission.certificateProgress || mission.badge) && (
          <div className="mt-3 space-y-1">
            {mission.certificateProgress && (
              <div className="flex items-center gap-1.5 text-[11px] text-[#10E6A1] font-medium">
                <Award className="size-3" /> {mission.certificateProgress}
              </div>
            )}
            {mission.badge && (
              <div className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: isDark ? color : "#002147" }}>
                <Shield className="size-3" /> {mission.badge}
              </div>
            )}
          </div>
        )}

        <div className={`mt-4 pt-3 border-t flex items-center justify-between text-xs ${isDark ? "border-white/5 text-white/50" : "border-[#002147]/10 text-[#002147]/50"}`}>
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-medium"><Users className="size-3" />{mission.applicants}</span>
            <span className="font-medium">{mission.postedAgo}</span>
          </span>
          <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform font-bold" style={{ color: isDark ? color : "#002147" }}>
            View Mission <ChevronRight className="size-3" />
          </span>
        </div>
      </div>
    </button>
  );
}
