import { useEffect, useState } from "react";
import { Flame, Trophy, Zap, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { icon: Trophy, title: "Spring Hackathon 2026", reward: "$2,400 prize pool", tag: "12 missions live", accent: "from-[#0B3D91] to-[#1E5FBF]" },
  { icon: Flame, title: "Urgent: Robotics Showcase tonight", reward: "$60 · same-day payout", tag: "11 applicants", accent: "from-[#C9A227] to-[#E8C547]" },
  { icon: Zap, title: "FinTech Guild — Build & Earn", reward: "$240 react sprint", tag: "Verified club", accent: "from-[#0B3D91] to-[#0A2E6E]" },
];

export function HypeBanner() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);
  const s = slides[i];
  const Icon = s.icon;
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${s.accent} text-white p-5 shadow-lg`}>
      <div className="absolute -right-8 -top-8 size-40 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -left-6 -bottom-10 size-32 rounded-full bg-white/10 blur-2xl" />
      <div className="relative flex items-center gap-4">
        <div className="size-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
          <Icon className="size-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs uppercase tracking-widest text-white/70">Featured</div>
          <div className="truncate">{s.title}</div>
          <div className="text-sm text-white/80">{s.reward} · {s.tag}</div>
        </div>
        <div className="hidden sm:flex gap-1">
          <button onClick={() => setI((p) => (p - 1 + slides.length) % slides.length)} className="size-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition">
            <ChevronLeft className="size-4" />
          </button>
          <button onClick={() => setI((p) => (p + 1) % slides.length)} className="size-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition">
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
      <div className="relative mt-4 flex gap-1.5">
        {slides.map((_, idx) => (
          <div key={idx} className={`h-1 rounded-full transition-all ${idx === i ? "w-8 bg-white" : "w-3 bg-white/40"}`} />
        ))}
      </div>
    </div>
  );
}
