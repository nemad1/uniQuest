import { useState } from "react";
import { Home, Wallet as WalletIcon, User, Trophy, Award, ListChecks, GraduationCap, Bell, Search, ArrowLeft, LogOut, Repeat, Moon, Sun, Sparkles, Shield } from "lucide-react";
import { Mission } from "./components/types";
import { Landing } from "./components/Landing";
import { GuildConsole } from "./components/GuildConsole";
import { VanguardDashboard } from "./components/vanguard/Dashboard";
import { MissionList } from "./components/vanguard/MissionList";
import { Leaderboard } from "./components/vanguard/Leaderboard";
import { Certificates } from "./components/vanguard/Certificates";
import { WalletDark } from "./components/vanguard/WalletDark";
import { MissionDetailDark } from "./components/vanguard/MissionDetailDark";
import { ContextForgeModal } from "./components/vanguard/ContextForgeModal";
import { VerifiedPortfolioModal } from "./components/vanguard/VerifiedPortfolioModal";
import { RANKS, getRank } from "./components/vanguard/ranks";

type Role = null | "vanguard" | "guild";
type Scope = "university" | "club";
type Tab = "downtown" | "missions" | "wallet" | "leaderboard" | "certificates" | "profile";

const TABS: { v: Tab; l: string; Icon: any }[] = [
  { v: "downtown", l: "Downtown", Icon: Home },
  { v: "missions", l: "Missions", Icon: ListChecks },
  { v: "wallet", l: "Wallet", Icon: WalletIcon },
  { v: "leaderboard", l: "Leaderboard", Icon: Trophy },
  { v: "certificates", l: "Certificates", Icon: Award },
  { v: "profile", l: "Profile", Icon: User },
];

const POINTS = 2450;

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [role, setRole] = useState<Role>(null);
  const [scope, setScope] = useState<Scope>("university");
  const [isCommittee, setIsCommittee] = useState(false);
  const [tab, setTab] = useState<Tab>("downtown");
  const [active, setActive] = useState<Mission | null>(null);
  const [showPortfolio, setShowPortfolio] = useState(false);

  const isDark = theme === "dark";

  if (role === null)
    return (
      <Landing
        onEnter={(r, s, committee) => {
          setRole(r);
          if (s) setScope(s);
          if (committee) setIsCommittee(true);
        }}
      />
    );

  if (role === "guild")
    return (
      <GuildConsole
        scope={scope}
        canSwitch={isCommittee}
        onSwitch={() => setRole("vanguard")}
        onBack={() => { setRole(null); setIsCommittee(false); }}
      />
    );

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-[#E8C547] selection:text-[#0A1530] ${isDark ? "bg-[#050B1F] text-white" : "bg-[#F1F4F9] text-[#002147]"}`}>
      <style>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes popIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
      `}</style>

      <BackgroundMap theme={theme} />
      
      <div className="relative z-10">
        <Header 
          theme={theme} 
          setTheme={setTheme} 
          onSwitch={() => { setRole(null); setIsCommittee(false); }} 
          isCommittee={isCommittee}
          onSwitchWorkspace={() => setRole("guild")}
        />
        
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6">
          <SideNav tab={tab} setTab={setTab} theme={theme} />
          
          <main className="flex-1 min-w-0 pb-24 lg:pb-0">
            {tab !== "downtown" && (
              <button
                onClick={() => setTab("downtown")}
                className={`inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border mb-4 transition font-bold ${isDark ? "bg-white/[0.04] border-white/10 text-white/70 hover:text-white" : "bg-white border-[#002147]/10 text-[#002147]/70 hover:bg-[#F1F4F9]"}`}
              >
                <ArrowLeft className="size-3.5" /> Back to Downtown
              </button>
            )}

            {tab === "downtown" && (
              <VanguardDashboard 
                theme={theme} 
                onOpenMissions={() => setTab("missions")}
                onOpenLeaderboard={() => setTab("leaderboard")}
                onOpenCerts={() => setTab("certificates")} 
                onOpenPortfolio={() => setShowPortfolio(true)}
              />
            )}
            {tab === "missions" && <MissionList theme={theme} onOpen={setActive} />}
            {tab === "wallet" && <WalletDark theme={theme} />}
            {tab === "leaderboard" && <Leaderboard theme={theme} />}
            {tab === "certificates" && <Certificates theme={theme} />}
            {tab === "profile" && <Profile theme={theme} />}
          </main>
        </div>

        <MobileDock tab={tab} setTab={setTab} theme={theme} />
        
        {active && (
          <MissionDetailDark 
            mission={active} 
            theme={theme}
            onClose={() => setActive(null)} 
            onComplete={() => {
              setActive(null);
              setTab("certificates");
            }}
          />
        )}
        
        {showPortfolio && (
          <VerifiedPortfolioModal 
            theme={theme}
            onClose={() => setShowPortfolio(false)} 
          />
        )}
      </div>
    </div>
  );
}

function Header({ theme, setTheme, onSwitch, isCommittee, onSwitchWorkspace }: { theme: "dark" | "light"; setTheme: (t: "dark" | "light") => void; onSwitch: () => void; isCommittee: boolean; onSwitchWorkspace: () => void }) {
  const isDark = theme === "dark";
  const rank = getRank(POINTS);
  return (
    <header className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-500 ${isDark ? "bg-[#050B1F]/80 border-white/10" : "bg-white/80 border-[#002147]/10"}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`size-10 rounded-2xl flex items-center justify-center transition-transform hover:scale-110 ${isDark ? "bg-gradient-to-br from-[#0B3D91] to-[#1E5FBF] shadow-[0_0_20px_rgba(11,61,145,0.4)]" : "bg-gradient-to-br from-[#002147] to-[#004B91] shadow-lg"}`}>
            <Shield className="size-6 text-[#E8C547]" />
          </div>
          <div className="hidden sm:block">
            <h1 className={`text-lg font-bold leading-none ${isDark ? "text-white" : "text-[#002147]"}`}>Student Vanguard</h1>
            <p className={`text-[10px] uppercase tracking-widest mt-0.5 font-bold ${isDark ? "text-white/40" : "text-[#002147]/40"}`}>Northbridge University</p>
          </div>
        </div>

        <div className={`flex-1 max-w-md hidden md:flex items-center gap-3 px-4 h-10 rounded-xl border transition-all ${isDark ? "bg-white/[0.04] border-white/10 focus-within:border-[#E8C547]/50" : "bg-[#F1F4F9] border-[#002147]/10 focus-within:border-[#002147]/30"}`}>
          <Search className={`size-4 ${isDark ? "text-white/40" : "text-[#002147]/40"}`} />
          <input type="text" placeholder="Search missions, clubs, or students..." className={`bg-transparent border-none outline-none text-sm w-full ${isDark ? "text-white placeholder:text-white/30" : "text-[#002147] placeholder:text-[#002147]/30"}`} />
        </div>

        <div className="flex items-center gap-2">
          {isCommittee && (
            <button onClick={onSwitchWorkspace} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition font-bold text-sm ${isDark ? "bg-[#E8C547]/10 border-[#E8C547]/30 text-[#E8C547] hover:bg-[#E8C547]/20" : "bg-[#002147]/5 border-[#002147]/20 text-[#002147] hover:bg-[#002147]/10"}`}>
              <Repeat className="size-4" />
              <span className="hidden lg:inline">Switch Workspace</span>
            </button>
          )}

          <button onClick={onSwitch} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition font-bold text-sm ${isDark ? "bg-white/[0.04] border-white/10 text-white/70 hover:text-white hover:border-white/30" : "bg-white border-[#FF6B6B]/10 text-[#FF6B6B] hover:bg-[#FF6B6B]/5 hover:border-[#FF6B6B]/30"}`}>
            <LogOut className="size-4" />
            <span className="hidden lg:inline">Log out</span>
          </button>
          
          <div className={`h-6 w-px mx-1 ${isDark ? "bg-white/10" : "bg-[#002147]/10"}`} />
          
          <button onClick={() => setTheme(isDark ? "light" : "dark")} className={`size-10 rounded-xl border flex items-center justify-center transition hover:scale-105 ${isDark ? "bg-white/[0.04] border-white/10 text-[#E8C547]" : "bg-white border-[#002147]/10 text-[#002147]"}`}>
            {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>

          <button className={`relative size-10 rounded-xl border flex items-center justify-center transition ${isDark ? "bg-white/[0.04] border-white/10" : "bg-white border-[#002147]/10"}`}>
            <Bell className={`size-4 ${isDark ? "text-white/70" : "text-[#002147]/70"}`} />
            <span className={`absolute top-2.5 right-2.5 size-2 rounded-full bg-[#E8C547] ring-2 ${isDark ? "ring-[#050B1F]" : "ring-white"}`} />
          </button>

          <div className={`size-10 rounded-xl border p-0.5 ${isDark ? "border-[#E8C547]/30" : "border-[#002147]/10"}`}>
             <div className={`w-full h-full rounded-lg flex items-center justify-center font-bold text-xs ${isDark ? "bg-[#0B3D91] text-white" : "bg-[#002147] text-white"}`}>HM</div>
          </div>
        </div>
      </div>
    </header>
  );
}

function SideNav({ tab, setTab, theme }: { tab: Tab; setTab: (t: Tab) => void; theme: "dark" | "light" }) {
  const isDark = theme === "dark";
  return (
    <aside className={`hidden lg:block sticky top-24 self-start space-y-1 p-3 rounded-2xl border backdrop-blur-xl h-fit w-56 ${isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-[#002147]/10 shadow-sm"}`}>
      {TABS.map(({ v, l, Icon }) => {
        const active = tab === v;
        return (
          <button
            key={v}
            onClick={() => setTab(v)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition font-bold ${
              active
                ? (isDark ? "bg-gradient-to-r from-[#E8C547]/15 to-transparent text-[#E8C547] border-[#E8C547]/30" : "bg-[#002147]/5 text-[#002147] border-[#002147]/10")
                : (isDark ? "text-white/60 hover:text-white hover:bg-white/[0.04] border-transparent" : "text-[#002147]/60 hover:text-[#002147] hover:bg-[#F1F4F9] border-transparent")
            } border`}
          >
            <Icon className="size-4" />
            <span>{l}</span>
            {active && <span className={`ml-auto size-1.5 rounded-full ${isDark ? "bg-[#E8C547]" : "bg-[#002147]"}`} />}
          </button>
        );
      })}

      <div className={`mt-3 pt-3 border-t px-3 py-2 text-[11px] font-bold ${isDark ? "border-white/5 text-white/40" : "border-[#002147]/10 text-[#002147]/40"}`}>
        ARCHITECT · Steering active
      </div>
    </aside>
  );
}

function MobileDock({ tab, setTab, theme }: { tab: Tab; setTab: (t: Tab) => void; theme: "dark" | "light" }) {
  const isDark = theme === "dark";
  const items = TABS.filter((t) => ["downtown", "missions", "leaderboard", "certificates", "profile"].includes(t.v));
  return (
    <nav className={`lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 p-1.5 rounded-2xl backdrop-blur-md border shadow-2xl ${isDark ? "bg-[#0A1530]/90 border-white/10" : "bg-white/95 border-[#002147]/10"}`}>
      {items.map(({ v, l, Icon }) => {
        const active = tab === v;
        return (
          <button
            key={v}
            onClick={() => setTab(v)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition font-bold ${active ? (isDark ? "bg-[#E8C547]/15 text-[#E8C547]" : "bg-[#002147]/5 text-[#002147]") : (isDark ? "text-white/50 hover:text-white" : "text-[#002147]/50 hover:text-[#002147]")}`}
          >
            <Icon className="size-4" />
            <span className="text-[10px]">{l}</span>
          </button>
        );
      })}
    </nav>
  );
}

function Profile({ theme }: { theme: "dark" | "light" }) {
  const [showForge, setShowForge] = useState(false);
  const isDark = theme === "dark";
  const rank = getRank(POINTS);

  const studentData = {
    name: "Haitham Mansour",
    major: "Computer Science",
    year: "Junior",
    rank: rank.label,
    points: POINTS,
    skills: ["React", "Java", "UI/UX Design", "Project Management"],
    missions: [
      { title: "Decoration Team", desc: "International Culture Night", points: 650 },
      { title: "Weekly Bonus", desc: "Vanguard consistency reward", points: 150 },
      { title: "Hackathon Organizer", desc: "Managed tech logistics", points: 400 },
    ],
    certs: [
      { name: "Peer Mentor Certificate", issuer: "Office of Student Affairs" },
      { name: "Hackathon Organizer", issuer: "Northbridge Tech Club" },
    ]
  };

  return (
    <div className="space-y-5 animate-slideUp">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <User className={`size-5 ${isDark ? "text-[#08E8F0]" : "text-[#002147]"}`} />
          <h2 className={isDark ? "text-white" : "text-[#002147]"} style={{ fontSize: 26, fontWeight: 600 }}>Profile</h2>
        </div>
        <button 
          onClick={() => setShowForge(true)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition shadow-lg ${isDark ? "bg-[#E8C547]/20 border border-[#E8C547]/40 text-[#E8C547] hover:bg-[#E8C547]/30" : "bg-[#002147] text-white hover:bg-[#003366]"}`}
        >
          <Sparkles className="size-4" /> Forge AI Context
        </button>
      </div>

      <div className={`rounded-3xl border backdrop-blur-xl p-6 flex items-center gap-5 flex-wrap ${isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-[#002147]/10 shadow-sm"}`}>
        <div className={`size-20 rounded-2xl bg-gradient-to-br ${isDark ? "from-[#0B3D91] to-[#1E5FBF] border-[#E8C547]/40 shadow-[0_0_20px_rgba(11,61,145,0.3)]" : "from-[#002147] to-[#004B91] border-[#002147]/20 shadow-lg"} border flex items-center justify-center text-2xl text-white font-bold`}>HM</div>
        <div className="flex-1 min-w-[200px]">
          <div className={`font-bold ${isDark ? "text-white" : "text-[#002147]"}`} style={{ fontSize: 22 }}>Haitham Mansour</div>
          <div className={`text-xs font-bold ${isDark ? "text-white/50" : "text-[#002147]/50"}`}>CS · Junior · @haitham_m</div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {studentData.skills.map((s) => (
              <span key={s} className={`text-[10px] px-2.5 py-1 rounded-lg border font-bold ${isDark ? "bg-[#08E8F0]/10 text-[#08E8F0] border-[#08E8F0]/25" : "bg-[#002147]/5 text-[#002147] border-[#002147]/20"}`}>#{s}</span>
            ))}
          </div>
        </div>
        <div className="text-right">
          <div className={`text-[10px] uppercase tracking-widest font-bold ${isDark ? "text-white/40" : "text-[#002147]/40"}`}>Vanguard Rank</div>
          <div className="text-lg font-bold" style={{ color: isDark ? rank.color : "#002147" }}>{rank.label}</div>
          <div className={`text-xs font-bold mt-1 ${isDark ? "text-[#E8C547]" : "text-[#002147]"}`}>{POINTS.toLocaleString()} pts</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[{ l: "Missions", v: "12", c: "#08E8F0" }, { l: "Earned", v: "$340", c: "#10E6A1" }, { l: "Rating", v: "4.9★", c: "#E8C547" }].map((s) => (
          <div key={s.l} className={`p-4 rounded-2xl border text-center transition hover:scale-[1.02] ${isDark ? "bg-white/[0.03] border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.2)]" : "bg-white border-[#002147]/10 shadow-sm"}`}>
            <div className="font-bold" style={{ fontSize: 24, color: isDark ? "white" : "#002147" }}>{s.v}</div>
            <div className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? "text-white/40" : "text-[#002147]/50"}`}>{s.l}</div>
          </div>
        ))}
      </div>

      {showForge && (
        <ContextForgeModal 
          studentData={studentData} 
          onClose={() => setShowForge(false)} 
          theme={theme}
        />
      )}
    </div>
  );
}

function BackgroundMap({ theme }: { theme: "dark" | "light" }) {
  const isDark = theme === "dark";
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className={`absolute inset-0 ${isDark ? "opacity-[0.08]" : "opacity-[0.04]"}`}
        style={{
          backgroundImage:
            "linear-gradient(rgba(232,197,71,0.20) 1px, transparent 1px), linear-gradient(90deg, rgba(8,232,240,0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at top, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at top, black 20%, transparent 80%)",
        }}
      />
      <div className={`absolute -top-40 -right-40 size-[600px] rounded-full blur-[120px] ${isDark ? "opacity-15 bg-[#E8C547]" : "opacity-10 bg-[#E8C547]"}`} />
      <div className={`absolute top-40 -left-40 size-[600px] rounded-full blur-[120px] ${isDark ? "opacity-20 bg-[#0B3D91]" : "opacity-10 bg-[#002147]"}`} />
    </div>
  );
}

