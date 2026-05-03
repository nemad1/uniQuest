import { Award, Shield, QrCode, X, Download, Send, Sparkles } from "lucide-react";

export type MissionCertSignerType = "university" | "club" | "department";

export interface MissionCertData {
  id: string;
  certId: string;
  title: string;
  studentName: string;
  missionTitle: string;
  campaignName?: string;
  missionCategory: string;
  categoryColor: string;
  pointsEarned: number;
  volunteerHours?: number;
  completionDate: string;
  issuingOrganization: string;
  signerType: MissionCertSignerType;
  clubSupervisor?: string;
  clubPresident?: string;
  departmentRepresentative?: string;
  status: "pending" | "issued";
}

export function MissionCertificateCard({
  cert,
  compact,
  onView,
  theme = "dark",
}: {
  cert: MissionCertData;
  compact?: boolean;
  onView: () => void;
  theme?: "dark" | "light";
}) {
  const isDark = theme === "dark";
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border backdrop-blur-xl p-5 transition hover:scale-[1.01] ${isDark ? "" : "bg-white shadow-sm"}`}
      style={{
        borderColor: cert.status === "issued" ? (isDark ? `${cert.categoryColor}55` : `${cert.categoryColor}60`) : (isDark ? "rgba(255,255,255,0.10)" : "rgba(0,33,71,0.10)"),
        background:
          cert.status === "issued"
            ? (isDark ? `linear-gradient(140deg, ${cert.categoryColor}12, rgba(11,61,145,0.30))` : `linear-gradient(140deg, ${cert.categoryColor}10, #FFFFFF)`)
            : (isDark ? "rgba(255,255,255,0.03)" : "rgba(241,244,249,0.50)"),
        boxShadow: cert.status === "issued" ? (isDark ? `0 0 24px ${cert.categoryColor}22` : `0 4px 15px ${cert.categoryColor}15`) : "none",
      }}
    >
      {cert.status === "issued" && (
        <div
          className={`absolute -top-16 -right-16 size-48 rounded-full blur-3xl ${isDark ? "opacity-30" : "opacity-10"}`}
          style={{ background: cert.categoryColor }}
        />
      )}
      <div className="relative flex items-start gap-4">
        <div
          className="size-14 rounded-2xl flex items-center justify-center shrink-0"
          style={{ background: `${cert.categoryColor}15`, border: `1px solid ${cert.categoryColor}40` }}
        >
          <Award className="size-7" style={{ color: cert.categoryColor }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`font-bold ${isDark ? "text-white" : "text-[#002147]"}`}>{cert.title}</span>
            {cert.status === "issued" ? (
              <span
                className="text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 font-bold"
                style={{
                  background: `${cert.categoryColor}20`,
                  color: isDark ? cert.categoryColor : "#002147",
                  border: `1px solid ${cert.categoryColor}40`,
                }}
              >
                <Sparkles className="size-2.5" /> ISSUED
              </span>
            ) : (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FF9F43]/15 text-[#FF9F43] border border-[#FF9F43]/30 font-bold">
                PENDING APPROVAL
              </span>
            )}
          </div>
          <div className={`text-xs mt-0.5 font-bold ${isDark ? "text-white/60" : "text-[#002147]/60"}`}>{cert.missionTitle}</div>
          {!compact && (
            <div className={`text-[11px] mt-2 grid grid-cols-2 gap-1 ${isDark ? "text-white/50" : "text-[#002147]/50"}`}>
              <span className="font-bold">Issuer: {cert.issuingOrganization}</span>
              <span className="font-bold">Date: {cert.completionDate}</span>
              <span className="col-span-2 tabular-nums font-bold opacity-70">ID: {cert.certId}</span>
            </div>
          )}
          <button
            onClick={onView}
            className={`mt-3 text-xs px-3 py-1.5 rounded-lg border transition font-bold ${isDark ? "" : "hover:shadow-md"}`}
            style={{
              color: isDark ? cert.categoryColor : "#002147",
              borderColor: isDark ? `${cert.categoryColor}40` : "#00214720",
              background: isDark ? `${cert.categoryColor}10` : "#00214708",
            }}
          >
            View Certificate
          </button>
        </div>
      </div>
    </div>
  );
}

export function MissionCertificatePreview({ cert, onClose, theme = "dark", isClubView = false }: { cert: MissionCertData; onClose: () => void; theme?: "dark" | "light"; isClubView?: boolean }) {
  const isDark = theme === "dark";
  const signers: { name: string; role: string }[] = [
    { name: "Dr. Lena Mason", role: "Student Affairs Director" },
  ];
  if (cert.signerType === "club") {
    signers.push({ name: cert.clubSupervisor || "Prof. R. Tanaka", role: "Club Supervisor" });
    signers.push({ name: cert.clubPresident || "Alex Chen", role: "Club President" });
  } else if (cert.signerType === "department") {
    signers.push({ name: cert.departmentRepresentative || "Dr. K. Iyer", role: "Department Representative" });
  }

  return (
    <div
      className={`fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto ${isDark ? "bg-[#050B1F]/85" : "bg-[#002147]/40"}`}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-3xl w-full my-auto"
        style={{ animation: "popIn 0.25s ease-out" }}
      >
        <div className={`relative rounded-2xl overflow-hidden border-2 shadow-2xl ${isDark ? "border-[#E8C547]" : "border-[#002147]"}`}>
          <div
            className="absolute inset-0"
            style={{
              background: isDark 
                ? "radial-gradient(circle at top left, rgba(232,197,71,0.18), transparent 50%), radial-gradient(circle at bottom right, rgba(8,232,240,0.12), transparent 50%), linear-gradient(180deg, #0A1530 0%, #050B1F 100%)"
                : "radial-gradient(circle at top left, rgba(0,33,71,0.05), transparent 50%), #FFFFFF",
            }}
          />
          <div
            className={`absolute inset-3 rounded-xl pointer-events-none border ${isDark ? "border-[#E8C547]/35" : "border-[#002147]/20"}`}
          />
          <div
            className={`absolute inset-5 rounded-lg pointer-events-none border ${isDark ? "border-[#E8C547]/18" : "border-[#002147]/10"}`}
          />

          <button
            onClick={onClose}
            className={`absolute top-3 right-3 z-10 size-8 rounded-full border flex items-center justify-center transition ${isDark ? "bg-white/5 hover:bg-white/10 border-white/10 text-white/70" : "bg-black/5 hover:bg-black/10 border-black/10 text-black/70"}`}
          >
            <X className="size-4" />
          </button>

          <div className="relative p-10 sm:p-12 text-center">
            <div className="flex items-center justify-center gap-2">
              <div className={`size-10 rounded-xl border flex items-center justify-center shadow-lg ${isDark ? "bg-[#0B3D91] border-[#E8C547]/50 shadow-[0_0_18px_rgba(232,197,71,0.35)]" : "bg-[#002147] border-[#002147]/20"}`}>
                <Shield className="size-5 text-[#E8C547]" />
              </div>
              <div className="text-left leading-tight">
                <div className={`text-[10px] tracking-[0.3em] font-bold uppercase ${isDark ? "text-[#E8C547]" : "text-[#002147]"}`}>Downtown</div>
                <div className={`text-xs font-bold ${isDark ? "text-white/70" : "text-[#002147]/70"}`}>{cert.issuingOrganization}</div>
              </div>
            </div>

            <div className={`mt-7 text-[10px] tracking-[0.4em] uppercase font-bold ${isDark ? "text-white/50" : "text-[#002147]/40"}`}>Certificate of</div>
            <div className={`${isDark ? "text-[#E8C547]" : "text-[#002147]"}`} style={{ fontSize: 30, fontWeight: 700, letterSpacing: 1 }}>
              {cert.title}
            </div>

            <div className={`mt-6 text-sm font-bold ${isDark ? "text-white/70" : "text-[#002147]/70"}`}>This certificate is awarded to</div>
            <div
              className={`mt-2 mx-auto inline-block px-6 pb-1 border-b ${isDark ? "border-[#E8C547]/40 text-white" : "border-[#002147]/40 text-[#002147]"}`}
              style={{ fontSize: 32, fontWeight: 600, fontFamily: "serif" }}
            >
              {cert.studentName}
            </div>

            <p className={`mt-5 text-sm max-w-xl mx-auto leading-relaxed font-bold ${isDark ? "text-white/70" : "text-[#002147]/70"}`}>
              For successfully completing the mission{" "}
              <span className={isDark ? "text-white font-bold underline decoration-[#E8C547]/30" : "text-[#002147] font-bold underline decoration-[#002147]/30"}>"{cert.missionTitle}"</span>
              {cert.campaignName ? (
                <>
                  {" "}under <span className={isDark ? "text-white font-bold" : "text-[#002147] font-bold"}>{cert.campaignName}</span>
                </>
              ) : null}
              , contributing to the university community through service, leadership, and engagement.
            </p>

            <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
              <Detail label="Category" value={cert.missionCategory} color={isDark ? cert.categoryColor : "#002147"} isDark={isDark} />
              <Detail label="Points" value={`+${cert.pointsEarned}`} color={isDark ? "#E8C547" : "#002147"} isDark={isDark} />
              <Detail
                label="Volunteer Hrs"
                value={cert.volunteerHours ? `+${cert.volunteerHours}h` : "—"}
                color={isDark ? "#10E6A1" : "#006644"}
                isDark={isDark}
              />
              <Detail label="Completion" value={cert.completionDate} isDark={isDark} />
            </div>

            <div className="mt-10 flex items-end justify-between gap-6 flex-wrap">
              <div className="flex flex-wrap gap-8">
                {signers.map((s) => (
                  <div key={s.role} className="text-left">
                    <div
                      className={`${isDark ? "text-[#E8C547]/90" : "text-[#002147]"} italic mb-1`}
                      style={{ fontFamily: "cursive", fontSize: 20 }}
                    >
                      {s.name}
                    </div>
                    <div className={`border-t w-44 ${isDark ? "border-white/30" : "border-[#002147]/30"}`} />
                    <div className={`text-[10px] mt-1 font-bold ${isDark ? "text-white/60" : "text-[#002147]/60"}`}>{s.role}</div>
                  </div>
                ))}
              </div>

              <div className="text-right">
                <div className={`size-16 rounded-md border flex items-center justify-center ml-auto ${isDark ? "bg-white/[0.04] border-white/15" : "bg-[#F1F4F9] border-[#002147]/10"}`}>
                  <QrCode className={`size-10 ${isDark ? "text-white/60" : "text-[#002147]/60"}`} />
                </div>
                <div className={`text-[10px] mt-1 font-bold ${isDark ? "text-white/50" : "text-[#002147]/50"}`}>Verify online</div>
              </div>
            </div>

            <div className={`mt-8 pt-4 border-t flex items-center justify-between text-[10px] font-bold ${isDark ? "border-white/10 text-white/50" : "border-[#002147]/10 text-[#002147]/50"}`}>
              <span className="tabular-nums tracking-wider">Certificate ID · {cert.certId}</span>
              <span>Issued {cert.completionDate}</span>
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2 justify-end">
          <button className={`text-sm px-4 py-2 rounded-xl border flex items-center gap-2 transition font-bold ${isDark ? "bg-white/[0.05] border-white/10 text-white/80 hover:border-white/30" : "bg-white border-[#002147]/10 text-[#002147]/80 hover:bg-[#F1F4F9]"}`}>
            <Download className="size-4" /> Download PDF
          </button>
          {isClubView && (
            <button className={`text-sm px-4 py-2 rounded-xl border flex items-center gap-2 font-bold transition ${isDark ? "bg-[#08E8F0]/10 border-[#08E8F0]/40 text-[#08E8F0] hover:bg-[#08E8F0]/20" : "bg-[#002147]/5 border-[#002147]/10 text-[#002147] hover:bg-[#002147]/10"}`}>
              <Send className="size-4" /> Send to Student Profile
            </button>
          )}
          <button
            onClick={onClose}
            className={`text-sm px-4 py-2 rounded-xl flex items-center gap-2 font-bold shadow-lg transition ${isDark ? "bg-[#E8C547] text-[#0A1530] hover:bg-[#F0D365]" : "bg-[#002147] text-white hover:bg-[#003366]"}`}
          >
            <Award className="size-4" /> Done
          </button>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value, color, isDark }: { label: string; value: string; color?: string; isDark: boolean }) {
  return (
    <div
      className={`p-2.5 rounded-lg border ${isDark ? "bg-white/[0.03] border-white/10" : "bg-[#F1F4F9] border-[#002147]/10"}`}
      style={color && isDark ? { borderColor: `${color}40` } : undefined}
    >
      <div className={`text-[9px] uppercase tracking-wider font-bold ${isDark ? "text-white/50" : "text-[#002147]/50"}`}>{label}</div>
      <div className="text-sm tabular-nums font-bold" style={{ color: color || (isDark ? "white" : "#002147") }}>
        {value}
      </div>
    </div>
  );
}
