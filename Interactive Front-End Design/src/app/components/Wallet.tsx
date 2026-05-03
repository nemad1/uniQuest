import { ArrowDownLeft, ArrowUpRight, Lock, ShieldCheck } from "lucide-react";

const tx = [
  { id: "t1", label: "Reward · Robotics Showcase photos", amount: 60, kind: "in", time: "2h ago" },
  { id: "t2", label: "Escrow lock · Hackathon poster", amount: -10, kind: "out", time: "5h ago" },
  { id: "t3", label: "Reward · Translation abstract", amount: 35, kind: "in", time: "1d ago" },
  { id: "t4", label: "Mentorship session · Priya K.", amount: -40, kind: "out", time: "2d ago" },
];

export function Wallet() {
  const available = 247;
  const held = 30;
  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B3D91] to-[#0A2E6E] text-white p-5 shadow-lg">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-[#C9A227]/20 blur-3xl" />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="text-xs text-white/60 uppercase tracking-widest">Available</div>
            <div className="text-3xl mt-1">${available}.00</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-white/60 flex items-center gap-1 justify-end"><Lock className="size-3" /> In Escrow</div>
            <div className="text-xl mt-1">${held}.00</div>
          </div>
        </div>
        <div className="relative mt-5 grid grid-cols-2 gap-2">
          <button className="py-2.5 rounded-xl bg-white/15 backdrop-blur hover:bg-white/25 transition">Top up</button>
          <button className="py-2.5 rounded-xl bg-[#C9A227] hover:bg-[#B8901C] transition">Withdraw</button>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-blue-50 border border-blue-200/80 text-xs text-[#0B3D91] flex items-start gap-2">
        <ShieldCheck className="size-4 mt-0.5 shrink-0" />
        <span>Every transaction is immutable & audit-logged via the EscrowService DAO. Held funds release on admin approval.</span>
      </div>

      <div>
        <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Recent Activity</div>
        <div className="space-y-1.5">
          {tx.map((t) => (
            <div key={t.id} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200/70">
              <div className={`size-9 rounded-lg flex items-center justify-center ${t.kind === "in" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                {t.kind === "in" ? <ArrowDownLeft className="size-4" /> : <ArrowUpRight className="size-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-slate-900 truncate">{t.label}</div>
                <div className="text-xs text-slate-400">{t.time}</div>
              </div>
              <div className={t.kind === "in" ? "text-emerald-600" : "text-slate-700"}>
                {t.kind === "in" ? "+" : ""}${Math.abs(t.amount)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
