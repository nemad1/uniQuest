import { Mission } from "./types";
import { BadgeCheck, Clock, Users, Flame } from "lucide-react";

const urgencyMap = {
  high: { label: "Urgent", color: "bg-rose-50 text-rose-600 border-rose-200" },
  medium: { label: "Soon", color: "bg-amber-50 text-amber-700 border-amber-200" },
  low: { label: "Flexible", color: "bg-slate-50 text-slate-500 border-slate-200" },
};

export function MissionCard({ mission, onOpen }: { mission: Mission; onOpen: (m: Mission) => void }) {
  const u = urgencyMap[mission.urgency];
  return (
    <button
      onClick={() => onOpen(mission)}
      className="group text-left w-full p-4 rounded-2xl bg-white border border-slate-200/70 hover:border-[#0B3D91]/40 hover:shadow-md hover:-translate-y-0.5 transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="truncate">{mission.club}</span>
            {mission.verified && <BadgeCheck className="size-3.5 text-[#0B3D91] shrink-0" />}
          </div>
          <div className="mt-1 text-slate-900 leading-snug">{mission.title}</div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-[#0B3D91]">${mission.reward}</div>
          {mission.deposit > 0 && <div className="text-xs text-slate-400">${mission.deposit} dep.</div>}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {mission.tags.slice(0, 3).map((t) => (
          <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-slate-50 text-slate-600 border border-slate-200/80">#{t}</span>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1"><Clock className="size-3" />{mission.postedAgo}</span>
          <span className="flex items-center gap-1"><Users className="size-3" />{mission.applicants}</span>
        </div>
        <span className={`px-2 py-0.5 rounded-full border flex items-center gap-1 ${u.color}`}>
          {mission.urgency === "high" && <Flame className="size-3" />}
          {u.label}
        </span>
      </div>
    </button>
  );
}
