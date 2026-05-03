import { useState } from "react";
import { Mission, MissionStatus, MISSION_CATEGORIES } from "../types";
import { X, BadgeCheck, Upload, Lock, CheckCircle2, FileCheck, Sparkles, ShieldCheck, Coins, Award, Hourglass, Shield, Flame, Zap, BookOpen } from "lucide-react";
import { MissionCertificatePreview, MissionCertData } from "../MissionCertificate";

const steps: { key: MissionStatus; label: string }[] = [
  { key: "accepted", label: "Accepted" },
  { key: "in_progress", label: "In Progress" },
  { key: "proof_submitted", label: "Proof Submitted" },
  { key: "released", label: "Reward Released" },
];

export function MissionDetailDark({ mission, onClose, onComplete, theme = "dark" }: { mission: Mission; onClose: () => void; onComplete: () => void; theme?: "dark" | "light" }) {
  const isDark = theme === "dark";
  const [status, setStatus] = useState<MissionStatus>("open");
  const [showJoin, setShowJoin] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  const [celebrate, setCelebrate] = useState(false);
  const [showCert, setShowCert] = useState(false);
  const stepIndex = steps.findIndex((s) => s.key === status);
  const cat = mission.missionCategory ? MISSION_CATEGORIES[mission.missionCategory] : null;
  const catColor = cat?.color || "#E8C547";
  const difficulty = mission.difficulty || (mission.reward >= 200 ? "Hard" : mission.reward >= 80 ? "Medium" : "Easy");
  const basePoints = mission.reward * 4;
  const diffBonus = difficulty === "Hard" ? 50 : difficulty === "Medium" ? 20 : 0;
  const urgencyBonus = mission.urgency === "high" ? 30 : mission.urgency === "medium" ? 10 : 0;
  const points = basePoints + diffBonus + urgencyBonus;

  function handleJoin() {
    setShowJoin(false);
    setStatus("accepted");
    setTimeout(() => setStatus("in_progress"), 600);
  }
  function handleSubmit() {
    setStatus("proof_submitted");
    setTimeout(() => {
      setStatus("released");
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 3000);
    }, 1500);
  }

  const mockCert: MissionCertData = {
    id: "temp-cert",
    certId: `DWT-MC-2026-${Math.floor(Math.random() * 100000).toString().padStart(6, "0")}`,
    title: "Mission Completion Certificate",
    studentName: "Haitham Mansour",
    missionTitle: mission.title,
    missionCategory: mission.missionCategory ? MISSION_CATEGORIES[mission.missionCategory].label : "Campus Mission",
    categoryColor: catColor,
    pointsEarned: points,
    volunteerHours: mission.volunteerHours || 0,
    completionDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    issuingOrganization: mission.club || "Northbridge University",
    signerType: mission.certificateSignerType || "club",
    clubSupervisor: mission.clubSupervisor || "Prof. R. Tanaka",
    clubPresident: mission.clubPresident || "Alex Chen",
    status: "issued",
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center backdrop-blur-sm ${isDark ? "bg-[#050B1F]/80" : "bg-[#002147]/40"}`} onClick={onClose}>
      <div className={`relative w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl max-h-[92vh] overflow-y-auto shadow-2xl border ${isDark ? "bg-[#0A1530] border-white/10" : "bg-white border-[#002147]/10"}`} onClick={(e) => e.stopPropagation()} style={{ animation: "slideUp 0.3s ease-out" }}>
        {celebrate && (
          <div className={`absolute inset-0 z-20 flex items-center justify-center backdrop-blur-sm pointer-events-none ${isDark ? "bg-[#0A1530]/90" : "bg-white/90"}`}>
            <div className="text-center" style={{ animation: "popIn 0.5s ease-out" }}>
              <div className="size-24 mx-auto rounded-full bg-gradient-to-br from-[#E8C547] to-[#F5DD7A] text-[#0A1530] flex items-center justify-center shadow-[0_0_40px_rgba(232,197,71,0.6)]">
                <Sparkles className="size-12" />
              </div>
              <div className={`mt-4 font-bold text-xl ${isDark ? "text-white" : "text-[#002147]"}`}>Mission Complete!</div>
              <div className="mt-1 text-[#E8C547] font-bold">+{points} points · ${mission.reward} credited</div>
            </div>
          </div>
        )}

        <div className={`sticky top-0 backdrop-blur border-b px-5 py-3 flex items-center justify-between z-10 ${isDark ? "bg-[#0A1530]/95 border-white/10" : "bg-white/95 border-[#002147]/10"}`}>
          <div className="flex items-center gap-2 text-xs flex-wrap">
            {cat && (
              <span
                className="px-2 py-0.5 rounded-full border font-bold"
                style={{ background: `${catColor}1A`, color: isDark ? catColor : "#002147", borderColor: `${catColor}55` }}
              >
                {cat.label}
              </span>
            )}
            <span className={`font-bold ${isDark ? "text-white/60" : "text-[#002147]/60"}`}>{mission.club}</span>
            {mission.verified && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#08E8F0]/10 text-[#08E8F0] border border-[#08E8F0]/30 font-bold">
                <BadgeCheck className="size-3" /> Verified
              </span>
            )}
          </div>
          <button onClick={onClose} className={`size-8 rounded-full flex items-center justify-center transition ${isDark ? "hover:bg-white/5 text-white/60" : "hover:bg-black/5 text-[#002147]/60"}`}>
            <X className="size-4" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div>
            <h2 className={`font-bold ${isDark ? "text-white" : "text-[#002147]"}`} style={{ fontSize: 24 }}>{mission.title}</h2>
            <p className={`mt-2 text-sm leading-relaxed font-medium ${isDark ? "text-white/60" : "text-[#002147]/70"}`}>{mission.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Stat icon={<Coins className="size-3.5" />} label="Points" value={`+${points}`} accent isDark={isDark} />
            <Stat label="Money" value={mission.moneyReward ? `RM ${mission.moneyReward}` : "—"} isDark={isDark} />
            <Stat label="Volunteer" value={mission.volunteerHours ? `+${mission.volunteerHours}h` : "—"} isDark={isDark} />
          </div>

          <div className="p-4 rounded-xl border" style={{ background: `${catColor}0F`, borderColor: `${catColor}40` }}>
            <div className="text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5 font-bold" style={{ color: isDark ? catColor : "#002147" }}>
              <Sparkles className="size-3.5" /> Reward Breakdown
            </div>
            <div className="space-y-1.5 text-sm">
              <BreakRow icon={<Coins className="size-3.5" />} label="Base points" value={`+${basePoints}`} isDark={isDark} />
              <BreakRow icon={<Zap className="size-3.5" />} label={`Difficulty bonus (${difficulty})`} value={diffBonus ? `+${diffBonus}` : "—"} isDark={isDark} />
              <BreakRow icon={<Flame className="size-3.5" />} label={`Urgency bonus (${mission.urgency})`} value={urgencyBonus ? `+${urgencyBonus}` : "—"} isDark={isDark} />
              <div className={`h-px my-1 ${isDark ? "bg-white/10" : "bg-[#002147]/10"}`} />
              <div className="flex items-center justify-between p-2 rounded-lg" style={{ background: `${catColor}1F` }}>
                <span className={`font-bold ${isDark ? "text-white/80" : "text-[#002147]/80"}`}>Total points</span>
                <span className="font-bold" style={{ color: isDark ? catColor : "#002147", fontSize: 18 }}>+{points}</span>
              </div>
              {mission.certificateProgress && (
                <BreakRow icon={<Award className="size-3.5 text-[#10E6A1]" />} label="Certificate progress" value={mission.certificateProgress} valueColor="#10E6A1" isDark={isDark} />
              )}
              {mission.badge && (
                <BreakRow icon={<Shield className="size-3.5" style={{ color: isDark ? catColor : "#002147" }} />} label="Badge reward" value={mission.badge} valueColor={isDark ? catColor : "#002147"} isDark={isDark} />
              )}
              {mission.volunteerHours && (
                <BreakRow icon={<Hourglass className={`size-3.5 ${isDark ? "text-white/60" : "text-[#002147]/60"}`} />} label="Volunteer hours" value={`+${mission.volunteerHours}h`} isDark={isDark} />
              )}
            </div>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? "bg-white/[0.03] border-white/10" : "bg-[#F1F4F9] border-[#002147]/10"}`}>
            <div className={`text-xs mb-3 uppercase tracking-wider font-bold ${isDark ? "text-white/50" : "text-[#002147]/50"}`}>Progress</div>
            <div className="flex items-center">
              {steps.map((s, i) => {
                const done = i <= stepIndex;
                const active = i === stepIndex;
                return (
                  <div key={s.key} className="flex-1 flex items-center">
                    <div className="flex flex-col items-center gap-1">
                      <div className={`size-8 rounded-full flex items-center justify-center text-xs transition-all font-bold ${done ? "bg-[#E8C547] text-[#0A1530] shadow-sm" : (isDark ? "bg-white/5 text-white/40" : "bg-[#002147]/5 text-[#002147]/40")} ${active ? "ring-4 ring-[#E8C547]/20" : ""}`}>
                        {done ? <CheckCircle2 className="size-4" /> : i + 1}
                      </div>
                      <div className={`text-[10px] text-center leading-tight font-bold ${done ? (isDark ? "text-white/80" : "text-[#002147]/80") : (isDark ? "text-white/40" : "text-[#002147]/40")}`}>{s.label}</div>
                    </div>
                    {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-1 mb-4 ${i < stepIndex ? "bg-[#E8C547]" : (isDark ? "bg-white/10" : "bg-[#002147]/10")}`} />}
                  </div>
                );
              })}
            </div>
          </div>

          {status === "open" && (
            <button onClick={() => setShowJoin(true)} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E8C547] to-[#F5DD7A] text-[#0A1530] font-bold hover:shadow-[0_0_24px_rgba(232,197,71,0.5)] active:scale-[0.99] transition shadow-md">
              Accept Mission · +{points} pts{mission.moneyReward ? ` · RM ${mission.moneyReward}` : ""}
            </button>
          )}

          {(status === "accepted" || status === "in_progress") && (
            <ProofZone files={files} setFiles={setFiles} onSubmit={handleSubmit} isDark={isDark} />
          )}

          {status === "proof_submitted" && (
            <div className={`p-4 rounded-xl border text-sm flex items-center gap-2 font-bold ${isDark ? "bg-[#E8C547]/10 border-[#E8C547]/30 text-[#E8C547]" : "bg-[#E8C547]/15 border-[#E8C547]/30 text-[#002147]"}`}>
              <FileCheck className="size-4" /> Awaiting club admin verification…
            </div>
          )}

          {status === "released" && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-[#10E6A1]/10 border border-[#10E6A1]/30 text-[#10E6A1] flex items-center gap-2 font-bold">
                <Award className="size-4" /> +{points} points{mission.moneyReward ? ` + RM ${mission.moneyReward}` : ""} credited{mission.certificateProgress ? ` · ${mission.certificateProgress} issued` : ""}.
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setShowCert(true)}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#08E8F0] to-[#10E6A1] text-[#04121E] text-sm font-bold hover:shadow-[0_0_20px_rgba(8,232,240,0.4)] transition shadow-lg"
                >
                  <Award className="size-4" /> View My Certificate
                </button>
                <button
                  onClick={onComplete}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-bold transition ${isDark ? "bg-white/[0.05] border-white/10 text-white hover:bg-white/10" : "bg-white border-[#002147]/10 text-[#002147] hover:bg-[#F1F4F9]"}`}
                >
                  <BookOpen className="size-4" /> View All My Certificates
                </button>
              </div>
            </div>
          )}

          <div className={`p-3 rounded-xl border text-xs flex items-start gap-2 font-medium ${isDark ? "bg-[#10E6A1]/5 border-[#10E6A1]/20 text-[#10E6A1]/90" : "bg-[#10E6A1]/10 border-[#10E6A1]/30 text-[#006644]"}`}>
            <ShieldCheck className="size-4 mt-0.5 shrink-0" />
            Posted by a verified Guild Master. No deposit required — rewards are released directly after admin approval of your proof.
          </div>
        </div>

        {showJoin && (
          <div className={`absolute inset-0 z-30 flex items-center justify-center p-4 ${isDark ? "bg-[#050B1F]/90" : "bg-[#002147]/60"}`} onClick={() => setShowJoin(false)}>
            <div onClick={(e) => e.stopPropagation()} className={`w-full max-w-sm p-6 rounded-2xl border shadow-2xl ${isDark ? "bg-[#0A1530] border-white/10" : "bg-white border-[#002147]/10"}`} style={{ animation: "popIn 0.2s ease-out" }}>
              <div className="size-14 rounded-2xl bg-[#10E6A1]/15 text-[#10E6A1] border border-[#10E6A1]/30 flex items-center justify-center mb-4">
                <BadgeCheck className="size-6" />
              </div>
              <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-[#002147]"}`}>Accept this mission?</h3>
              <p className={`text-sm mt-1 font-medium ${isDark ? "text-white/60" : "text-[#002147]/60"}`}>Posted by a verified Guild Master · no deposit needed.</p>
              <div className="mt-5 space-y-2 text-sm">
                <Row label="Points reward" value={`+${points} pts`} accent isDark={isDark} />
                {mission.moneyReward ? <Row label="Optional money" value={`RM ${mission.moneyReward}`} isDark={isDark} /> : null}
                {mission.volunteerHours ? <Row label="Volunteer hours" value={`+${mission.volunteerHours}h`} isDark={isDark} /> : null}
                {mission.certificateProgress ? <Row label="Certificate" value={mission.certificateProgress} isDark={isDark} /> : null}
              </div>
              <div className="mt-6 flex gap-3">
                <button onClick={() => setShowJoin(false)} className={`flex-1 py-2.5 rounded-xl border font-bold transition ${isDark ? "border-white/10 text-white/70 hover:bg-white/5" : "border-[#002147]/10 text-[#002147]/70 hover:bg-[#F1F4F9]"}`}>Cancel</button>
                <button onClick={handleJoin} className="flex-1 py-2.5 rounded-xl bg-[#E8C547] text-[#0A1530] font-bold hover:bg-[#F0D365] transition shadow-lg">Accept</button>
              </div>
            </div>
          </div>
        )}
        {showCert && <MissionCertificatePreview cert={mockCert} onClose={() => setShowCert(false)} theme={theme} />}
      </div>
    </div>
  );
}

function Stat({ icon, label, value, accent, isDark }: { icon?: React.ReactNode; label: string; value: string; accent?: boolean; isDark: boolean }) {
  return (
    <div className={`p-3 rounded-xl border transition ${accent ? "bg-[#E8C547]/10 border-[#E8C547]/30" : (isDark ? "bg-white/[0.03] border-white/10" : "bg-[#F1F4F9] border-[#002147]/10")}`}>
      <div className={`text-[10px] uppercase tracking-wider font-bold flex items-center gap-1 ${isDark ? "text-white/50" : "text-[#002147]/50"}`}>{icon}{label}</div>
      <div className={`font-bold mt-0.5 ${accent ? (isDark ? "text-[#E8C547]" : "text-[#002147]") : (isDark ? "text-white" : "text-[#002147]")}`}>{value}</div>
    </div>
  );
}

function BreakRow({ icon, label, value, valueColor, isDark }: { icon?: React.ReactNode; label: string; value: string; valueColor?: string; isDark: boolean }) {
  return (
    <div className="flex items-center justify-between text-xs font-medium">
      <span className={`flex items-center gap-1.5 ${isDark ? "text-white/60" : "text-[#002147]/60"}`}>{icon}{label}</span>
      <span className="tabular-nums font-bold" style={{ color: valueColor || (isDark ? "white" : "#002147") }}>{value}</span>
    </div>
  );
}

function Row({ label, value, accent, isDark }: { label: string; value: string; accent?: boolean; isDark: boolean }) {
  return (
    <div className={`flex items-center justify-between p-2.5 rounded-lg font-medium ${isDark ? "bg-white/[0.04]" : "bg-[#002147]/5"}`}>
      <span className={isDark ? "text-white/60" : "text-[#002147]/60"}>{label}</span>
      <span className={`font-bold ${accent ? (isDark ? "text-[#E8C547]" : "text-[#002147]") : (isDark ? "text-white" : "text-[#002147]")}`}>{value}</span>
    </div>
  );
}

function ProofZone({ files, setFiles, onSubmit, isDark }: { files: string[]; setFiles: (f: string[]) => void; onSubmit: () => void; isDark: boolean }) {
  const [drag, setDrag] = useState(false);
  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); setFiles([...files, ...Array.from(e.dataTransfer.files).map(f => f.name)]); }}
        className={`p-6 rounded-xl border-2 border-dashed text-center transition-all ${drag ? "border-[#E8C547] bg-[#E8C547]/10" : (isDark ? "border-white/15 bg-white/[0.02]" : "border-[#002147]/15 bg-[#002147]/5")}`}
      >
        <Upload className={`size-7 mx-auto ${isDark ? "text-[#E8C547]" : "text-[#002147]"}`} />
        <div className={`mt-2 text-sm font-bold ${isDark ? "text-white/80" : "text-[#002147]/80"}`}>Drop proof of work here</div>
        <div className={`text-xs font-medium ${isDark ? "text-white/50" : "text-[#002147]/50"}`}>Photos, code, or links — encrypted at rest</div>
        <button onClick={() => setFiles([...files, `proof_${files.length + 1}.png`])} className={`mt-3 text-xs px-3 py-1.5 rounded-lg border transition font-bold ${isDark ? "bg-white/5 border-white/10 hover:border-[#E8C547]/50 text-white/80" : "bg-white border-[#002147]/10 hover:border-[#E8C547]/50 text-[#002147]/80"}`}>
          Or browse files
        </button>
      </div>
      {files.length > 0 && (
        <div className="space-y-1.5">
          {files.map((f, i) => (
            <div key={i} className={`flex items-center gap-2 text-xs p-2.5 rounded-lg border font-medium ${isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-[#002147]/10"}`}>
              <FileCheck className="size-4 text-[#10E6A1]" />
              <span className={`flex-1 truncate ${isDark ? "text-white/80" : "text-[#002147]/80"}`}>{f}</span>
              <span className="text-[#10E6A1] font-bold">Uploaded</span>
            </div>
          ))}
        </div>
      )}
      <button disabled={files.length === 0} onClick={onSubmit} className="w-full py-3.5 rounded-xl bg-[#E8C547] text-[#0A1530] font-bold hover:bg-[#F0D365] disabled:bg-white/5 disabled:text-white/30 transition shadow-md">
        Submit Proof
      </button>
    </div>
  );
}


