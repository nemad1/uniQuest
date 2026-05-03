import { useState } from "react";
import { X, Sparkles } from "lucide-react";

export function PostMissionModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [reward, setReward] = useState(50);
  const [urgency, setUrgency] = useState<"low" | "medium" | "high">("medium");
  const [skills, setSkills] = useState<string[]>([]);

  const SKILL_OPTIONS = ["Design", "Leadership", "Marketing", "Technical", "Communication"];

  const toggleSkill = (s: string) => {
    setSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl shadow-2xl p-5 max-h-[90vh] overflow-y-auto" style={{ animation: "slideUp 0.3s ease-out" }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="size-9 rounded-lg bg-gradient-to-br from-[#0B3D91] to-[#1E5FBF] text-white flex items-center justify-center">
              <Sparkles className="size-4" />
            </div>
            <h3 className="text-slate-900 font-semibold">Post a mission</h3>
          </div>
          <button onClick={onClose} className="size-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
            <X className="size-4 text-slate-500" />
          </button>
        </div>

        <div className="space-y-4">
          <Field label="Title">
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Need designer for hackathon poster" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 outline-none focus:border-[#0B3D91] transition-colors" />
          </Field>

          <Field label={`Reward · $${reward}`}>
            <input type="range" min={10} max={500} step={5} value={reward} onChange={(e) => setReward(Number(e.target.value))} className="w-full accent-[#0B3D91]" />
          </Field>

          <Field label="Urgency">
            <div className="flex gap-1.5">
              {(["low", "medium", "high"] as const).map((u) => (
                <button
                  key={u}
                  onClick={() => setUrgency(u)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium capitalize border transition-all ${urgency === u ? "bg-[#0B3D91] text-white border-[#0B3D91] shadow-sm" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
                >
                  {u}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Skills Developed">
            <div className="flex flex-wrap gap-2">
              {SKILL_OPTIONS.map((s) => {
                const isActive = skills.includes(s);
                return (
                  <button
                    key={s}
                    onClick={() => toggleSkill(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${isActive ? "bg-[#10E6A1]/15 text-[#006644] border-[#10E6A1]/40" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
            <div className="text-[10px] text-slate-400 mt-1.5">Select the skills volunteers will gain to help build their Verified Impact Portfolio.</div>
          </Field>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 leading-relaxed">
            ${Math.round(reward * 0.05)} platform fee held in escrow. Released to runner on verification.
          </div>

          <button onClick={onClose} className="w-full py-3 rounded-xl bg-[#0B3D91] text-white font-medium hover:bg-[#0A2E6E] shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
            Lock funds & publish
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-medium text-slate-500 mb-1.5">{label}</div>
      {children}
    </div>
  );
}
