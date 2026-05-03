import { useEffect, useState } from "react";
import { GraduationCap, Lock, Mail, ArrowRight, ShieldCheck, Loader2, Check, KeyRound, Sparkles, Shield, Users, Sun, Moon } from "lucide-react";
import { RequestClubWorkspaceModal } from "./guild/AccountsAccess";

type Stage = "login" | "verify" | "select";
type Identity = "staff" | "student" | "committee";

function classify(email: string): Identity {
  const e = email.toLowerCase();
  if (/staff|faculty|dean|registrar|admin|dept/.test(e)) return "staff";
  if (/club|chair|committee|president|society|guild/.test(e)) return "committee";
  return "student";
}

export function Landing({ onEnter }: { onEnter: (role: "vanguard" | "guild", scope?: "university" | "club", committee?: boolean) => void }) {
  const [stage, setStage] = useState<Stage>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [identity, setIdentity] = useState<Identity>("student");
  const [requesting, setRequesting] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const isDark = theme === "dark";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIdentity(email ? classify(email) : "student");
    setStage("verify");
  }

  function handleVerified() {
    if (identity === "student") onEnter("vanguard");
    else if (identity === "staff") onEnter("guild", "university");
    else setStage("select");
  }

  return (
    <div className={`size-full overflow-y-auto relative transition-colors duration-500 selection:bg-[#E8C547] selection:text-[#0A1530] ${isDark ? "bg-[#050B1F] text-white" : "bg-[#F1F4F9] text-[#002147]"}`}>
      <BackgroundMap theme={theme} />

      <div className="relative max-w-[1100px] mx-auto px-6 sm:px-8 py-8 min-h-full flex flex-col">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`size-11 rounded-xl bg-gradient-to-br ${isDark ? "from-[#0B3D91] to-[#0A2E6E] shadow-[0_0_24px_rgba(11,61,145,0.5)]" : "from-[#002147] to-[#003366] shadow-lg"} flex items-center justify-center transition-transform hover:scale-105`}>
              <GraduationCap className="size-5 text-[#E8C547]" />
            </div>
            <div>
              <div className={`font-bold tracking-tight ${isDark ? "text-white" : "text-[#002147]"}`}>DOWNTOWN</div>
              <div className={`text-[10px] uppercase tracking-widest font-bold ${isDark ? "text-white/40" : "text-[#002147]/40"}`}>Campus Recognition Hub</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setTheme(isDark ? "light" : "dark")} className={`size-10 rounded-xl border flex items-center justify-center transition hover:scale-105 ${isDark ? "bg-white/[0.04] border-white/10 text-[#E8C547]" : "bg-white border-[#002147]/10 text-[#002147]"}`}>
              {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <div className={`hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold ${isDark ? "text-white/40" : "text-[#002147]/40"}`}>
              <ShieldCheck className="size-3.5 text-[#10E6A1]" />
              SECURE ACCESS
            </div>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center py-10">
          {stage === "login" && (
            <LoginCard
              email={email}
              password={password}
              error={error}
              setEmail={setEmail}
              setPassword={setPassword}
              onSubmit={submit}
              onRequestAccess={() => setRequesting(true)}
              isDark={isDark}
            />
          )}
          {stage === "verify" && <VerifyCard identity={identity} onDone={handleVerified} isDark={isDark} />}
          {stage === "select" && (
            <SelectCard
              onPick={(r) => onEnter(r, r === "guild" ? "club" : undefined, true)}
              onBack={() => setStage("login")}
              onRequest={() => setRequesting(true)}
              isDark={isDark}
            />
          )}
        </div>

        {requesting && <RequestClubWorkspaceModal onClose={() => setRequesting(false)} />}

        <Footer isDark={isDark} />
      </div>
    </div>
  );
}

function LoginCard({
  email, password, error, setEmail, setPassword, onSubmit, onRequestAccess, isDark
}: {
  email: string; password: string; error: string | null;
  setEmail: (s: string) => void; setPassword: (s: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onRequestAccess: () => void;
  isDark: boolean;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className={`w-full max-w-md rounded-3xl border backdrop-blur-xl p-8 shadow-2xl transition-all duration-500 ${isDark ? "border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.45)]" : "border-[#002147]/10 bg-white shadow-[0_20px_50px_rgba(0,33,71,0.1)]"}`}
      style={{ 
        background: isDark ? "linear-gradient(160deg, rgba(11,61,145,0.35) 0%, rgba(8,232,240,0.06) 60%, rgba(5,11,31,0.6) 100%)" : undefined, 
        animation: "popIn 0.4s ease-out" 
      }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <Sparkles className={`size-4 ${isDark ? "text-[#E8C547]" : "text-[#002147]"}`} />
        <span className={`text-[10px] uppercase tracking-[0.3em] font-bold ${isDark ? "text-[#E8C547]" : "text-[#002147]/60"}`}>Nexus Authorization</span>
      </div>
      <h1 className={`font-bold ${isDark ? "text-white" : "text-[#002147]"}`} style={{ fontSize: 32, lineHeight: 1.1 }}>Welcome to Downtown</h1>
      <p className={`text-sm mt-3 leading-relaxed font-medium ${isDark ? "text-white/60" : "text-[#002147]/60"}`}>
        Sign in with your university credentials to enter the campus mission grid.
      </p>

      <div className="mt-8 space-y-4">
        <Field icon={<Mail className="size-4" />} label="University Email" isDark={isDark}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@university.edu"
            className={`w-full bg-transparent outline-none text-sm font-bold ${isDark ? "text-white placeholder:text-white/30" : "text-[#002147] placeholder:text-[#002147]/30"}`}
          />
        </Field>
        <Field icon={<Lock className="size-4" />} label="Password" isDark={isDark}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className={`w-full bg-transparent outline-none text-sm font-bold ${isDark ? "text-white placeholder:text-white/30" : "text-[#002147] placeholder:text-[#002147]/30"}`}
          />
        </Field>
      </div>

      {error && (
        <div className="mt-4 text-xs font-bold text-[#FF6B6B] bg-[#FF6B6B]/10 border border-[#FF6B6B]/30 rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-[#E8C547] to-[#F5DD7A] text-[#0A1530] font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_24px_rgba(232,197,71,0.5)] active:scale-[0.98] transition shadow-lg"
      >
        Enter Dashboard <ArrowRight className="size-4" />
      </button>

      <div className="my-5 flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold">
        <span className={`flex-1 h-px ${isDark ? "bg-white/10" : "bg-[#002147]/10"}`} /> 
        <span className={isDark ? "text-white/20" : "text-[#002147]/30"}>Secure Connection</span> 
        <span className={`flex-1 h-px ${isDark ? "bg-white/10" : "bg-[#002147]/10"}`} />
      </div>

      <button
        type="button"
        onClick={() => { setEmail("sso@university.edu"); setPassword("ssotoken"); }}
        className={`w-full py-3.5 rounded-xl border flex items-center justify-center gap-2 font-bold text-sm transition-all hover:shadow-md ${isDark ? "bg-[#0B3D91] text-white border-[#08E8F0]/40 hover:border-[#08E8F0]" : "bg-white text-[#002147] border-[#002147]/20 hover:bg-[#F1F4F9]"}`}
      >
        <KeyRound className="size-4 text-[#08E8F0]" /> SSO Single Sign-On
      </button>

      <div className="mt-6 flex flex-col gap-2 items-center text-xs font-bold">
        <button type="button" onClick={onRequestAccess} className={`hover:underline ${isDark ? "text-[#E8C547]" : "text-[#002147]"}`}>Request Club or Department Workspace</button>
        <button type="button" className={`transition ${isDark ? "text-white/40 hover:text-white" : "text-[#002147]/70 hover:text-[#002147]"}`}>Forgot access credentials?</button>
      </div>
    </form>
  );
}

function Field({ icon, label, children, isDark }: { icon: React.ReactNode; label: string; children: React.ReactNode; isDark: boolean }) {
  return (
    <label className="block">
      <div className={`text-[10px] uppercase tracking-widest font-bold mb-1.5 ${isDark ? "text-white/50" : "text-[#002147]/50"}`}>{label}</div>
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${isDark ? "bg-white/[0.04] border-white/10 focus-within:border-[#E8C547]/60" : "bg-[#F1F4F9] border-[#002147]/10 focus-within:border-[#002147]/30 focus-within:bg-white"}`}>
        <span className={isDark ? "text-white/30" : "text-[#002147]/30"}>{icon}</span>
        {children}
      </div>
    </label>
  );
}

function VerifyCard({ identity, onDone, isDark }: { identity: Identity; onDone: () => void; isDark: boolean }) {
  const steps = [
    "Verifying university email",
    "Checking staff or student status",
    "Checking club committee access",
    "Loading secure workspace",
  ];
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= steps.length) {
      const t = setTimeout(onDone, 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), 700);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <div
      className={`w-full max-w-md rounded-3xl border backdrop-blur-xl p-8 text-center shadow-2xl transition-all duration-500 ${isDark ? "border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.45)]" : "border-[#002147]/10 bg-white shadow-[0_20px_50px_rgba(0,33,71,0.1)]"}`}
      style={{ 
        background: isDark ? "linear-gradient(160deg, rgba(11,61,145,0.35) 0%, rgba(232,197,71,0.08) 60%, rgba(5,11,31,0.6) 100%)" : undefined, 
        animation: "popIn 0.3s ease-out" 
      }}
    >
      <div className={`size-16 mx-auto rounded-2xl border flex items-center justify-center shadow-lg ${isDark ? "bg-[#E8C547]/15 border-[#E8C547]/30" : "bg-[#002147]/5 border-[#002147]/10"}`}>
        <ShieldCheck className={`size-8 ${isDark ? "text-[#E8C547]" : "text-[#002147]"}`} />
      </div>
      <h2 className={`mt-5 font-bold ${isDark ? "text-white" : "text-[#002147]"}`} style={{ fontSize: 24 }}>Authenticating…</h2>
      <p className={`text-sm mt-1 font-medium ${isDark ? "text-white/50" : "text-[#002147]/50"}`}>Role Detected: <span className="text-[#08E8F0] uppercase tracking-wider font-bold">{identity}</span></p>

      <div className="mt-8 space-y-2.5 text-left">
        {steps.map((label, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <div
              key={label}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 font-bold ${
                done
                  ? (isDark ? "bg-[#10E6A1]/10 border-[#10E6A1]/30" : "bg-[#10E6A1]/10 border-[#10E6A1]/20")
                  : active
                  ? (isDark ? "bg-[#E8C547]/10 border-[#E8C547]/30" : "bg-[#002147]/5 border-[#002147]/20")
                  : (isDark ? "bg-white/[0.03] border-white/10" : "bg-[#F1F4F9] border-[#002147]/5")
              }`}
            >
              <div className="size-8 rounded-full flex items-center justify-center">
                {done ? (
                  <Check className="size-4 text-[#10E6A1]" />
                ) : active ? (
                  <Loader2 className={`size-4 animate-spin ${isDark ? "text-[#E8C547]" : "text-[#002147]"}`} />
                ) : (
                  <span className={`size-2 rounded-full ${isDark ? "bg-white/20" : "bg-[#002147]/20"}`} />
                )}
              </div>
              <span className={`text-sm ${done ? (isDark ? "text-white" : "text-[#006644]") : active ? (isDark ? "text-white" : "text-[#002147]") : (isDark ? "text-white/30" : "text-[#002147]/30")}`}>{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SelectCard({ onPick, onBack, onRequest, isDark }: { onPick: (r: "vanguard" | "guild") => void; onBack: () => void; onRequest: () => void; isDark: boolean }) {
  return (
    <div className="w-full max-w-2xl" style={{ animation: "popIn 0.3s ease-out" }}>
      <div className="text-center mb-8">
        <h2 className={`font-bold ${isDark ? "text-white" : "text-[#002147]"}`} style={{ fontSize: 32 }}>Choose your terminal</h2>
        <p className={`text-sm mt-1 font-medium ${isDark ? "text-white/60" : "text-[#002147]/60"}`}>Privileged committee access active. Select a workspace to begin.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <WorkspaceCard
          color="#08E8F0"
          icon={<Sparkles className="size-6" />}
          title="Vanguard"
          desc="Student dashboard for missions, mentorship, and credentials."
          onClick={() => onPick("vanguard")}
          isDark={isDark}
        />
        <WorkspaceCard
          color="#E8C547"
          icon={<Shield className="size-6" />}
          title="Guild"
          desc="Club administration for mission oversight and recognition."
          badge="Committee Access"
          onClick={() => onPick("guild")}
          isDark={isDark}
        />
      </div>
      <div className="mt-8 flex flex-col items-center gap-3 text-xs font-bold">
        <div className="flex items-center gap-4">
           <button onClick={onBack} className={`transition ${isDark ? "text-white/50 hover:text-white" : "text-[#002147]/50 hover:text-[#002147]"}`}>← Return to login</button>
           <span className={isDark ? "text-white/10" : "text-[#002147]/10"}>|</span>
           <button onClick={onRequest} className={`hover:underline ${isDark ? "text-[#E8C547]" : "text-[#002147]"}`}>Register new club workspace</button>
        </div>
      </div>
    </div>
  );
}

function WorkspaceCard({
  color, icon, title, desc, badge, onClick, isDark
}: { color: string; icon: React.ReactNode; title: string; desc: string; badge?: string; onClick: () => void; isDark: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`group text-left p-8 rounded-3xl border backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] ${isDark ? "border-white/10 hover:border-white/30" : "bg-white border-[#002147]/10 hover:border-[#002147]/30 shadow-lg"}`}
      style={{ 
        background: isDark ? `linear-gradient(160deg, rgba(11,61,145,0.4), ${color}10 70%, rgba(5,11,31,0.6))` : undefined
      }}
    >
      <div className="size-12 rounded-xl flex items-center justify-center border shadow-sm transition-transform group-hover:scale-110" style={{ background: `${color}15`, borderColor: `${color}40`, color }}>
        {icon}
      </div>
      <div className="mt-5 flex items-center gap-3">
        <span className={`font-bold ${isDark ? "text-white" : "text-[#002147]"}`} style={{ fontSize: 20 }}>{title}</span>
        {badge && (
          <span className={`text-[9px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-wider ${isDark ? "bg-[#E8C547]/20 text-[#E8C547] border-[#E8C547]/40" : "bg-[#002147]/10 text-[#002147] border-[#002147]/20"}`}>
            {badge}
          </span>
        )}
      </div>
      <p className={`text-sm mt-2 leading-relaxed font-medium ${isDark ? "text-white/60" : "text-[#002147]/60"}`}>{desc}</p>
      <div className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color }}>
        ENTER HUB <ArrowRight className="size-3.5 group-hover:translate-x-2 transition-transform" />
      </div>
    </button>
  );
}

function Footer({ isDark }: { isDark: boolean }) {
  return (
    <div className={`mt-10 pt-6 border-t flex flex-wrap items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.2em] ${isDark ? "border-white/10 text-white/30" : "border-[#002147]/10 text-[#002147]/40"}`}>
      <div className="flex items-center gap-4">
        <span>© 2026 Northbridge University</span>
        <span>·</span>
        <span>Downtown Recognition Network</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-[#10E6A1] shadow-[0_0_8px_#10E6A1]" /> SYSTEM NOMINAL</span>
      </div>
    </div>
  );
}

function BackgroundMap({ theme }: { theme: "dark" | "light" }) {
  const isDark = theme === "dark";
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${isDark ? "opacity-[0.15]" : "opacity-[0.05]"}`}
        style={{
          backgroundImage:
            `linear-gradient(${isDark ? "rgba(8,232,240,0.18)" : "rgba(0,33,71,0.1)"} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? "rgba(8,232,240,0.18)" : "rgba(0,33,71,0.1)"} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />
      <div className={`absolute -top-40 -right-40 size-[600px] rounded-full blur-[120px] transition-opacity duration-1000 ${isDark ? "opacity-20 bg-[#E8C547]" : "opacity-10 bg-[#E8C547]"}`} />
      <div className={`absolute top-40 -left-40 size-[600px] rounded-full blur-[120px] transition-opacity duration-1000 ${isDark ? "opacity-25 bg-[#0B3D91]" : "opacity-10 bg-[#002147]"}`} />
      
      <svg viewBox="0 0 1440 900" className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${isDark ? "opacity-[0.15]" : "opacity-[0.05]"}`}>
        {[
          [200, 200, 320, 280],
          [620, 200, 260, 180],
          [920, 220, 180, 220],
          [180, 540, 240, 220],
          [820, 540, 200, 240],
        ].map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx={12} fill="none" stroke={isDark ? "rgba(8,232,240,0.4)" : "rgba(0,33,71,0.2)"} strokeWidth={1.5} />
        ))}
      </svg>
    </div>
  );
}
