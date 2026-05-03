import { useState } from "react";
import {
  Shield, ArrowLeft, LogOut, BadgeCheck, BarChart3, FileCheck, Sparkles, Coins, TrendingUp, Eye, Edit3, X, Check,
  Megaphone, Building2, LayoutDashboard, ListChecks, Award, Users, Trophy, Settings as SettingsIcon, Bell, Repeat,
  Hourglass, ShieldCheck, PenLine,
} from "lucide-react";
import { missions } from "./data";
import { MISSION_CATEGORIES, MissionCategory } from "./types";
import { MissionCertificatePreview, MissionCertData } from "./MissionCertificate";
import { CampaignsSection } from "./guild/Campaigns";
import { AccountsAccessSection } from "./guild/AccountsAccess";

type GuildTab =
  | "dashboard" | "campaigns" | "missions" | "proofs"
  | "certificates" | "students" | "leaderboard" | "accounts" | "settings";

export function GuildConsole({ onBack, scope = "university", canSwitch, onSwitch }: { onBack: () => void; scope?: "university" | "club"; canSwitch?: boolean; onSwitch?: () => void }) {
  const isUniversity = scope === "university";
  const [tab, setTab] = useState<GuildTab>("dashboard");

  const nav: { v: GuildTab; l: string; Icon: any; staffOnly?: boolean; badge?: number }[] = [
    { v: "dashboard", l: "Dashboard", Icon: LayoutDashboard },
    { v: "campaigns", l: "Campaigns", Icon: Megaphone },
    { v: "missions", l: "Missions", Icon: ListChecks },
    { v: "proofs", l: "Proof Reviews", Icon: FileCheck, badge: 9 },
    { v: "certificates", l: "Certificates", Icon: Award },
    { v: "students", l: "Students", Icon: Users },
    { v: "leaderboard", l: "Leaderboard", Icon: Trophy },
    { v: "accounts", l: "Accounts & Access", Icon: Building2, staffOnly: true },
    { v: "settings", l: "Settings", Icon: SettingsIcon },
  ];
  const visibleNav = nav.filter((n) => !n.staffOnly || isUniversity);

  return (
    <div className="size-full overflow-y-auto bg-[#050B1F] text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <header className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-[#0B3D91] border border-[#E8C547]/40 flex items-center justify-center">
              <Shield className="size-4 text-[#E8C547]" />
            </div>
            <div>
              <div className="text-sm flex items-center gap-2">
                {isUniversity ? "Northbridge University" : "ACM Student Chapter"}
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${isUniversity ? "bg-[#08E8F0]/10 text-[#08E8F0] border-[#08E8F0]/30" : "bg-[#E8C547]/10 text-[#E8C547] border-[#E8C547]/30"}`}>
                  {isUniversity ? "University Scope" : "Club Scope"}
                </span>
              </div>
              <div className="text-xs text-white/50 flex items-center gap-1">
                <BadgeCheck className="size-3 text-[#E8C547]" />
                {isUniversity ? "University Admin · Dr. Mason" : "Verified Guild · Priya K."}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative size-10 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#E8C547]/40 flex items-center justify-center">
              <Bell className="size-4 text-white/70" />
              <span className="absolute top-2 right-2 size-2 rounded-full bg-[#E8C547] ring-2 ring-[#050B1F]" />
            </button>
            {canSwitch && onSwitch && (
              <button onClick={onSwitch} className="flex items-center gap-1.5 px-3 h-10 rounded-xl bg-white/[0.04] border border-[#08E8F0]/30 text-[#08E8F0] hover:bg-[#08E8F0]/10 transition" title="Switch workspace">
                <Repeat className="size-4" />
                <span className="text-sm hidden sm:inline">Switch workspace</span>
              </button>
            )}
            <button onClick={onBack} className="flex items-center gap-1.5 px-3 h-10 rounded-xl bg-white/[0.04] border border-white/10 text-white/70 hover:text-[#FF6B6B] hover:border-[#FF6B6B]/40 transition">
              <LogOut className="size-4" />
              <span className="text-sm hidden sm:inline">Log out</span>
            </button>
          </div>
        </header>

        <div className="mt-6 grid lg:grid-cols-[230px_1fr] gap-6">
          <aside className="lg:sticky lg:top-5 self-start space-y-1 p-2.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl h-fit">
            {visibleNav.map(({ v, l, Icon, badge }) => {
              const active = tab === v;
              return (
                <button
                  key={v}
                  onClick={() => setTab(v)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition ${
                    active
                      ? "bg-gradient-to-r from-[#E8C547]/15 to-transparent text-[#E8C547] border border-[#E8C547]/30 shadow-[0_0_16px_rgba(232,197,71,0.2)]"
                      : "text-white/60 hover:text-white hover:bg-white/[0.04] border border-transparent"
                  }`}
                >
                  <Icon className="size-4" />
                  <span className="flex-1 text-left">{l}</span>
                  {badge ? (
                    <span className={`text-[10px] tabular-nums px-1.5 py-0.5 rounded-full ${active ? "bg-[#E8C547] text-[#0A1530]" : "bg-[#FF6B6B]/15 text-[#FF6B6B] border border-[#FF6B6B]/30 animate-pulse"}`}>
                      {badge}
                    </span>
                  ) : active ? <span className="size-1.5 rounded-full bg-[#E8C547]" style={{ boxShadow: "0 0 8px #E8C547" }} /> : null}
                </button>
              );
            })}
            <div className="mt-2 pt-2 border-t border-white/5 px-3 py-2 text-[10px] text-white/40">
              {isUniversity ? "STAFF · Full access" : "COMMITTEE · Club scope"}
            </div>
          </aside>

          <main className="space-y-4">
            {tab !== "dashboard" && (
              <button
                onClick={() => setTab("dashboard")}
                className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-white/70 hover:text-white hover:border-[#E8C547]/40 transition"
              >
                <ArrowLeft className="size-3.5" /> Back to Dashboard
              </button>
            )}
            {tab === "dashboard" && <DashboardPanel isUniversity={isUniversity} goto={setTab} />}
            {tab === "campaigns" && <CampaignsSection />}
            {tab === "missions" && <Builder />}
            {tab === "proofs" && <Approvals />}
            {tab === "certificates" && <CertificatesPanel />}
            {tab === "students" && <StudentsPanel />}
            {tab === "leaderboard" && <LeaderboardPanel />}
            {tab === "accounts" && isUniversity && <AccountsAccessSection />}
            {tab === "settings" && <SettingsPanel />}
          </main>
        </div>
      </div>
    </div>
  );
}

function DashboardPanel({ isUniversity, goto }: { isUniversity: boolean; goto: (t: GuildTab) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-white" style={{ fontSize: 22, fontWeight: 600 }}>Dashboard</h2>
        <p className="text-xs text-white/50">{isUniversity ? "University-wide engagement at a glance." : "Your club's activity at a glance."}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KPI label="Active campaigns" value="14" delta="+3 wk" color="#E8C547" />
        <KPI label="Active students" value="284" delta="+18 wk" color="#08E8F0" />
        <KPI label="Points awarded" value="48,210" delta="↑ 12%" color="#10E6A1" />
        <KPI label="Pending reviews" value="9" delta="2 urgent" color="#FF6B6B" />
      </div>

      <div className="grid lg:grid-cols-2 gap-3">
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
          <div className="text-sm mb-3 flex items-center gap-2"><Sparkles className="size-4 text-[#E8C547]" /> Today's priority</div>
          <div className="space-y-2 text-sm">
            <PriorityRow label="Approve Astronomy Society club request" cta="Open" onClick={() => goto("accounts")} />
            <PriorityRow label="9 proof submissions awaiting review" cta="Review" onClick={() => goto("proofs")} />
            <PriorityRow label='International Culture Night needs 33 more volunteers' cta="View" onClick={() => goto("campaigns")} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
          <div className="text-sm mb-3 flex items-center gap-2"><BarChart3 className="size-4 text-[#08E8F0]" /> Quick actions</div>
          <div className="grid grid-cols-2 gap-2">
            <Quick icon={<Megaphone className="size-4" />} label="New campaign" color="#E8C547" onClick={() => goto("campaigns")} />
            <Quick icon={<ListChecks className="size-4" />} label="New mission" color="#08E8F0" onClick={() => goto("missions")} />
            <Quick icon={<Award className="size-4" />} label="Issue certificate" color="#10E6A1" onClick={() => goto("certificates")} />
            <Quick icon={<Users className="size-4" />} label="View students" color="#A78BFA" onClick={() => goto("students")} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PriorityRow({ label, cta, onClick }: { label: string; cta: string; onClick: () => void }) {
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
      <span className="size-1.5 rounded-full bg-[#E8C547]" style={{ boxShadow: "0 0 6px #E8C547" }} />
      <span className="flex-1 text-white/80">{label}</span>
      <button onClick={onClick} className="text-xs px-2.5 py-1 rounded-lg bg-[#0B3D91] border border-[#E8C547]/40 hover:bg-[#0A2E6E]">{cta}</button>
    </div>
  );
}

function Quick({ icon, label, color, onClick }: { icon: React.ReactNode; label: string; color: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 text-left transition">
      <div className="size-8 rounded-lg flex items-center justify-center" style={{ background: `${color}1A`, color }}>{icon}</div>
      <div className="mt-2 text-xs text-white/80">{label}</div>
    </button>
  );
}

function CertificatesPanel() {
  const items = [
    { name: "Event Ambassador", color: "#E8C547", issued: 28 },
    { name: "Volunteer Excellence", color: "#10E6A1", issued: 41 },
    { name: "Campus Leadership", color: "#08E8F0", issued: 19 },
    { name: "Sustainability Champion", color: "#A78BFA", issued: 12 },
  ];
  return (
    <div className="space-y-4">
      <SectionHeader title="Certificates" subtitle="Issue and manage recognition certificates." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((c) => (
          <div key={c.name} className="p-5 rounded-2xl bg-gradient-to-br from-[#0B3D91]/40 to-[#0A1530] border border-white/10">
            <div className="size-10 rounded-xl flex items-center justify-center" style={{ background: `${c.color}1A`, color: c.color }}><Award className="size-5" /></div>
            <div className="mt-3 text-sm">{c.name}</div>
            <div className="text-xs text-white/50">Issued · {c.issued}</div>
            <button className="mt-3 w-full text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#E8C547]/40 flex items-center justify-center gap-1">
              <Eye className="size-3" /> View template
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentsPanel() {
  const rows = [
    { n: "Aanya Rao", e: "aanya.rao@northbridge.edu", pts: 1240, m: 12 },
    { n: "Devon Singh", e: "devon.singh@northbridge.edu", pts: 980, m: 9 },
    { n: "Marcus Lee", e: "marcus.lee@northbridge.edu", pts: 760, m: 7 },
    { n: "Chen Wei", e: "chen.wei@northbridge.edu", pts: 540, m: 5 },
  ];
  return (
    <div className="space-y-4">
      <SectionHeader title="Students" subtitle="Active participants across missions and campaigns." />
      <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
        {rows.map((r, i) => (
          <div key={r.n} className={`grid grid-cols-[1.4fr_1.4fr_0.6fr_0.6fr] gap-3 px-4 py-3 items-center text-sm ${i ? "border-t border-white/5" : ""}`}>
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-full bg-gradient-to-br from-[#0B3D91] to-[#1E5FBF] text-xs flex items-center justify-center">{r.n.split(" ").map((s) => s[0]).join("")}</div>
              <span>{r.n}</span>
            </div>
            <span className="text-xs text-white/60 truncate">{r.e}</span>
            <span className="text-[#E8C547] tabular-nums">{r.pts} pts</span>
            <span className="text-white/60 text-xs tabular-nums">{r.m} missions</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LeaderboardPanel() {
  const top = [
    { n: "Aanya Rao", v: 1240 },
    { n: "Devon Singh", v: 980 },
    { n: "Marcus Lee", v: 760 },
    { n: "Chen Wei", v: 540 },
    { n: "Sam Tan", v: 410 },
  ];
  return (
    <div className="space-y-4">
      <SectionHeader title="Leaderboard" subtitle="Top contributors this term." />
      <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
        {top.map((t, i) => (
          <div key={t.n} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10">
            <div className={`size-8 rounded-full flex items-center justify-center text-xs ${i === 0 ? "bg-[#E8C547] text-[#0A1530]" : "bg-white/5 text-white/70"}`}>#{i + 1}</div>
            <span className="flex-1">{t.n}</span>
            <span className="text-[#E8C547] tabular-nums">{t.v} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsPanel() {
  return (
    <div className="space-y-4">
      <SectionHeader title="Settings" subtitle="Profile, notifications, approvals, appearance." />
      <div className="grid sm:grid-cols-2 gap-3">
        {[
          { l: "Profile", d: "Update your admin profile and contact details." },
          { l: "Notifications", d: "Email and in-app alerts for approvals and proofs." },
          { l: "Approval rules", d: "Auto-route or escalate based on mission type." },
          { l: "Appearance", d: "Theme, density, and accent color." },
        ].map((s) => (
          <div key={s.l} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="text-sm">{s.l}</div>
            <div className="text-xs text-white/50 mt-1">{s.d}</div>
            <button className="mt-3 text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#E8C547]/40">Open</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h2 className="text-white" style={{ fontSize: 22, fontWeight: 600 }}>{title}</h2>
      <p className="text-xs text-white/50">{subtitle}</p>
    </div>
  );
}

function KPI({ label, value, delta, color }: { label: string; value: string; delta: string; color: string }) {
  return (
    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur">
      <div className="text-xs text-white/50">{label}</div>
      <div className="mt-1 flex items-end justify-between">
        <div className="tabular-nums" style={{ color, fontSize: 24 }}>{value}</div>
        <div className="text-xs text-white/50">{delta}</div>
      </div>
    </div>
  );
}

const SIGNER_OPTIONS: Record<NonNullable<import("./types").Mission["certificateSignerType"]>, { label: string; signers: string[] }> = {
  university: { label: "University mission", signers: ["Student Affairs Director"] },
  club: { label: "Club mission", signers: ["Student Affairs Director", "Club Supervisor"] },
  department: { label: "Department mission", signers: ["Student Affairs Director", "Department Representative"] },
};

function Builder() {
  const [title, setTitle] = useState("Decoration Team — International Culture Night");
  const [category, setCategory] = useState<MissionCategory>("university_campaign");
  const cat = MISSION_CATEGORIES[category];
  const [points, setPoints] = useState<number>(cat.recommendedPoints);
  const [moneyEnabled, setMoneyEnabled] = useState(false);
  const [money, setMoney] = useState<number>(20);
  const [volunteerHours, setVolunteerHours] = useState<number>(cat.volunteerHours || 0);
  const [badge, setBadge] = useState<string>(cat.badge);
  const [seats, setSeats] = useState(2);
  const [genCert, setGenCert] = useState(true);
  const [certTitle, setCertTitle] = useState(cat.certificates[0]);
  const [certDesc, setCertDesc] = useState("Awarded for verified contribution to this mission.");
  const [certTemplate, setCertTemplate] = useState("Classic Navy & Gold");
  const [signerType, setSignerType] = useState<NonNullable<import("./types").Mission["certificateSignerType"]>>("university");
  const [showPreview, setShowPreview] = useState(false);

  function applyCategory(next: MissionCategory) {
    const meta = MISSION_CATEGORIES[next];
    setCategory(next);
    setPoints(meta.recommendedPoints);
    setVolunteerHours(meta.volunteerHours || 0);
    setBadge(meta.badge);
    setCertTitle(meta.certificates[0]);
    setSignerType(next === "club_mission" ? "club" : next === "junior_support" ? "department" : "university");
  }

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-5">
      <div className="space-y-4">
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
          <div className="text-xs text-white/50 uppercase tracking-widest">New mission · Verified Guild Master</div>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-2 w-full bg-transparent text-xl outline-none border-b border-white/10 focus:border-[#E8C547] py-2" />
          <textarea
            defaultValue="Help set up the main hall, banners, and country booths the day before the event."
            className="mt-4 w-full bg-white/[0.03] border border-white/10 rounded-xl p-3 text-sm text-white/80 outline-none focus:border-[#E8C547] resize-none"
            rows={3}
          />

          <div className="mt-4">
            <div className="text-xs text-white/50 mb-2 flex items-center gap-1.5">
              <span className="text-[#FF6B6B]">*</span> Mission Category <span className="text-white/40">(required)</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              {Object.values(MISSION_CATEGORIES).map((m) => {
                const active = category === m.key;
                return (
                  <button
                    key={m.key}
                    onClick={() => applyCategory(m.key)}
                    className={`text-left p-3 rounded-xl border transition ${active ? "" : "bg-white/[0.03] border-white/10 hover:border-white/30"}`}
                    style={active ? { background: `${m.color}14`, borderColor: `${m.color}66`, boxShadow: `0 0 16px ${m.color}33` } : undefined}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm" style={active ? { color: m.color } : undefined}>{m.label}</span>
                      {active && <Check className="size-3.5" style={{ color: m.color }} />}
                    </div>
                    <div className="text-[11px] text-white/50 mt-0.5">{m.description}</div>
                    <div className="text-[10px] mt-1.5" style={{ color: m.color }}>
                      Suggested: +{m.recommendedPoints} pts · {m.badge}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-white/50 uppercase tracking-widest">Reward setup</div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#10E6A1]/10 text-[#10E6A1] border border-[#10E6A1]/30 flex items-center gap-1">
              <ShieldCheck className="size-3" /> No deposit required · Verified Guild
            </span>
          </div>

          <Field label={`Points reward · +${points} pts`}>
            <input type="range" min={cat.pointsRange[0]} max={cat.pointsRange[1]} step={10} value={points} onChange={(e) => setPoints(Number(e.target.value))} className="w-full accent-[#E8C547]" />
            <div className="flex justify-between text-[10px] text-white/40 mt-1">
              <span>+{cat.pointsRange[0]}</span><span>Recommended +{cat.recommendedPoints}</span><span>+{cat.pointsRange[1]}</span>
            </div>
          </Field>

          <div className="mt-4 p-3 rounded-xl bg-white/[0.02] border border-white/10">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={moneyEnabled} onChange={(e) => setMoneyEnabled(e.target.checked)} className="accent-[#E8C547]" />
              <span className="text-sm">Add optional money reward</span>
              <span className="text-[10px] text-white/40">(optional)</span>
            </label>
            {moneyEnabled && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs text-white/60">RM</span>
                <input type="number" min={0} value={money} onChange={(e) => setMoney(Number(e.target.value))} className="w-24 bg-white/[0.05] border border-white/10 rounded-lg px-2 py-1.5 text-sm outline-none focus:border-[#E8C547]" />
                <span className="text-xs text-white/50">paid from club / department budget — no escrow lock</span>
              </div>
            )}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Field label={`Volunteer hours · +${volunteerHours}h`}>
              <input type="range" min={0} max={20} value={volunteerHours} onChange={(e) => setVolunteerHours(Number(e.target.value))} className="w-full accent-[#10E6A1]" />
            </Field>
            <Field label="Badge reward">
              <select value={badge} onChange={(e) => setBadge(e.target.value)} className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-2 py-1.5 text-sm outline-none">
                {[cat.badge, "Event Support Badge", "Junior Mentor Badge", "Club Contributor Badge", "Skill Helper Badge", "Leadership Badge"].filter((v, i, a) => a.indexOf(v) === i).map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </Field>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Field label={`Seats · ${seats}`}>
              <input type="range" min={1} max={20} value={seats} onChange={(e) => setSeats(Number(e.target.value))} className="w-full accent-[#08E8F0]" />
            </Field>
            <Field label="Urgency">
              <select className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-2 py-1.5 text-sm outline-none">
                <option>High</option><option>Medium</option><option>Low</option>
              </select>
            </Field>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm flex items-center gap-2"><Award className="size-4 text-[#10E6A1]" /> Generate mission completion certificate after approval</div>
              <div className="text-xs text-white/50 mt-0.5">A certificate is auto-issued to the student once their proof is approved.</div>
            </div>
            <button onClick={() => setGenCert(!genCert)} className={`relative w-11 h-6 rounded-full transition ${genCert ? "bg-[#10E6A1]" : "bg-white/10"}`}>
              <span className={`absolute top-0.5 size-5 rounded-full bg-white transition-transform ${genCert ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>

          {genCert && (
            <div className="mt-4 space-y-3">
              <Field label="Certificate title">
                <input value={certTitle} onChange={(e) => setCertTitle(e.target.value)} className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#10E6A1]" />
              </Field>
              <Field label="Certificate description">
                <textarea value={certDesc} onChange={(e) => setCertDesc(e.target.value)} rows={2} className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#10E6A1] resize-none" />
              </Field>
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Certificate template">
                  <select value={certTemplate} onChange={(e) => setCertTemplate(e.target.value)} className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-2 py-2 text-sm outline-none">
                    <option>Classic Navy & Gold</option>
                    <option>Modern Minimal</option>
                    <option>University Crest</option>
                    <option>Club Edition</option>
                  </select>
                </Field>
                <Field label="Certificate signer type">
                  <select value={signerType} onChange={(e) => setSignerType(e.target.value as any)} className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-2 py-2 text-sm outline-none">
                    <option value="university">University mission</option>
                    <option value="club">Club mission</option>
                    <option value="department">Department mission</option>
                  </select>
                </Field>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-xs text-white/50 mb-1.5 flex items-center gap-1.5"><PenLine className="size-3" /> Signers</div>
                <div className="flex flex-wrap gap-2">
                  {SIGNER_OPTIONS[signerType].signers.map((s) => (
                    <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-[#10E6A1]/10 text-[#10E6A1] border border-[#10E6A1]/30">{s}</span>
                  ))}
                </div>
              </div>
              <button onClick={() => setShowPreview(true)} className="w-full text-sm py-2.5 rounded-xl bg-white/[0.04] border border-[#10E6A1]/30 text-[#10E6A1] hover:bg-[#10E6A1]/10 flex items-center justify-center gap-2">
                <Eye className="size-4" /> Preview certificate
              </button>
            </div>
          )}
        </div>
      </div>

      <aside className="space-y-3">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0B3D91] to-[#0A2E6E] border border-[#E8C547]/30">
          <div className="text-xs uppercase tracking-widest flex items-center gap-1.5" style={{ color: cat.color }}>
            <Sparkles className="size-3.5" /> Reward summary
          </div>
          <div className="mt-3 space-y-2 text-sm">
            <SummaryRow icon={<Coins className="size-3.5" />} label="Points reward" value={`+${points} pts`} accent={cat.color} />
            {moneyEnabled && money > 0 && (
              <SummaryRow icon={<Coins className="size-3.5" />} label="Optional money" value={`RM ${money}`} accent="#08E8F0" />
            )}
            {volunteerHours > 0 && (
              <SummaryRow icon={<Hourglass className="size-3.5" />} label="Volunteer hours" value={`+${volunteerHours}h`} accent="#10E6A1" />
            )}
            <SummaryRow icon={<Shield className="size-3.5" />} label="Badge" value={badge} accent={cat.color} />
            {genCert && (
              <SummaryRow icon={<Award className="size-3.5" />} label="Certificate" value={certTitle} accent="#10E6A1" />
            )}
            <SummaryRow icon={<Users className="size-3.5" />} label="Seats" value={`${seats}`} />
          </div>
          <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-white/60 flex items-start gap-2">
            <ShieldCheck className="size-3.5 text-[#10E6A1] mt-0.5 shrink-0" />
            <span>Verified Guild Master · no deposit, no escrow lock. Mission can be published immediately.</span>
          </div>
          <button className="mt-4 w-full py-3 rounded-xl bg-[#E8C547] text-[#0A2E6E] hover:bg-[#F0D365] flex items-center justify-center gap-2 transition">
            <Sparkles className="size-4" /> Publish mission
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-white/60">
          <div className="text-white mb-2 flex items-center gap-2"><Sparkles className="size-3.5 text-[#08E8F0]" /> AI suggestion</div>
          For <span style={{ color: cat.color }}>{cat.label}</span>, +{cat.recommendedPoints} pts with {cat.certificates[0]} typically fills within 24h.
        </div>
      </aside>

      {showPreview && (
        <div className="fixed inset-0 z-50 bg-[#050B1F]/85 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowPreview(false)}>
          <div onClick={(e) => e.stopPropagation()} className="max-w-2xl w-full rounded-2xl border border-[#E8C547]/40 overflow-hidden" style={{ animation: "popIn 0.2s ease-out" }}>
            <div className="p-8 bg-gradient-to-br from-[#0A1530] via-[#0B3D91]/40 to-[#0A1530] text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8C547]/15 border border-[#E8C547]/40 text-[#E8C547] text-xs">
                <Award className="size-3" /> {certTemplate}
              </div>
              <div className="mt-6 text-white/70 text-xs uppercase tracking-[0.3em]">Certificate of Completion</div>
              <div className="mt-3 text-[#E8C547]" style={{ fontSize: 26 }}>{certTitle}</div>
              <div className="mt-3 text-sm text-white/70 max-w-md mx-auto">{certDesc}</div>
              <div className="mt-2 text-xs text-white/40">Mission: {title}</div>
              <div className="mt-8 flex items-center justify-center gap-8 flex-wrap">
                {SIGNER_OPTIONS[signerType].signers.map((s) => (
                  <div key={s} className="text-xs">
                    <div className="border-b border-white/30 w-40 mb-1.5 pb-3 text-white/80 italic">— signed —</div>
                    <div className="text-white/60">{s}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => setShowPreview(false)} className="mt-6 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-[#E8C547]/40 text-sm">Close preview</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryRow({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string; accent?: string }) {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.04]">
      <span className="flex items-center gap-1.5 text-white/70">{icon}{label}</span>
      <span className="tabular-nums" style={{ color: accent || "white" }}>{value}</span>
    </div>
  );
}

function Analytics() {
  const bars = [12, 28, 18, 36, 22, 44, 30, 52, 40, 58, 48, 64];
  return (
    <div className="grid lg:grid-cols-2 gap-5">
      <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm">Mission throughput</div>
            <div className="text-xs text-white/50">Last 12 weeks</div>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-[#10E6A1]/10 text-[#10E6A1] border border-[#10E6A1]/20 flex items-center gap-1">
            <TrendingUp className="size-3" /> +42%
          </span>
        </div>
        <div className="flex items-end gap-2 h-40">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-[#0B3D91] to-[#08E8F0]" style={{ height: `${(h / 64) * 100}%` }} />
          ))}
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
        <div className="text-sm mb-4">Top skills sponsored</div>
        <div className="space-y-3">
          {[
            { l: "React", v: 86 },
            { l: "GraphicDesign", v: 72 },
            { l: "Java/Spring4", v: 58 },
            { l: "Photography", v: 41 },
            { l: "Translation", v: 22 },
          ].map((s) => (
            <div key={s.l}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-white/70">#{s.l}</span>
                <span className="text-white/50 tabular-nums">{s.v}</span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#E8C547] to-[#08E8F0]" style={{ width: `${s.v}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2 p-5 rounded-2xl bg-white/[0.03] border border-white/10">
        <div className="text-sm mb-4">Guild leaderboard</div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { n: "Devon S.", v: "$1,240", t: "12 missions" },
            { n: "Aanya R.", v: "$980", t: "9 missions" },
            { n: "Marcus L.", v: "$760", t: "7 missions" },
          ].map((p, i) => (
            <div key={p.n} className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
              <div className="size-10 rounded-full bg-gradient-to-br from-[#0B3D91] to-[#1E5FBF] flex items-center justify-center">{p.n.split(" ").map(s => s[0]).join("")}</div>
              <div className="flex-1">
                <div className="text-sm">{p.n}</div>
                <div className="text-xs text-white/50">{p.t}</div>
              </div>
              <div className="text-right">
                <div className="text-[#E8C547]">{p.v}</div>
                <div className="text-xs text-white/50">#{i + 1}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type ApprovalItem = {
  id: string;
  student: string;
  mission: string;
  proof: string;
  points: number;
  money?: number;
  urgent: boolean;
  certEnabled: boolean;
  certTitle: string;
  category: string;
  categoryColor: string;
  signerType: MissionCertData["signerType"];
  campaign?: string;
  volunteerHours?: number;
  issuingOrganization: string;
};

function Approvals() {
  const [items, setItems] = useState<ApprovalItem[]>([
    { id: "a1", student: "Aanya Rao", mission: "Photograph the Robotics Showcase", proof: "30 edited shots · drive link", points: 240, money: 30, urgent: true, certEnabled: true, certTitle: "Mission Completion Certificate", category: "Club Mission", categoryColor: "#08E8F0", signerType: "club", campaign: "Robotics Showcase 2026", volunteerHours: 3, issuingOrganization: "Northbridge University · Robotics Society" },
    { id: "a2", student: "Sam Tan", mission: "Spring Hackathon poster", proof: "PDF + Figma source", points: 480, urgent: true, certEnabled: true, certTitle: "Volunteer Mission Certificate", category: "Club Mission", categoryColor: "#08E8F0", signerType: "club", campaign: "Spring Hackathon 2026", issuingOrganization: "Northbridge University · ACM Student Chapter" },
    { id: "a3", student: "Chen Wei", mission: "Translate research abstract", proof: "1,210 words · DOCX", points: 140, urgent: false, certEnabled: false, certTitle: "Mission Completion Certificate", category: "Peer Support", categoryColor: "#10E6A1", signerType: "department", issuingOrganization: "Northbridge University · CS Department" },
  ]);
  const [confirm, setConfirm] = useState<ApprovalItem | null>(null);
  const [generated, setGenerated] = useState<MissionCertData | null>(null);

  function approveAndGenerate(p: ApprovalItem) {
    const cert: MissionCertData = {
      id: `mc-${p.id}`,
      certId: `DWT-MC-2026-${(Math.floor(Math.random() * 900000) + 100000).toString()}`,
      title: p.certTitle,
      studentName: p.student,
      missionTitle: p.mission,
      campaignName: p.campaign,
      missionCategory: p.category,
      categoryColor: p.categoryColor,
      pointsEarned: p.points,
      volunteerHours: p.volunteerHours,
      completionDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      issuingOrganization: p.issuingOrganization,
      signerType: p.signerType,
      status: "issued",
    };
    setItems((arr) => arr.filter((x) => x.id !== p.id));
    setConfirm(null);
    setGenerated(cert);
  }

  function approveOnly(p: ApprovalItem) {
    setItems((arr) => arr.filter((x) => x.id !== p.id));
    setConfirm(null);
  }

  return (
    <div className="space-y-3">
      {items.map((p) => (
        <div key={p.id} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-4 flex-wrap">
          <div className="size-12 rounded-xl bg-gradient-to-br from-[#E8C547]/30 to-[#0B3D91]/30 border border-[#E8C547]/30 flex items-center justify-center">
            <FileCheck className="size-5 text-[#E8C547]" />
          </div>
          <div className="flex-1 min-w-[240px]">
            <div className="flex items-center gap-2 flex-wrap">
              <span>{p.mission}</span>
              {p.urgent && <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FF6B6B]/15 text-[#FF6B6B] border border-[#FF6B6B]/30">URGENT</span>}
              <span className="text-[10px] px-2 py-0.5 rounded-full border" style={{ background: `${p.categoryColor}1A`, color: p.categoryColor, borderColor: `${p.categoryColor}55` }}>{p.category}</span>
              {p.certEnabled && <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#10E6A1]/10 text-[#10E6A1] border border-[#10E6A1]/30 flex items-center gap-1"><Award className="size-2.5" /> Certificate enabled</span>}
            </div>
            <div className="text-xs text-white/50 mt-0.5">Submitted by {p.student} · {p.proof}</div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-xs text-white/50">Release</div>
            <div className="text-[#E8C547]">+{p.points} pts{p.money ? ` · RM ${p.money}` : ""}</div>
          </div>
          <button onClick={() => approveOnly(p)} className="size-10 rounded-lg bg-white/5 border border-white/10 hover:border-[#FF6B6B]/50 hover:text-[#FF6B6B] flex items-center justify-center" title="Reject">
            <X className="size-4" />
          </button>
          <button onClick={() => setConfirm(p)} className="px-4 h-10 rounded-lg bg-[#10E6A1] text-[#04121E] hover:bg-[#1FF5B0] flex items-center gap-2 transition">
            <Check className="size-4" /> Approve
          </button>
        </div>
      ))}
      {items.length === 0 && (
        <div className="p-10 text-center rounded-2xl bg-white/[0.03] border border-white/10 text-white/50">
          Queue clear. All proofs resolved.
        </div>
      )}

      {confirm && (
        <div className="fixed inset-0 z-50 bg-[#050B1F]/85 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setConfirm(null)}>
          <div onClick={(e) => e.stopPropagation()} className="max-w-md w-full bg-[#0A1530] border border-white/10 rounded-2xl p-6 shadow-2xl" style={{ animation: "popIn 0.2s ease-out" }}>
            <div className="size-12 rounded-full bg-[#10E6A1]/15 text-[#10E6A1] border border-[#10E6A1]/30 flex items-center justify-center mb-3">
              <Award className="size-5" />
            </div>
            <h3 className="text-white">Approve proof and generate certificate?</h3>
            <p className="text-sm text-white/60 mt-1">{confirm.student} · {confirm.mission}</p>
            <div className="mt-4 p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs space-y-1.5">
              <div className="flex items-center justify-between"><span className="text-white/60">Points to release</span><span className="text-[#E8C547]">+{confirm.points}</span></div>
              {confirm.money ? <div className="flex items-center justify-between"><span className="text-white/60">Money</span><span className="text-[#08E8F0]">RM {confirm.money}</span></div> : null}
              {confirm.certEnabled ? (
                <div className="flex items-center justify-between"><span className="text-white/60">Certificate</span><span className="text-[#10E6A1]">{confirm.certTitle}</span></div>
              ) : (
                <div className="flex items-center justify-between"><span className="text-white/60">Certificate</span><span className="text-white/40">Not enabled for this mission</span></div>
              )}
            </div>
            <div className="mt-5 flex flex-col gap-2">
              {confirm.certEnabled && (
                <button onClick={() => approveAndGenerate(confirm)} className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#10E6A1] to-[#08E8F0] text-[#04121E] hover:shadow-[0_0_20px_rgba(16,230,161,0.5)] flex items-center justify-center gap-2">
                  <Award className="size-4" /> Approve &amp; Generate Certificate
                </button>
              )}
              <button onClick={() => approveOnly(confirm)} className="w-full py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white/80 hover:border-white/30">
                Approve Without Certificate
              </button>
              <button onClick={() => setConfirm(null)} className="w-full py-2 text-xs text-white/50 hover:text-white">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {generated && <MissionCertificatePreview cert={generated} onClose={() => setGenerated(null)} isClubView={true} />}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs text-white/50 mb-1.5">{label}</div>
      {children}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between text-white/70">
      <span>{k}</span>
      <span className="text-white tabular-nums">{v}</span>
    </div>
  );
}

