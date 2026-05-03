import { useState } from "react";
import {
  Megaphone, Plus, ArrowLeft, Sparkles, Users, Award, BarChart3, FileCheck, Eye, Edit3, X, Check,
  CalendarDays, Building2, GraduationCap, HeartHandshake, Target, Coins, ClipboardList, Trophy,
} from "lucide-react";

type CampaignType = "University" | "Club" | "Department" | "Event" | "Volunteer";
type CampaignStatus = "Draft" | "Active" | "Completed";

type Mission = {
  id: string;
  title: string;
  reward: number;
  certificate: string;
  team?: string;
  joined: number;
  capacity: number;
  moneyReward?: number;
  clubSupervisor?: string;
  clubPresident?: string;
  skillsDeveloped?: string[];
};

const ALL_SKILLS = ["Design", "Leadership", "Marketing", "Technical", "Communication"];

const SKILL_COLORS: Record<string, string> = {
  Design: "#A78BFA",
  Leadership: "#E8C547",
  Marketing: "#FF9F43",
  Technical: "#08E8F0",
  Communication: "#10E6A1",
};

type Team = { name: string; needed: number; joined: number };

type Campaign = {
  id: string;
  name: string;
  owner: string;
  type: CampaignType;
  status: CampaignStatus;
  goal: string;
  volunteersNeeded: number;
  studentsJoined: number;
  pointsAwarded: number;
  certificatesLinked: number;
  teams: Team[];
  missions: Mission[];
};

const SEED: Campaign[] = [
  {
    id: "cmp1",
    name: "International Culture Night",
    owner: "University Student Affairs",
    type: "Event",
    status: "Active",
    goal: "Recruit student volunteers and promote the event across campus.",
    volunteersNeeded: 80,
    studentsJoined: 47,
    pointsAwarded: 6240,
    certificatesLinked: 4,
    teams: [
      { name: "Marketing Team", needed: 12, joined: 8 },
      { name: "Decoration Team", needed: 14, joined: 10 },
      { name: "Registration Team", needed: 10, joined: 7 },
      { name: "Logistics Team", needed: 12, joined: 6 },
      { name: "Social Media Team", needed: 8, joined: 5 },
      { name: "Stage Support Team", needed: 12, joined: 6 },
      { name: "Food Booth Support Team", needed: 12, joined: 5 },
    ],
    missions: [
      { id: "m1", title: "Join the Marketing Team", reward: 150, certificate: "Event Ambassador Certificate", team: "Marketing Team", joined: 8, capacity: 12 },
      { id: "m2", title: "Support Decoration Setup", reward: 120, certificate: "Volunteer Excellence Certificate", team: "Decoration Team", joined: 10, capacity: 14 },
      { id: "m3", title: "Promote International Culture Night on Campus", reward: 100, certificate: "Campus Leadership Certificate", team: "Social Media Team", joined: 5, capacity: 8 },
      { id: "m4", title: "Help with Registration Desk", reward: 130, certificate: "Event Support Certificate", team: "Registration Team", joined: 7, capacity: 10 },
    ],
  },
  {
    id: "cmp2",
    name: "Sustainability Week",
    owner: "Office of Sustainability",
    type: "University",
    status: "Active",
    goal: "Drive campus-wide engagement on sustainability through workshops and field actions.",
    volunteersNeeded: 60,
    studentsJoined: 28,
    pointsAwarded: 2410,
    certificatesLinked: 3,
    teams: [
      { name: "Marketing Team", needed: 8, joined: 4 },
      { name: "Logistics Team", needed: 10, joined: 6 },
      { name: "General Support", needed: 12, joined: 7 },
    ],
    missions: [
      { id: "m1", title: "Run a Recycling Drive Booth", reward: 110, certificate: "Sustainability Champion", team: "Logistics Team", joined: 6, capacity: 10 },
      { id: "m2", title: "Lead a Workshop Session", reward: 180, certificate: "Campus Leadership Certificate", team: "General Support", joined: 4, capacity: 6 },
    ],
  },
  {
    id: "cmp3",
    name: "Founders Hackathon",
    owner: "ACM Student Chapter",
    type: "Club",
    status: "Draft",
    goal: "48-hour hackathon focused on student-built campus tools.",
    volunteersNeeded: 30,
    studentsJoined: 0,
    pointsAwarded: 0,
    certificatesLinked: 2,
    teams: [
      { name: "Registration Team", needed: 8, joined: 0 },
      { name: "Stage Support Team", needed: 10, joined: 0 },
    ],
    missions: [],
  },
];

const TYPE_META: Record<CampaignType, { icon: any; color: string }> = {
  University: { icon: GraduationCap, color: "#08E8F0" },
  Club: { icon: Sparkles, color: "#E8C547" },
  Department: { icon: Building2, color: "#A78BFA" },
  Event: { icon: CalendarDays, color: "#FF9F43" },
  Volunteer: { icon: HeartHandshake, color: "#10E6A1" },
};

const STATUS_META: Record<CampaignStatus, string> = {
  Draft: "bg-white/5 text-white/60 border-white/10",
  Active: "bg-[#10E6A1]/10 text-[#10E6A1] border-[#10E6A1]/30",
  Completed: "bg-[#08E8F0]/10 text-[#08E8F0] border-[#08E8F0]/30",
};

export function CampaignsSection() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(SEED);
  const [openId, setOpenId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [missionFor, setMissionFor] = useState<Campaign | null>(null);

  const open = campaigns.find((c) => c.id === openId) || null;

  function addCampaign(c: Campaign) {
    setCampaigns((arr) => [c, ...arr]);
    setCreating(false);
  }

  function addMission(campaignId: string, mission: Mission) {
    setCampaigns((arr) =>
      arr.map((c) => (c.id === campaignId ? { ...c, missions: [mission, ...c.missions] } : c))
    );
    setMissionFor(null);
  }

  if (open) {
    return (
      <CampaignDetail
        campaign={open}
        onBack={() => setOpenId(null)}
        onCreateMission={() => setMissionFor(open)}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="text-sm text-white/80 flex items-center gap-2">
            <Megaphone className="size-4 text-[#E8C547]" /> Campaigns
          </div>
          <div className="text-xs text-white/50">
            Group missions under campaigns. Recruit volunteers and award certificates at scale.
          </div>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="text-sm px-4 py-2 rounded-xl bg-[#0B3D91] border border-[#E8C547]/40 hover:bg-[#0A2E6E] flex items-center gap-2"
        >
          <Plus className="size-4 text-[#E8C547]" /> New Campaign
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-3">
        {campaigns.map((c) => (
          <CampaignCard
            key={c.id}
            c={c}
            onView={() => setOpenId(c.id)}
            onCreateMission={() => setMissionFor(c)}
          />
        ))}
      </div>

      {creating && <CreateCampaignModal onClose={() => setCreating(false)} onSave={addCampaign} />}
      {missionFor && (
        <CreateMissionModal
          campaigns={campaigns}
          defaultCampaignId={missionFor.id}
          onClose={() => setMissionFor(null)}
          onSave={(campaignId, mission) => addMission(campaignId, mission)}
        />
      )}
    </div>
  );
}

function CampaignCard({ c, onView, onCreateMission }: { c: Campaign; onView: () => void; onCreateMission: () => void }) {
  const meta = TYPE_META[c.type];
  const Icon = meta.icon;
  const fill = c.volunteersNeeded ? Math.round((c.studentsJoined / c.volunteersNeeded) * 100) : 0;

  return (
    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur hover:border-white/20 transition">
      <div className="flex items-start gap-3">
        <div className="size-11 rounded-xl flex items-center justify-center border" style={{ background: `${meta.color}1A`, borderColor: `${meta.color}55`, color: meta.color }}>
          <Icon className="size-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-white">{c.name}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${STATUS_META[c.status]}`}>{c.status}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full border" style={{ background: `${meta.color}1A`, color: meta.color, borderColor: `${meta.color}55` }}>
              {c.type} Campaign
            </span>
          </div>
          <div className="text-xs text-white/50 mt-0.5">Owner · {c.owner}</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2">
        <Stat icon={<ClipboardList className="size-3" />} label="Missions" value={c.missions.length} />
        <Stat icon={<Users className="size-3" />} label="Volunteers" value={`${c.studentsJoined}/${c.volunteersNeeded}`} />
        <Stat icon={<Coins className="size-3" />} label="Points" value={c.pointsAwarded.toLocaleString()} />
        <Stat icon={<Award className="size-3" />} label="Certs" value={c.certificatesLinked} />
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[11px] mb-1">
          <span className="text-white/50">Volunteer fill</span>
          <span className="text-white/70 tabular-nums">{fill}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#E8C547] to-[#08E8F0]" style={{ width: `${Math.min(fill, 100)}%` }} />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={onView} className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#E8C547]/40 flex items-center gap-1">
          <Eye className="size-3" /> View Campaign
        </button>
        <button onClick={onCreateMission} className="text-xs px-3 py-1.5 rounded-lg bg-[#0B3D91] border border-[#E8C547]/40 hover:bg-[#0A2E6E] flex items-center gap-1">
          <Plus className="size-3 text-[#E8C547]" /> Create Mission
        </button>
        <button className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#08E8F0]/40 flex items-center gap-1">
          <Users className="size-3 text-[#08E8F0]" /> Manage Volunteers
        </button>
        <button className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#10E6A1]/40 flex items-center gap-1">
          <BarChart3 className="size-3 text-[#10E6A1]" /> Analytics
        </button>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10">
      <div className="text-[10px] text-white/50 flex items-center gap-1">{icon}{label}</div>
      <div className="text-sm text-white tabular-nums mt-0.5">{value}</div>
    </div>
  );
}

function CampaignDetail({ campaign, onBack, onCreateMission }: { campaign: Campaign; onBack: () => void; onCreateMission: () => void }) {
  const [section, setSection] = useState<
    "overview" | "missions" | "teams" | "students" | "proofs" | "certs" | "analytics"
  >("overview");
  const meta = TYPE_META[campaign.type];
  const Icon = meta.icon;

  const sections = [
    { v: "overview", l: "Overview", Icon: Target },
    { v: "missions", l: "Missions", Icon: ClipboardList },
    { v: "teams", l: "Volunteer Teams", Icon: Users },
    { v: "students", l: "Participants", Icon: GraduationCap },
    { v: "proofs", l: "Proof Reviews", Icon: FileCheck },
    { v: "certs", l: "Certificates", Icon: Award },
    { v: "analytics", l: "Analytics", Icon: BarChart3 },
  ] as const;

  return (
    <div className="space-y-5">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-white/70 hover:text-white hover:border-[#E8C547]/40 transition"
      >
        <ArrowLeft className="size-3.5" /> Back to Campaigns
      </button>

      <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0B3D91]/60 to-[#0A1530] border border-white/10">
        <div className="flex items-start gap-4 flex-wrap">
          <div className="size-14 rounded-2xl flex items-center justify-center border" style={{ background: `${meta.color}1A`, borderColor: `${meta.color}55`, color: meta.color }}>
            <Icon className="size-6" />
          </div>
          <div className="flex-1 min-w-[220px]">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-white" style={{ fontSize: 22, fontWeight: 600 }}>{campaign.name}</h2>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${STATUS_META[campaign.status]}`}>{campaign.status}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full border" style={{ background: `${meta.color}1A`, color: meta.color, borderColor: `${meta.color}55` }}>
                {campaign.type} Campaign
              </span>
            </div>
            <div className="text-xs text-white/50 mt-1">Owner · {campaign.owner}</div>
            <p className="text-sm text-white/70 mt-2 max-w-2xl leading-relaxed">{campaign.goal}</p>
          </div>
          <button
            onClick={onCreateMission}
            className="px-4 py-2 rounded-xl bg-[#E8C547] text-[#0A1530] hover:bg-[#F0D365] flex items-center gap-2"
          >
            <Plus className="size-4" /> Create Mission
          </button>
        </div>
      </div>

      <div className="flex gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/10 overflow-x-auto">
        {sections.map(({ v, l, Icon }) => (
          <button
            key={v}
            onClick={() => setSection(v as any)}
            className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition ${
              section === v ? "bg-[#0B3D91] text-white" : "text-white/60 hover:text-white"
            }`}
          >
            <Icon className="size-3.5" /> {l}
          </button>
        ))}
      </div>

      <div>
        {section === "overview" && <Overview c={campaign} />}
        {section === "missions" && <MissionsList c={campaign} onCreate={onCreateMission} />}
        {section === "teams" && <TeamsList c={campaign} />}
        {section === "students" && <Participants c={campaign} />}
        {section === "proofs" && <ProofReviews c={campaign} />}
        {section === "certs" && <CertificatesPanel c={campaign} />}
        {section === "analytics" && <AnalyticsPanel c={campaign} />}
      </div>
    </div>
  );
}

function Overview({ c }: { c: Campaign }) {
  return (
    <div className="grid md:grid-cols-4 gap-3">
      <Tile color="#E8C547" label="Missions" value={c.missions.length} />
      <Tile color="#08E8F0" label="Volunteers needed" value={c.volunteersNeeded} />
      <Tile color="#10E6A1" label="Students joined" value={c.studentsJoined} />
      <Tile color="#FF9F43" label="Points awarded" value={c.pointsAwarded.toLocaleString()} />
      <div className="md:col-span-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
        <div className="text-xs uppercase tracking-widest text-white/50 mb-3">Volunteer team progress</div>
        <div className="space-y-2.5">
          {c.teams.map((t) => {
            const pct = t.needed ? Math.round((t.joined / t.needed) * 100) : 0;
            return (
              <div key={t.name}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-white/80">{t.name}</span>
                  <span className="text-white/50 tabular-nums">{t.joined}/{t.needed}</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#E8C547] to-[#10E6A1]" style={{ width: `${Math.min(pct, 100)}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Tile({ color, label, value }: { color: string; label: string; value: string | number }) {
  return (
    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
      <div className="text-xs text-white/50">{label}</div>
      <div className="mt-1 tabular-nums" style={{ color, fontSize: 22 }}>{value}</div>
    </div>
  );
}

function MissionsList({ c, onCreate }: { c: Campaign; onCreate: () => void }) {
  if (c.missions.length === 0) {
    return (
      <div className="p-10 text-center rounded-2xl bg-white/[0.03] border border-white/10">
        <ClipboardList className="size-8 mx-auto text-white/30" />
        <div className="mt-2 text-sm text-white/70">No missions yet</div>
        <div className="text-xs text-white/40">Create the first mission to start recruiting volunteers.</div>
        <button onClick={onCreate} className="mt-4 text-xs px-3 py-1.5 rounded-lg bg-[#E8C547] text-[#0A1530] hover:bg-[#F0D365] inline-flex items-center gap-1">
          <Plus className="size-3" /> Create Mission
        </button>
      </div>
    );
  }
  return (
    <div className="space-y-2">
      {c.missions.map((m) => (
        <div key={m.id} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-4 flex-wrap hover:border-white/20 transition">
          <div className="size-10 rounded-xl bg-[#0B3D91] border border-[#E8C547]/30 flex items-center justify-center flex-shrink-0">
            <Sparkles className="size-4 text-[#E8C547]" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="text-sm">{m.title}</div>
            <div className="text-xs text-white/50 mt-0.5 flex flex-wrap gap-x-2">
              {m.team && <span>Team · {m.team}</span>}
              <span>· {m.joined}/{m.capacity} joined</span>
            </div>
            <div className="mt-1.5 text-[11px] text-[#08E8F0] flex items-center gap-1">
              <Award className="size-3" /> {m.certificate}
            </div>
            {m.skillsDeveloped && m.skillsDeveloped.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {m.skillsDeveloped.map((s) => (
                  <span
                    key={s}
                    className="text-[9px] px-1.5 py-0.5 rounded border font-bold uppercase"
                    style={{
                      background: `${SKILL_COLORS[s] || "#E8C547"}18`,
                      color: SKILL_COLORS[s] || "#E8C547",
                      borderColor: `${SKILL_COLORS[s] || "#E8C547"}40`,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-[10px] text-white/50">Reward</div>
            <div className="text-[#E8C547]">+{m.reward} pts</div>
            {m.moneyReward ? <div className="text-[#10E6A1] text-xs font-bold">RM {m.moneyReward}</div> : null}
          </div>
          <button className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#E8C547]/40 flex items-center gap-1 flex-shrink-0">
            <Edit3 className="size-3" /> Edit
          </button>
        </div>
      ))}
    </div>
  );
}

function TeamsList({ c }: { c: Campaign }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {c.teams.map((t) => {
        const full = t.joined >= t.needed;
        return (
          <div key={t.name} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-sm">{t.name}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${full ? "bg-[#10E6A1]/10 text-[#10E6A1] border-[#10E6A1]/30" : "bg-[#E8C547]/10 text-[#E8C547] border-[#E8C547]/30"}`}>
                {full ? "Filled" : "Recruiting"}
              </span>
            </div>
            <div className="text-xs text-white/50 mt-1 tabular-nums">{t.joined}/{t.needed} volunteers</div>
            <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#E8C547] to-[#10E6A1]" style={{ width: `${Math.min((t.joined / Math.max(t.needed, 1)) * 100, 100)}%` }} />
            </div>
            <button className="mt-3 w-full text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#08E8F0]/40 flex items-center justify-center gap-1">
              <Users className="size-3 text-[#08E8F0]" /> Manage
            </button>
          </div>
        );
      })}
    </div>
  );
}

function Participants({ c }: { c: Campaign }) {
  const sample = [
    { n: "Aanya R.", t: "Marketing Team", pts: 150 },
    { n: "Devon S.", t: "Decoration Team", pts: 120 },
    { n: "Marcus L.", t: "Registration Team", pts: 130 },
    { n: "Chen W.", t: "Logistics Team", pts: 90 },
    { n: "Sam T.", t: "Social Media Team", pts: 100 },
  ].slice(0, Math.max(c.studentsJoined > 0 ? 5 : 0, 0));
  if (sample.length === 0)
    return <div className="p-6 text-center rounded-2xl bg-white/[0.03] border border-white/10 text-sm text-white/50">No participants yet.</div>;
  return (
    <div className="space-y-2">
      {sample.map((p) => (
        <div key={p.n} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10">
          <div className="size-9 rounded-full bg-gradient-to-br from-[#0B3D91] to-[#1E5FBF] flex items-center justify-center text-xs">
            {p.n.split(" ").map((s) => s[0]).join("")}
          </div>
          <div className="flex-1">
            <div className="text-sm">{p.n}</div>
            <div className="text-xs text-white/50">{p.t}</div>
          </div>
          <div className="text-[#E8C547] text-sm">+{p.pts} pts</div>
        </div>
      ))}
    </div>
  );
}

function ProofReviews({ c }: { c: Campaign }) {
  return (
    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-sm text-white/60 flex items-center gap-3">
      <FileCheck className="size-5 text-[#E8C547]" />
      <span>Proof submissions for "{c.name}" are routed to the central Approval Queue. Open the main Approvals tab to review.</span>
    </div>
  );
}

function CertificatesPanel({ c }: { c: Campaign }) {
  const certs = Array.from(new Set(c.missions.map((m) => m.certificate)));
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {certs.map((name) => (
        <div key={name} className="p-4 rounded-2xl bg-gradient-to-br from-[#0B3D91]/40 to-[#0A1530] border border-[#E8C547]/30">
          <div className="flex items-center gap-2">
            <Award className="size-5 text-[#E8C547]" />
            <span className="text-sm">{name}</span>
          </div>
          <div className="text-xs text-white/50 mt-1">Linked to {c.missions.filter((m) => m.certificate === name).length} mission(s)</div>
        </div>
      ))}
      {certs.length === 0 && (
        <div className="sm:col-span-2 p-6 text-center rounded-2xl bg-white/[0.03] border border-white/10 text-sm text-white/50">
          No certificates linked yet.
        </div>
      )}
    </div>
  );
}

function AnalyticsPanel({ c }: { c: Campaign }) {
  const bars = c.teams.map((t) => Math.round((t.joined / Math.max(t.needed, 1)) * 100));
  return (
    <div className="grid md:grid-cols-2 gap-3">
      <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
        <div className="text-sm mb-3 flex items-center gap-2"><Trophy className="size-4 text-[#E8C547]" /> Team fill rate</div>
        <div className="flex items-end gap-2 h-32">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-[#0B3D91] to-[#08E8F0]" style={{ height: `${Math.max(h, 4)}%` }} />
          ))}
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1 text-[10px] text-white/40 truncate">
          {c.teams.slice(0, 6).map((t) => <span key={t.name} className="truncate">{t.name}</span>)}
        </div>
      </div>
      <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
        <Row k="Volunteer fill" v={`${c.studentsJoined}/${c.volunteersNeeded}`} />
        <Row k="Points awarded" v={c.pointsAwarded.toLocaleString()} />
        <Row k="Certificates linked" v={String(c.certificatesLinked)} />
        <Row k="Active missions" v={String(c.missions.length)} />
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-white/60">{k}</span>
      <span className="text-white tabular-nums">{v}</span>
    </div>
  );
}

function CreateCampaignModal({ onClose, onSave }: { onClose: () => void; onSave: (c: Campaign) => void }) {
  const [name, setName] = useState("");
  const [type, setType] = useState<CampaignType>("Event");
  const [owner, setOwner] = useState("University Student Affairs");
  const [goal, setGoal] = useState("");
  const [needed, setNeeded] = useState(40);

  function save() {
    if (!name.trim()) return;
    onSave({
      id: `cmp_${Date.now()}`,
      name,
      owner,
      type,
      status: "Draft",
      goal: goal || "Campaign goal pending.",
      volunteersNeeded: needed,
      studentsJoined: 0,
      pointsAwarded: 0,
      certificatesLinked: 0,
      teams: [],
      missions: [],
    });
  }

  return (
    <Modal title="New Campaign" onClose={onClose}>
      <div className="space-y-3">
        <FieldRow label="Campaign name">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. International Culture Night" className="w-full bg-transparent outline-none" />
        </FieldRow>
        <div className="grid grid-cols-2 gap-3">
          <FieldRow label="Type">
            <select value={type} onChange={(e) => setType(e.target.value as CampaignType)} className="w-full bg-transparent outline-none">
              {(["University", "Club", "Department", "Event", "Volunteer"] as CampaignType[]).map((t) => (
                <option key={t} value={t} className="bg-[#0A1530]">{t} Campaign</option>
              ))}
            </select>
          </FieldRow>
          <FieldRow label="Owner">
            <input value={owner} onChange={(e) => setOwner(e.target.value)} className="w-full bg-transparent outline-none" />
          </FieldRow>
        </div>
        <FieldRow label="Campaign goal">
          <textarea value={goal} onChange={(e) => setGoal(e.target.value)} rows={3} className="w-full bg-transparent outline-none resize-none" placeholder="What outcome should this campaign drive?" />
        </FieldRow>
        <FieldRow label={`Volunteers needed · ${needed}`}>
          <input type="range" min={10} max={300} step={10} value={needed} onChange={(e) => setNeeded(Number(e.target.value))} className="w-full accent-[#E8C547]" />
        </FieldRow>
      </div>
      <div className="mt-5 flex gap-2">
        <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/70 hover:bg-white/5">Cancel</button>
        <button onClick={save} className="flex-1 py-2.5 rounded-xl bg-[#E8C547] text-[#0A1530] hover:bg-[#F0D365] flex items-center justify-center gap-2">
          <Check className="size-4" /> Save Draft
        </button>
      </div>
    </Modal>
  );
}

function CreateMissionModal({
  campaigns, defaultCampaignId, onClose, onSave,
}: {
  campaigns: Campaign[];
  defaultCampaignId?: string;
  onClose: () => void;
  onSave: (campaignId: string, mission: Mission) => void;
}) {
  type Belongs = "standalone" | "existing" | "new";
  const [belongs, setBelongs] = useState<Belongs>(defaultCampaignId ? "existing" : "standalone");
  const [campaignId, setCampaignId] = useState<string>(defaultCampaignId || campaigns[0]?.id || "");
  const [newCampaignName, setNewCampaignName] = useState("");
  const [title, setTitle] = useState("");
  const [reward, setReward] = useState(120);
  const [moneyReward, setMoneyReward] = useState(0);
  const [capacity, setCapacity] = useState(8);
  const [team, setTeam] = useState("Marketing");
  const [customTeam, setCustomTeam] = useState("");
  const [cert, setCert] = useState("Volunteer Excellence Certificate");
  const [clubSupervisor, setClubSupervisor] = useState("Prof. R. Tanaka");
  const [clubPresident, setClubPresident] = useState("Alex Chen");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const activeCampaign = belongs === "existing" ? campaigns.find(c => c.id === campaignId) : null;
  const isClub = activeCampaign?.type === "Club";

  const teamOptions = ["Marketing", "Decoration", "Logistics", "Registration", "Media", "General Support", "Custom Role"];
  const finalTeam = team === "Custom Role" ? customTeam || "Custom Role" : team;

  function toggleSkill(skill: string) {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  }

  function save() {
    if (!title.trim()) return;
    let targetId = campaignId;
    if (belongs === "standalone") {
      targetId = "standalone";
    } else if (belongs === "new") {
      // Mission saved without a campaign for now — caller will create campaign separately
      targetId = campaignId;
    }
    if (belongs === "standalone") {
      onClose();
      return;
    }
    onSave(targetId, {
      id: `m_${Date.now()}`,
      title,
      reward,
      certificate: cert,
      team: finalTeam,
      joined: 0,
      capacity,
      moneyReward: moneyReward > 0 ? moneyReward : undefined,
      clubSupervisor: isClub ? clubSupervisor : undefined,
      clubPresident: isClub ? clubPresident : undefined,
      skillsDeveloped: selectedSkills.length > 0 ? selectedSkills : undefined,
    });
  }

  return (
    <Modal title="Create Mission" onClose={onClose}>
      <div className="space-y-3">
        <FieldRow label="Mission belongs to">
          <select value={belongs} onChange={(e) => setBelongs(e.target.value as Belongs)} className="w-full bg-transparent outline-none">
            <option value="standalone" className="bg-[#0A1530]">Standalone Mission</option>
            <option value="existing" className="bg-[#0A1530]">Existing Campaign</option>
            <option value="new" className="bg-[#0A1530]">Create New Campaign</option>
          </select>
        </FieldRow>

        {belongs === "existing" && (
          <FieldRow label="Select Campaign">
            <select value={campaignId} onChange={(e) => setCampaignId(e.target.value)} className="w-full bg-transparent outline-none">
              {campaigns.map((c) => (
                <option key={c.id} value={c.id} className="bg-[#0A1530]">{c.name} · {c.type}</option>
              ))}
            </select>
          </FieldRow>
        )}

        {belongs === "new" && (
          <FieldRow label="New campaign name">
            <input value={newCampaignName} onChange={(e) => setNewCampaignName(e.target.value)} placeholder="Campaign name…" className="w-full bg-transparent outline-none" />
          </FieldRow>
        )}

        <FieldRow label="Mission title">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Join the Marketing Team" className="w-full bg-transparent outline-none" />
        </FieldRow>

        <div className="grid grid-cols-2 gap-3">
          <FieldRow label="Volunteer Role / Team">
            <select value={team} onChange={(e) => setTeam(e.target.value)} className="w-full bg-transparent outline-none">
              {teamOptions.map((o) => <option key={o} value={o} className="bg-[#0A1530]">{o}</option>)}
            </select>
          </FieldRow>
          <FieldRow label="Capacity">
            <input type="number" min={1} value={capacity} onChange={(e) => setCapacity(Number(e.target.value))} className="w-full bg-transparent outline-none" />
          </FieldRow>
        </div>

        {team === "Custom Role" && (
          <FieldRow label="Custom role name">
            <input value={customTeam} onChange={(e) => setCustomTeam(e.target.value)} placeholder="e.g. Hospitality Team" className="w-full bg-transparent outline-none" />
          </FieldRow>
        )}

        <div className="grid grid-cols-2 gap-3">
          <FieldRow label={`Reward · +${reward} pts`}>
            <input type="range" min={20} max={400} step={10} value={reward} onChange={(e) => setReward(Number(e.target.value))} className="w-full accent-[#E8C547]" />
          </FieldRow>
          <FieldRow label="Optional Money (RM)">
            <input type="number" min={0} value={moneyReward || ""} onChange={(e) => setMoneyReward(Number(e.target.value))} placeholder="e.g. 50" className="w-full bg-transparent outline-none" />
          </FieldRow>
        </div>

        {/* Skills Developed */}
        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="text-xs font-bold text-white mb-1">Skills Developed</div>
          <div className="text-[10px] text-white/50 mb-3">
            Tag this mission with the skills students will develop. Used to build their Verified Impact Portfolio.
          </div>
          <div className="flex flex-wrap gap-2">
            {ALL_SKILLS.map((skill) => {
              const active = selectedSkills.includes(skill);
              const color = SKILL_COLORS[skill];
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className="text-[11px] px-3 py-1.5 rounded-lg border font-bold transition-all hover:scale-105"
                  style={active
                    ? { background: `${color}22`, color, borderColor: `${color}60`, boxShadow: `0 0 10px ${color}25` }
                    : { background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.4)", borderColor: "rgba(255,255,255,0.1)" }
                  }
                >
                  {active ? "✓ " : ""}{skill}
                </button>
              );
            })}
          </div>
          {selectedSkills.length > 0 && (
            <div className="mt-2 text-[10px] text-white/40">
              Selected: {selectedSkills.join(", ")}
            </div>
          )}
        </div>

        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="text-xs font-bold text-white mb-2">Certificate Details</div>
          <div className="text-[10px] text-white/50 mb-3">
            {isClub 
              ? "Club mission certificates are automatically pre-signed by the Student Affairs Director, the Club Supervisor, and the Club President."
              : "Mission certificates are automatically pre-signed by the Student Affairs Director."}
          </div>
          <FieldRow label="Linked certificate">
            <select value={cert} onChange={(e) => setCert(e.target.value)} className="w-full bg-transparent outline-none">
              {["Event Ambassador Certificate", "Volunteer Excellence Certificate", "Campus Leadership Certificate", "Event Support Certificate", "Sustainability Champion"].map((o) => (
                <option key={o} value={o} className="bg-[#0A1530]">{o}</option>
              ))}
            </select>
          </FieldRow>

          {isClub && (
            <div className="grid grid-cols-2 gap-3 mt-3">
              <FieldRow label="Club Supervisor">
                <input value={clubSupervisor} onChange={(e) => setClubSupervisor(e.target.value)} placeholder="Name..." className="w-full bg-transparent outline-none" />
              </FieldRow>
              <FieldRow label="Club President">
                <input value={clubPresident} onChange={(e) => setClubPresident(e.target.value)} placeholder="Name..." className="w-full bg-transparent outline-none" />
              </FieldRow>
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 flex gap-2">
        <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/70 hover:bg-white/5">Cancel</button>
        <button onClick={save} className="flex-1 py-2.5 rounded-xl bg-[#E8C547] text-[#0A1530] hover:bg-[#F0D365] flex items-center justify-center gap-2">
          <Check className="size-4" /> {belongs === "standalone" ? "Save Standalone" : "Add to Campaign"}
        </button>
      </div>
    </Modal>
  );
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-[11px] uppercase tracking-widest text-white/50 mb-1">{label}</div>
      <div className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 focus-within:border-[#E8C547]/60">
        {children}
      </div>
    </label>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050B1F]/80 backdrop-blur-sm p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-[#0A1530] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl" style={{ animation: "popIn 0.25s ease-out" }}>
        <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#0A1530]">
          <span className="text-white">{title}</span>
          <button onClick={onClose} className="size-8 rounded-full hover:bg-white/5 text-white/60 flex items-center justify-center">
            <X className="size-4" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
