import { useState } from "react";
import { Mission, MissionStatus } from "./types";
import { X, BadgeCheck, Upload, Lock, CheckCircle2, FileCheck, Sparkles, ShieldCheck } from "lucide-react";

const steps: { key: MissionStatus; label: string }[] = [
  { key: "accepted", label: "Accepted" },
  { key: "in_progress", label: "In Progress" },
  { key: "proof_submitted", label: "Proof Submitted" },
  { key: "released", label: "Reward Released" },
];

export function MissionDetail({ mission, onClose }: { mission: Mission; onClose: () => void }) {
  const [status, setStatus] = useState<MissionStatus>("open");
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [proofFiles, setProofFiles] = useState<string[]>([]);
  const [celebrate, setCelebrate] = useState(false);

  const stepIndex = steps.findIndex((s) => s.key === status);

  function handleJoin() {
    setShowJoinModal(false);
    setStatus("accepted");
    setTimeout(() => setStatus("in_progress"), 600);
  }

  function handleSubmitProof() {
    setStatus("proof_submitted");
    setTimeout(() => {
      setStatus("released");
      setCelebrate(true);
    }, 1500);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative bg-white w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl max-h-[92vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "slideUp 0.3s ease-out" }}
      >
        {celebrate && <Celebration onDone={() => setCelebrate(false)} />}

        <div className="sticky top-0 bg-white/90 backdrop-blur border-b border-slate-200 px-5 py-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>{mission.club}</span>
            {mission.verified && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-[#0B3D91] border border-blue-200">
                <BadgeCheck className="size-3" /> University Verified
              </span>
            )}
          </div>
          <button onClick={onClose} className="size-8 rounded-full hover:bg-slate-100 flex items-center justify-center">
            <X className="size-4" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div>
            <h2 className="text-slate-900">{mission.title}</h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{mission.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Stat label="Reward" value={`$${mission.reward}`} accent />
            <Stat label="Deposit" value={`$${mission.deposit}`} />
            <Stat label="Applicants" value={mission.applicants.toString()} />
          </div>

          <Stepper currentIndex={stepIndex} />

          {status === "open" && (
            <button
              onClick={() => setShowJoinModal(true)}
              className="w-full py-3 rounded-xl bg-[#0B3D91] text-white hover:bg-[#0A2E6E] active:scale-[0.99] transition shadow-md"
            >
              Join Mission
            </button>
          )}

          {(status === "accepted" || status === "in_progress") && (
            <ProofZone files={proofFiles} setFiles={setProofFiles} onSubmit={handleSubmitProof} />
          )}

          {status === "proof_submitted" && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800 flex items-center gap-2">
              <FileCheck className="size-4" /> Awaiting club admin verification…
            </div>
          )}

          {status === "released" && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="size-4" /> Reward of ${mission.reward} released to your wallet.
            </div>
          )}

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 flex items-start gap-2">
            <ShieldCheck className="size-4 text-[#0B3D91] mt-0.5 shrink-0" />
            <span>All financial movement is held in escrow and audit-logged. Funds release only after admin approval per <code className="px-1 rounded bg-white">EscrowService</code>.</span>
          </div>
        </div>

        {showJoinModal && (
          <JoinModal mission={mission} onClose={() => setShowJoinModal(false)} onConfirm={handleJoin} />
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`p-3 rounded-xl border ${accent ? "bg-amber-50 border-amber-200" : "bg-slate-50 border-slate-200/80"}`}>
      <div className="text-xs text-slate-500">{label}</div>
      <div className={accent ? "text-[#9C7A1F]" : "text-slate-900"}>{value}</div>
    </div>
  );
}

function Stepper({ currentIndex }: { currentIndex: number }) {
  return (
    <div className="p-4 rounded-xl bg-white border border-slate-200/80">
      <div className="text-xs text-slate-500 mb-3 uppercase tracking-wider">Progress</div>
      <div className="flex items-center">
        {steps.map((s, i) => {
          const done = i <= currentIndex;
          const active = i === currentIndex;
          return (
            <div key={s.key} className="flex-1 flex items-center">
              <div className="flex flex-col items-center gap-1">
                <div className={`size-7 rounded-full flex items-center justify-center text-xs transition-all ${done ? "bg-[#0B3D91] text-white" : "bg-slate-100 text-slate-400"} ${active ? "ring-4 ring-blue-100" : ""}`}>
                  {done ? <CheckCircle2 className="size-4" /> : i + 1}
                </div>
                <div className={`text-[10px] text-center leading-tight ${done ? "text-slate-700" : "text-slate-400"}`}>{s.label}</div>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-1 mb-4 transition-all ${i < currentIndex ? "bg-[#0B3D91]" : "bg-slate-200"}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProofZone({ files, setFiles, onSubmit }: { files: string[]; setFiles: (f: string[]) => void; onSubmit: () => void }) {
  const [drag, setDrag] = useState(false);
  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); setFiles([...files, ...Array.from(e.dataTransfer.files).map(f => f.name)]); }}
        className={`p-6 rounded-xl border-2 border-dashed text-center transition-all ${drag ? "border-[#0B3D91] bg-blue-50" : "border-slate-300 bg-slate-50"}`}
      >
        <Upload className="size-6 mx-auto text-[#0B3D91]" />
        <div className="mt-2 text-sm text-slate-700">Drop proof of work here</div>
        <div className="text-xs text-slate-500">Photos, code snippets, links — encrypted at rest</div>
        <button
          onClick={() => setFiles([...files, `proof_${files.length + 1}.png`])}
          className="mt-3 text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-[#0B3D91]"
        >
          Or browse files
        </button>
      </div>
      {files.length > 0 && (
        <div className="space-y-1.5">
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-2 text-xs p-2 rounded-lg bg-white border border-slate-200">
              <FileCheck className="size-4 text-emerald-600" />
              <span className="flex-1 truncate">{f}</span>
              <span className="text-emerald-600">Uploaded</span>
            </div>
          ))}
        </div>
      )}
      <button
        disabled={files.length === 0}
        onClick={onSubmit}
        className="w-full py-3 rounded-xl bg-[#C9A227] text-white hover:bg-[#B8901C] disabled:bg-slate-200 disabled:text-slate-400 transition shadow-md"
      >
        Submit Proof
      </button>
    </div>
  );
}

function JoinModal({ mission, onClose, onConfirm }: { mission: Mission; onClose: () => void; onConfirm: () => void }) {
  return (
    <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-xl" style={{ animation: "popIn 0.2s ease-out" }}>
        <div className="size-12 rounded-full bg-blue-50 text-[#0B3D91] flex items-center justify-center mb-3">
          <Lock className="size-5" />
        </div>
        <h3 className="text-slate-900">Confirm commitment</h3>
        <p className="text-sm text-slate-600 mt-1">Funds move into escrow until verification.</p>
        <div className="mt-4 space-y-2 text-sm">
          <Row label="Your deposit (held)" value={`$${mission.deposit}`} />
          <Row label="Reward on success" value={`$${mission.reward}`} accent />
          <Row label="Refund if cancelled in 1h" value="100%" />
        </div>
        <div className="mt-5 flex gap-2">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-[#0B3D91] text-white hover:bg-[#0A2E6E]">Lock & Join</button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
      <span className="text-slate-600">{label}</span>
      <span className={accent ? "text-[#9C7A1F]" : "text-slate-900"}>{value}</span>
    </div>
  );
}

function Celebration({ onDone }: { onDone: () => void }) {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/80 backdrop-blur-sm pointer-events-none" onAnimationEnd={onDone}>
      <div className="text-center" style={{ animation: "popIn 0.5s ease-out" }}>
        <div className="size-20 mx-auto rounded-full bg-gradient-to-br from-[#C9A227] to-[#E8C547] text-white flex items-center justify-center shadow-xl">
          <Sparkles className="size-10" />
        </div>
        <div className="mt-3 text-slate-900">Mission Complete!</div>
        <div className="text-sm text-slate-600">Reward credited to your wallet</div>
      </div>
    </div>
  );
}
