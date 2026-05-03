import { ArrowDownLeft, ArrowUpRight, Lock, ShieldCheck, Coins } from "lucide-react";

const tx = [
  { id: "t1", label: "Reward · Robotics Showcase photos", amount: 60, kind: "in", time: "2h ago" },
  { id: "t2", label: "Escrow lock · Hackathon poster", amount: -10, kind: "out", time: "5h ago" },
  { id: "t3", label: "Reward · Translation abstract", amount: 35, kind: "in", time: "1d ago" },
  { id: "t4", label: "Mentorship session · Priya K.", amount: -40, kind: "out", time: "2d ago" },
];

export function WalletDark({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const isDark = theme === "dark";
  const available = 247;
  const held = 30;
  return (
    <div className="space-y-5 animate-slideUp">
      <div className="flex items-center gap-2">
        <Coins className={`size-5 ${isDark ? "text-[#E8C547]" : "text-[#002147]"}`} />
        <h2 className={isDark ? "text-white" : "text-[#002147]"} style={{ fontSize: 26, fontWeight: 600 }}>Wallet</h2>
      </div>

      <div className={`relative overflow-hidden rounded-3xl border backdrop-blur-xl p-6 ${isDark ? "border-[#E8C547]/30" : "border-[#002147]/10 bg-white shadow-lg"}`}
        style={{ background: isDark ? "linear-gradient(135deg, rgba(11,61,145,0.5) 0%, rgba(232,197,71,0.15) 80%)" : "linear-gradient(135deg, #002147 0%, #004B91 100%)" }}>
        <div className={`absolute -right-10 -top-10 size-56 rounded-full blur-3xl ${isDark ? "bg-[#E8C547]/20" : "bg-white/10"}`} />
        <div className="relative flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className={`text-[10px] uppercase tracking-widest font-bold ${isDark ? "text-white/60" : "text-white/70"}`}>Available</div>
            <div className="text-white tabular-nums" style={{ fontSize: 40, fontWeight: 700 }}>${available}.00</div>
          </div>
          <div className="text-right">
            <div className={`text-[10px] uppercase tracking-widest flex items-center gap-1 justify-end font-bold ${isDark ? "text-white/60" : "text-white/60"}`}><Lock className="size-3" /> In Escrow</div>
            <div className={`${isDark ? "text-[#E8C547]" : "text-white"} tabular-nums font-bold`} style={{ fontSize: 24 }}>${held}.00</div>
          </div>
        </div>
        <div className="relative mt-5 grid grid-cols-2 gap-2">
          <button className={`py-2.5 rounded-xl transition font-bold text-sm ${isDark ? "bg-white/10 hover:bg-white/15 text-white border border-white/10" : "bg-white/10 hover:bg-white/20 text-white border border-white/20"}`}>Top up</button>
          <button className={`py-2.5 rounded-xl transition font-bold text-sm ${isDark ? "bg-[#E8C547] text-[#0A2E6E] hover:bg-[#F0D365]" : "bg-[#E8C547] text-[#002147] hover:bg-[#F0D365]"}`}>Withdraw</button>
        </div>
      </div>

      <div className={`p-3 rounded-xl border text-xs flex items-start gap-2 font-bold ${isDark ? "bg-[#08E8F0]/5 border-[#08E8F0]/20 text-[#08E8F0]" : "bg-[#002147]/5 border-[#002147]/10 text-[#002147]/80"}`}>
        <ShieldCheck className="size-4 mt-0.5 shrink-0" />
        Every transaction is immutable and audit-logged via the EscrowService DAO.
      </div>

      <div>
        <div className={`text-[10px] uppercase tracking-wider mb-3 font-bold ${isDark ? "text-white/50" : "text-[#002147]/50"}`}>Recent Activity</div>
        <div className="space-y-2">
          {tx.map((t) => (
            <div key={t.id} className={`flex items-center gap-3 p-3 rounded-xl border transition ${isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-[#002147]/10 shadow-sm"}`}>
              <div className={`size-9 rounded-lg flex items-center justify-center font-bold ${t.kind === "in" ? "bg-[#10E6A1]/15 text-[#10E6A1]" : "bg-[#FF6B6B]/15 text-[#FF6B6B]"}`}>
                {t.kind === "in" ? <ArrowDownLeft className="size-4" /> : <ArrowUpRight className="size-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-sm truncate font-bold ${isDark ? "text-white/85" : "text-[#002147]"}`}>{t.label}</div>
                <div className={`text-[10px] mt-0.5 font-bold uppercase tracking-wider ${isDark ? "text-white/40" : "text-[#002147]/40"}`}>{t.time}</div>
              </div>
              <div className={`font-bold tabular-nums ${t.kind === "in" ? "text-[#10E6A1]" : (isDark ? "text-white/70" : "text-[#002147]/70")}`}>
                {t.kind === "in" ? "+" : ""}${Math.abs(t.amount)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
