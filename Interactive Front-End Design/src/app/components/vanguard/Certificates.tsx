import { useState } from "react";
import { Award, Lock, Sparkles, FileCheck, Trophy } from "lucide-react";
import { MissionCertificateCard, MissionCertificatePreview, MissionCertData } from "../MissionCertificate";

const missionCerts: MissionCertData[] = [
  {
    id: "mc1",
    certId: "DWT-MC-2026-000482",
    title: "Mission Completion Certificate",
    studentName: "Aanya Rao",
    missionTitle: "Decoration Team — International Culture Night",
    campaignName: "International Culture Night 2026",
    missionCategory: "University Campaign Support",
    categoryColor: "#E8C547",
    pointsEarned: 600,
    volunteerHours: 4,
    completionDate: "May 12, 2026",
    issuingOrganization: "Northbridge University · Office of Student Affairs",
    signerType: "university",
    status: "issued",
  },
  {
    id: "mc2",
    certId: "DWT-MC-2026-000503",
    title: "Volunteer Mission Certificate",
    studentName: "Aanya Rao",
    missionTitle: "Design posters for Spring Hackathon 2026",
    campaignName: "ACM Student Chapter",
    missionCategory: "Club Mission",
    categoryColor: "#08E8F0",
    pointsEarned: 560,
    completionDate: "May 18, 2026",
    issuingOrganization: "Northbridge University · ACM Student Chapter",
    signerType: "club",
    clubSupervisor: "Prof. R. Tanaka",
    status: "issued",
  },

];

const certs = [

  { name: "Campus Leadership", req: "Reach Platinum Vanguard rank", progress: 2450, total: 3000, unlocked: false, color: "#E8C547", desc: "Reserved for students who consistently lead campus initiatives." },
  { name: "Volunteer Excellence", req: "Complete 10 volunteer missions", progress: 10, total: 10, unlocked: true, color: "#10E6A1", desc: "Awarded for outstanding contribution to campus volunteering." },
  { name: "Hackathon Support", req: "Support 3 hackathons", progress: 3, total: 3, unlocked: true, color: "#E8C547", desc: "Earned by supporting the campus innovation community." },

  { name: "Innovator's Mark", req: "Complete 5 hackathon missions", progress: 1, total: 5, unlocked: false, color: "#E8C547", desc: "Identifies builders with proven hackathon impact." },
];

export function Certificates({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const isDark = theme === "dark";
  const [preview, setPreview] = useState<MissionCertData | null>(null);
  return (
    <div className="space-y-6 animate-slideUp">
      <div className="flex items-center gap-2">
        <Trophy className={`size-5 ${isDark ? "text-[#E8C547]" : "text-[#002147]"}`} />
        <h2 className={isDark ? "text-white" : "text-[#002147]"} style={{ fontSize: 26, fontWeight: 600 }}>Certificate Vault</h2>
      </div>
      <p className={`text-sm -mt-3 font-medium ${isDark ? "text-white/50" : "text-[#002147]/60"}`}>University-issued · shareable on your transcript and LinkedIn</p>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <FileCheck className="size-4 text-[#10E6A1]" />
          <h3 className={isDark ? "text-white" : "text-[#002147]"} style={{ fontSize: 18, fontWeight: 600 }}>Mission Completion Certificates</h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#10E6A1]/10 text-[#10E6A1] border border-[#10E6A1]/30 font-bold">{missionCerts.filter((c) => c.status === "issued").length} issued</span>
        </div>
        <p className={`text-xs mb-4 font-medium ${isDark ? "text-white/50" : "text-[#002147]/50"}`}>Auto-generated when your proof of work is approved by a Guild Master.</p>
        <div className="grid md:grid-cols-2 gap-3">
          {missionCerts.map((c) => (
            <MissionCertificateCard key={c.id} cert={c} onView={() => setPreview(c)} theme={theme} />
          ))}
        </div>
      </div>

      <div className="pt-2">
        <div className="flex items-center gap-2 mb-3">
          <Award className={`size-4 ${isDark ? "text-[#E8C547]" : "text-[#002147]"}`} />
          <h3 className={isDark ? "text-white" : "text-[#002147]"} style={{ fontSize: 18, fontWeight: 600 }}>Milestone & Leaderboard Certificates</h3>
        </div>
        <p className={`text-xs mb-4 font-medium ${isDark ? "text-white/50" : "text-[#002147]/50"}`}>Earned for ranks, leaderboard placement, and long-term achievements.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {certs.map((c) => {
          const pct = Math.min(100, (c.progress / c.total) * 100);
          return (
            <div key={c.name} className={`relative overflow-hidden rounded-2xl border p-5 backdrop-blur-xl transition hover:scale-[1.01] ${isDark ? "" : "bg-white shadow-sm"}`}
              style={{
                borderColor: c.unlocked ? (isDark ? `${c.color}50` : `${c.color}60`) : (isDark ? "rgba(255,255,255,0.10)" : "rgba(0,33,71,0.10)"),
                background: c.unlocked 
                  ? (isDark ? `linear-gradient(140deg, ${c.color}12, rgba(11,61,145,0.30))` : `linear-gradient(140deg, ${c.color}10, #FFFFFF)`) 
                  : (isDark ? "rgba(255,255,255,0.03)" : "rgba(241,244,249,0.50)"),
                boxShadow: c.unlocked ? (isDark ? `0 0 28px ${c.color}25` : `0 4px 15px ${c.color}15`) : "none",
              }}>
              {c.unlocked && <div className={`absolute -top-16 -right-16 size-48 rounded-full blur-3xl ${isDark ? "opacity-30" : "opacity-10"}`} style={{ background: c.color }} />}

              <div className="relative flex items-start gap-4">
                <div className="size-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: `${c.color}15`, border: `1px solid ${c.color}40` }}>
                  {c.unlocked ? <Award className="size-7" style={{ color: c.color }} /> : <Lock className={`size-5 ${isDark ? "text-white/40" : "text-[#002147]/40"}`} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`font-bold ${isDark ? "text-white" : "text-[#002147]"}`}>{c.name}</span>
                    {c.unlocked && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 font-bold" style={{ background: `${c.color}20`, color: isDark ? c.color : "#002147", border: `1px solid ${c.color}40` }}>
                        <Sparkles className="size-2.5" /> UNLOCKED
                      </span>
                    )}
                  </div>
                  <div className={`text-xs mt-0.5 font-bold ${isDark ? "text-white/50" : "text-[#002147]/50"}`}>{c.req}</div>
                  <p className={`text-xs mt-2 font-bold ${isDark ? "text-white/60" : "text-[#002147]/60"}`}>{c.desc}</p>

                  <div className={`mt-3 h-1.5 rounded-full overflow-hidden ${isDark ? "bg-white/5" : "bg-[#002147]/10"}`}>
                    <div className="h-full transition-all duration-700" style={{ width: `${pct}%`, background: c.color, boxShadow: isDark ? `0 0 10px ${c.color}` : "none" }} />
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className={`text-[10px] tabular-nums font-bold ${isDark ? "text-white/50" : "text-[#002147]/50"}`}>{c.progress.toLocaleString()} / {c.total.toLocaleString()}</span>
                    <button className={`text-xs px-3 py-1 rounded-lg border transition font-bold ${isDark ? "" : "hover:shadow-md"}`} style={{ color: isDark ? c.color : "#002147", borderColor: isDark ? `${c.color}40` : "#00214720", background: isDark ? `${c.color}10` : "#00214708" }}>
                      {c.unlocked ? "View Certificate" : "Keep Earning"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {preview && <MissionCertificatePreview cert={preview} onClose={() => setPreview(null)} theme={theme} />}
    </div>
  );
}
