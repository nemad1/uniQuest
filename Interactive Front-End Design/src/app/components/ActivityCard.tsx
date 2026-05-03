import { FeedActivity } from "./types";
import { CheckCircle2, Plus, UserPlus, Coins } from "lucide-react";

const kindMap = {
  complete: { Icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
  post: { Icon: Plus, color: "text-[#0B3D91]", bg: "bg-blue-50" },
  join: { Icon: UserPlus, color: "text-violet-600", bg: "bg-violet-50" },
  reward: { Icon: Coins, color: "text-[#C9A227]", bg: "bg-amber-50" },
};

export function ActivityCard({ item, delay = 0 }: { item: FeedActivity; delay?: number }) {
  const { Icon, color, bg } = kindMap[item.kind];
  return (
    <div
      className="group flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200/70 hover:border-[#0B3D91]/30 hover:shadow-sm transition-all"
      style={{ animation: `slideUp 0.4s ease-out ${delay}ms backwards` }}
    >
      <div className="relative">
        <div className="size-10 rounded-full bg-gradient-to-br from-[#0B3D91] to-[#1E5FBF] text-white flex items-center justify-center text-sm">
          {item.avatar}
        </div>
        <div className={`absolute -bottom-1 -right-1 size-5 rounded-full ${bg} ${color} flex items-center justify-center border-2 border-white`}>
          <Icon className="size-3" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm leading-snug">
          <span className="text-slate-900">{item.user}</span>
          <span className="text-slate-500"> {item.action} </span>
          <span className="text-[#0B3D91]">{item.target}</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-slate-400">{item.timeAgo}</span>
          {item.amount && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-[#9C7A1F]">
              +${item.amount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
