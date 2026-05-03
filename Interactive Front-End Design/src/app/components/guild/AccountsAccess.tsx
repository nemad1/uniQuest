import { useState } from "react";
import {
  Building2, Sparkles, Users, ShieldCheck, FileText, Check, X, Search, UserCog, Mail,
  Clock, Trash2, CircleAlert, Inbox, ArrowRight, GraduationCap, Briefcase,
} from "lucide-react";

type ClubStatus = "Active" | "Pending" | "Suspended";
type Tab = "clubs" | "departments" | "requests" | "members";

type Club = {
  id: string; name: string; category: string; status: ClubStatus;
  authorizedMembers: number; missions: number; campaigns: number;
};

type Dept = {
  id: string; name: string; type: string; owner: string; status: ClubStatus; campaigns: number;
};

type AccessRequest = {
  id: string; clubName: string; description: string; category: string;
  requestedBy: string; studentId: string; email: string;
  proposedMembers: string[]; reason: string; document?: string;
};

type Member = {
  id: string; name: string; email: string; role: "Owner" | "Manager" | "Reviewer";
  scope: string; status: "Active" | "Invited";
};

const SEED_CLUBS: Club[] = [
  { id: "k1", name: "ACM Student Chapter", category: "Technology", status: "Active", authorizedMembers: 4, missions: 24, campaigns: 3 },
  { id: "k2", name: "Robotics Society", category: "Engineering", status: "Active", authorizedMembers: 3, missions: 18, campaigns: 2 },
  { id: "k3", name: "Photography Club", category: "Arts & Media", status: "Pending", authorizedMembers: 2, missions: 0, campaigns: 0 },
  { id: "k4", name: "Debate Society", category: "Humanities", status: "Suspended", authorizedMembers: 1, missions: 6, campaigns: 1 },
];

const SEED_DEPTS: Dept[] = [
  { id: "d1", name: "Department of Physics", type: "Academic", owner: "Dr. Iyer", status: "Active", campaigns: 4 },
  { id: "d2", name: "Office of Student Affairs", type: "Administrative", owner: "Dean Mason", status: "Active", campaigns: 7 },
  { id: "d3", name: "Office of Sustainability", type: "Programs", owner: "M. Tanaka", status: "Active", campaigns: 3 },
];

const SEED_REQUESTS: AccessRequest[] = [
  {
    id: "r1",
    clubName: "Astronomy Society",
    description: "Student-led club for stargazing events, telescope nights, and space-science talks.",
    category: "Science",
    requestedBy: "Aanya Rao",
    studentId: "NB-2024-1187",
    email: "aanya.rao@northbridge.edu",
    proposedMembers: ["Aanya Rao (Owner)", "Devon Singh (Manager)", "Chen Wei (Reviewer)"],
    reason: "We host monthly stargazing events and need a way to track volunteer hours and issue recognition certificates.",
    document: "astronomy_society_charter.pdf",
  },
  {
    id: "r2",
    clubName: "Sustainability Collective",
    description: "Campus-wide initiative for recycling drives, eco-workshops, and zero-waste campaigns.",
    category: "Environment",
    requestedBy: "Marcus Lee",
    studentId: "NB-2023-0942",
    email: "marcus.lee@northbridge.edu",
    proposedMembers: ["Marcus Lee (Owner)", "Priya Kumar (Manager)"],
    reason: "We're partnering with the Office of Sustainability and need a workspace to coordinate volunteer teams.",
    document: "sustainability_proposal.pdf",
  },
];

const SEED_MEMBERS: Member[] = [
  { id: "u1", name: "Priya Kumar", email: "priya.kumar@northbridge.edu", role: "Owner", scope: "ACM Student Chapter", status: "Active" },
  { id: "u2", name: "Devon Singh", email: "devon.singh@northbridge.edu", role: "Manager", scope: "ACM Student Chapter", status: "Active" },
  { id: "u3", name: "Marcus Lee", email: "marcus.lee@northbridge.edu", role: "Owner", scope: "Robotics Society", status: "Active" },
  { id: "u4", name: "Dr. Iyer", email: "iyer@northbridge.edu", role: "Owner", scope: "Department of Physics", status: "Active" },
  { id: "u5", name: "Sam Tan", email: "sam.tan@northbridge.edu", role: "Reviewer", scope: "Photography Club", status: "Invited" },
];

const STATUS_STYLES: Record<ClubStatus, string> = {
  Active: "bg-[#10E6A1]/10 text-[#10E6A1] border-[#10E6A1]/30",
  Pending: "bg-[#E8C547]/10 text-[#E8C547] border-[#E8C547]/30",
  Suspended: "bg-[#FF6B6B]/10 text-[#FF6B6B] border-[#FF6B6B]/30",
};

export function AccountsAccessSection() {
  const [tab, setTab] = useState<Tab>("clubs");
  const [clubs, setClubs] = useState<Club[]>(SEED_CLUBS);
  const [depts] = useState<Dept[]>(SEED_DEPTS);
  const [requests, setRequests] = useState<AccessRequest[]>(SEED_REQUESTS);
  const [members, setMembers] = useState<Member[]>(SEED_MEMBERS);
  const [reviewing, setReviewing] = useState<AccessRequest | null>(null);

  function approveRequest(id: string) {
    const r = requests.find((x) => x.id === id);
    if (!r) return;
    setClubs((arr) => [
      { id: `k_${Date.now()}`, name: r.clubName, category: r.category, status: "Active", authorizedMembers: r.proposedMembers.length, missions: 0, campaigns: 0 },
      ...arr,
    ]);
    setRequests((arr) => arr.filter((x) => x.id !== id));
    setReviewing(null);
  }

  function rejectRequest(id: string) {
    setRequests((arr) => arr.filter((x) => x.id !== id));
    setReviewing(null);
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="text-sm text-white/80 flex items-center gap-2">
            <ShieldCheck className="size-4 text-[#08E8F0]" /> Accounts & Access
          </div>
          <div className="text-xs text-white/50">Manage clubs, departments, and authorized members across the university.</div>
        </div>
      </div>

      <div className="flex gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/10 w-fit overflow-x-auto">
        {([
          { v: "clubs", l: "Clubs", Icon: Sparkles, n: clubs.length },
          { v: "departments", l: "Departments", Icon: Building2, n: depts.length },
          { v: "requests", l: "Access Requests", Icon: Inbox, n: requests.length },
          { v: "members", l: "Authorized Members", Icon: UserCog, n: members.length },
        ] as { v: Tab; l: string; Icon: any; n: number }[]).map(({ v, l, Icon, n }) => (
          <button
            key={v}
            onClick={() => setTab(v)}
            className={`text-xs px-3 py-1.5 rounded-lg whitespace-nowrap flex items-center gap-1.5 transition ${
              tab === v ? "bg-[#0B3D91] text-white shadow" : "text-white/60 hover:text-white"
            }`}
          >
            <Icon className="size-3.5" /> {l}
            <span className={`text-[10px] tabular-nums ${tab === v ? "text-[#E8C547]" : "text-white/40"}`}>{n}</span>
          </button>
        ))}
      </div>

      {tab === "clubs" && <ClubsTab clubs={clubs} />}
      {tab === "departments" && <DepartmentsTab depts={depts} />}
      {tab === "requests" && (
        <RequestsTab requests={requests} onReview={setReviewing} onApprove={approveRequest} onReject={rejectRequest} />
      )}
      {tab === "members" && <MembersTab members={members} setMembers={setMembers} />}

      {reviewing && (
        <RequestModal
          request={reviewing}
          onClose={() => setReviewing(null)}
          onApprove={() => approveRequest(reviewing.id)}
          onReject={() => rejectRequest(reviewing.id)}
        />
      )}
    </div>
  );
}

function ClubsTab({ clubs }: { clubs: Club[] }) {
  const [q, setQ] = useState("");
  const filtered = clubs.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="space-y-3">
      <SearchBar value={q} onChange={setQ} placeholder="Search clubs…" />
      {filtered.length === 0 ? (
        <Empty icon={<Sparkles className="size-6" />} title="No clubs match your search." />
      ) : (
        <div className="grid md:grid-cols-2 gap-3">
          {filtered.map((c) => (
            <div key={c.id} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="flex items-start gap-3">
                <div className="size-10 rounded-xl bg-[#E8C547]/10 border border-[#E8C547]/30 flex items-center justify-center">
                  <Sparkles className="size-4 text-[#E8C547]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm">{c.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${STATUS_STYLES[c.status]}`}>{c.status}</span>
                  </div>
                  <div className="text-xs text-white/50">{c.category}</div>
                </div>
                <button className="text-xs px-3 py-1.5 rounded-lg bg-[#0B3D91] border border-[#E8C547]/40 hover:bg-[#0A2E6E] flex items-center gap-1">
                  <UserCog className="size-3 text-[#E8C547]" /> Manage
                </button>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <Mini label="Members" value={c.authorizedMembers} />
                <Mini label="Missions" value={c.missions} />
                <Mini label="Campaigns" value={c.campaigns} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DepartmentsTab({ depts }: { depts: Dept[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-3">
      {depts.map((d) => (
        <div key={d.id} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
          <div className="size-10 rounded-xl bg-[#08E8F0]/10 border border-[#08E8F0]/30 flex items-center justify-center">
            <Building2 className="size-4 text-[#08E8F0]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm">{d.name}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${STATUS_STYLES[d.status]}`}>{d.status}</span>
            </div>
            <div className="text-xs text-white/50">{d.type} · Owner {d.owner} · {d.campaigns} campaigns</div>
          </div>
          <button className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#08E8F0]/40 flex items-center gap-1">
            <UserCog className="size-3 text-[#08E8F0]" /> Manage
          </button>
        </div>
      ))}
    </div>
  );
}

function RequestsTab({
  requests, onReview, onApprove, onReject,
}: {
  requests: AccessRequest[];
  onReview: (r: AccessRequest) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) {
  if (requests.length === 0) {
    return <Empty icon={<Inbox className="size-6" />} title="Inbox clear. No pending club account requests." />;
  }
  return (
    <div className="space-y-3">
      {requests.map((r) => (
        <div key={r.id} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
          <div className="flex items-start gap-3 flex-wrap">
            <div className="size-11 rounded-xl bg-[#E8C547]/10 border border-[#E8C547]/30 flex items-center justify-center">
              <Sparkles className="size-5 text-[#E8C547]" />
            </div>
            <div className="flex-1 min-w-[240px]">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-white">{r.clubName}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E8C547]/10 text-[#E8C547] border border-[#E8C547]/30">{r.category}</span>
              </div>
              <p className="text-xs text-white/60 mt-1 leading-relaxed max-w-2xl">{r.description}</p>
              <div className="mt-3 grid sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-white/60">
                <div><span className="text-white/40">Requested by</span> · {r.requestedBy}</div>
                <div><span className="text-white/40">Student ID</span> · {r.studentId}</div>
                <div className="sm:col-span-2 truncate"><span className="text-white/40">Email</span> · {r.email}</div>
              </div>
              <div className="mt-3 text-[11px] text-white/50">Proposed authorized members:</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {r.proposedMembers.map((m) => (
                  <span key={m} className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-white/70">{m}</span>
                ))}
              </div>
              {r.document && (
                <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] px-2 py-1 rounded-lg bg-[#08E8F0]/5 border border-[#08E8F0]/20 text-[#08E8F0]">
                  <FileText className="size-3" /> {r.document}
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={() => onApprove(r.id)} className="text-xs px-3 py-1.5 rounded-lg bg-[#10E6A1] text-[#04121E] hover:bg-[#1FF5B0] flex items-center gap-1">
              <Check className="size-3" /> Approve Club Account
            </button>
            <button onClick={() => onReject(r.id)} className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#FF6B6B]/40 hover:text-[#FF6B6B] flex items-center gap-1">
              <X className="size-3" /> Reject Request
            </button>
            <button onClick={() => onReview(r)} className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#08E8F0]/40 flex items-center gap-1">
              <Mail className="size-3 text-[#08E8F0]" /> Request More Info
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function MembersTab({ members, setMembers }: { members: Member[]; setMembers: (m: Member[]) => void }) {
  const [q, setQ] = useState("");
  const filtered = members.filter((m) => (m.name + m.email + m.scope).toLowerCase().includes(q.toLowerCase()));

  function remove(id: string) {
    setMembers(members.filter((m) => m.id !== id));
  }

  return (
    <div className="space-y-3">
      <SearchBar value={q} onChange={setQ} placeholder="Search authorized members…" />
      <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
        <div className="grid grid-cols-[1.4fr_1.2fr_0.8fr_1fr_0.6fr] gap-3 px-4 py-2 text-[11px] uppercase tracking-widest text-white/50 border-b border-white/10 hidden md:grid">
          <span>Name</span><span>Email</span><span>Role</span><span>Scope · Status</span><span className="text-right">Action</span>
        </div>
        {filtered.length === 0 ? (
          <Empty icon={<UserCog className="size-6" />} title="No members match your search." />
        ) : (
          filtered.map((m) => (
            <div key={m.id} className="grid md:grid-cols-[1.4fr_1.2fr_0.8fr_1fr_0.6fr] gap-3 px-4 py-3 items-center border-b border-white/5 last:border-b-0 text-sm">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-gradient-to-br from-[#0B3D91] to-[#1E5FBF] text-xs flex items-center justify-center">{m.name.split(" ").map((s) => s[0]).join("")}</div>
                <span>{m.name}</span>
              </div>
              <span className="text-white/60 text-xs truncate">{m.email}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border w-fit ${m.role === "Owner" ? "bg-[#E8C547]/10 text-[#E8C547] border-[#E8C547]/30" : m.role === "Manager" ? "bg-[#08E8F0]/10 text-[#08E8F0] border-[#08E8F0]/30" : "bg-white/5 text-white/70 border-white/10"}`}>
                {m.role}
              </span>
              <div className="text-xs">
                <div className="text-white/70 truncate">{m.scope}</div>
                <div className={m.status === "Active" ? "text-[#10E6A1]" : "text-[#E8C547]"}>{m.status}</div>
              </div>
              <div className="md:text-right">
                <button onClick={() => remove(m.id)} className="text-xs px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#FF6B6B]/40 hover:text-[#FF6B6B] inline-flex items-center gap-1">
                  <Trash2 className="size-3" /> Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="p-3 rounded-xl bg-[#08E8F0]/5 border border-[#08E8F0]/20 text-[11px] text-[#08E8F0]/90 flex items-center gap-2">
        <CircleAlert className="size-3.5" /> Each club has one account, but multiple authorized members can access it.
      </div>
    </div>
  );
}

function RequestModal({
  request, onClose, onApprove, onReject,
}: { request: AccessRequest; onClose: () => void; onApprove: () => void; onReject: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050B1F]/80 backdrop-blur-sm p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-[#0A1530] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl" style={{ animation: "popIn 0.25s ease-out" }}>
        <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between">
          <span className="text-white">Request More Info</span>
          <button onClick={onClose} className="size-8 rounded-full hover:bg-white/5 text-white/60 flex items-center justify-center">
            <X className="size-4" />
          </button>
        </div>
        <div className="p-5 space-y-3">
          <div className="text-sm">{request.clubName}</div>
          <textarea
            rows={4}
            placeholder="What additional information do you need from the requester?"
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#08E8F0]/60 resize-none"
          />
          <div className="flex gap-2">
            <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/70 hover:bg-white/5">Cancel</button>
            <button onClick={onClose} className="flex-1 py-2.5 rounded-xl bg-[#08E8F0] text-[#04121E] hover:bg-[#1FF5FF] flex items-center justify-center gap-2">
              <Mail className="size-4" /> Send Request
            </button>
          </div>
          <div className="pt-3 border-t border-white/10 flex gap-2">
            <button onClick={onReject} className="flex-1 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#FF6B6B]/40 hover:text-[#FF6B6B] text-xs flex items-center justify-center gap-1">
              <X className="size-3" /> Reject
            </button>
            <button onClick={onApprove} className="flex-1 py-2 rounded-xl bg-[#10E6A1] text-[#04121E] hover:bg-[#1FF5B0] text-xs flex items-center justify-center gap-1">
              <Check className="size-3" /> Approve Anyway
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchBar({ value, onChange, placeholder }: { value: string; onChange: (s: string) => void; placeholder: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 focus-within:border-[#08E8F0]/40 max-w-md">
      <Search className="size-4 text-white/40" />
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="flex-1 bg-transparent outline-none text-sm" />
    </div>
  );
}

function Mini({ label, value }: { label: string; value: number }) {
  return (
    <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10">
      <div className="text-sm tabular-nums text-white">{value}</div>
      <div className="text-[10px] text-white/50">{label}</div>
    </div>
  );
}

function Empty({ icon, title, action }: { icon: React.ReactNode; title: string; action?: React.ReactNode }) {
  return (
    <div className="p-10 text-center rounded-2xl bg-white/[0.03] border border-white/10">
      <div className="text-white/40 inline-flex">{icon}</div>
      <div className="mt-2 text-sm text-white/70">{title}</div>
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}

/* ---------- Public: Request Club Workspace flow (used from Landing) ---------- */

export function RequestClubWorkspaceModal({ onClose }: { onClose: () => void }) {
  const [stage, setStage] = useState<"form" | "submitted">("form");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Technology");
  const [description, setDescription] = useState("");
  const [applicant, setApplicant] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [committeeRole, setCommitteeRole] = useState("President");
  const [members, setMembers] = useState("");
  const [advisor, setAdvisor] = useState("");
  const [reason, setReason] = useState("");
  const [doc, setDoc] = useState<string | null>(null);

  function submit() {
    if (!name.trim() || !email.trim()) return;
    setStage("submitted");
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#050B1F]/80 backdrop-blur-sm p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-[#0A1530] border border-white/10 rounded-2xl w-full max-w-xl max-h-[92vh] overflow-y-auto shadow-2xl" style={{ animation: "popIn 0.25s ease-out" }}>
        <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#0A1530] z-10">
          <div className="flex items-center gap-2 text-sm">
            <GraduationCap className="size-4 text-[#E8C547]" /> Request a Club Workspace
          </div>
          <button onClick={onClose} className="size-8 rounded-full hover:bg-white/5 text-white/60 flex items-center justify-center">
            <X className="size-4" />
          </button>
        </div>

        {stage === "form" && (
          <div className="p-5 space-y-3">
            <p className="text-xs text-white/60">
              Submit details about your club. University staff will review and approve your workspace.
            </p>

            <Field label="Club name">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Astronomy Society" className="w-full bg-transparent outline-none" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Club category">
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-transparent outline-none">
                  {["Technology", "Engineering", "Arts & Media", "Humanities", "Science", "Sports", "Environment", "Cultural", "Service"].map((o) => (
                    <option key={o} value={o} className="bg-[#0A1530]">{o}</option>
                  ))}
                </select>
              </Field>
              <Field label="Committee role">
                <select value={committeeRole} onChange={(e) => setCommitteeRole(e.target.value)} className="w-full bg-transparent outline-none">
                  {["President", "Vice President", "Secretary", "Treasurer", "Chair"].map((o) => (
                    <option key={o} value={o} className="bg-[#0A1530]">{o}</option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="Club description">
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="What does the club do?" className="w-full bg-transparent outline-none resize-none" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Applicant name">
                <input value={applicant} onChange={(e) => setApplicant(e.target.value)} className="w-full bg-transparent outline-none" />
              </Field>
              <Field label="Student ID">
                <input value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="NB-2024-XXXX" className="w-full bg-transparent outline-none" />
              </Field>
            </div>
            <Field label="University email">
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@university.edu" className="w-full bg-transparent outline-none" />
            </Field>
            <Field label="List of authorized members (comma separated)">
              <input value={members} onChange={(e) => setMembers(e.target.value)} placeholder="Aanya Rao, Devon Singh, Chen Wei" className="w-full bg-transparent outline-none" />
            </Field>
            <Field label="Club advisor (optional)">
              <input value={advisor} onChange={(e) => setAdvisor(e.target.value)} placeholder="Faculty name" className="w-full bg-transparent outline-none" />
            </Field>
            <Field label="Reason for joining Downtown">
              <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={3} className="w-full bg-transparent outline-none resize-none" />
            </Field>

            <div>
              <div className="text-[11px] uppercase tracking-widest text-white/50 mb-1">Supporting document</div>
              <button
                onClick={() => setDoc(doc ? null : "club_charter.pdf")}
                className={`w-full p-3 rounded-xl border-2 border-dashed text-left text-sm flex items-center gap-2 transition ${doc ? "border-[#10E6A1]/40 bg-[#10E6A1]/5 text-[#10E6A1]" : "border-white/15 bg-white/[0.02] text-white/60 hover:border-[#08E8F0]/40"}`}
              >
                <FileText className="size-4" />
                {doc ? `${doc} uploaded` : "Upload supporting document (charter, advisor letter, etc.)"}
              </button>
            </div>

            <div className="pt-3 flex gap-2">
              <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/70 hover:bg-white/5">Cancel</button>
              <button onClick={submit} className="flex-1 py-2.5 rounded-xl bg-[#E8C547] text-[#0A1530] hover:bg-[#F0D365] flex items-center justify-center gap-2">
                Submit Request <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        )}

        {stage === "submitted" && (
          <div className="p-8 text-center">
            <div className="size-16 mx-auto rounded-2xl bg-[#10E6A1]/15 border border-[#10E6A1]/30 flex items-center justify-center">
              <Check className="size-7 text-[#10E6A1]" />
            </div>
            <h3 className="mt-4 text-white" style={{ fontSize: 18 }}>Request submitted</h3>
            <p className="mt-2 text-sm text-white/60 leading-relaxed">
              Your club workspace request has been submitted to university staff for review.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-[#E8C547]/10 text-[#E8C547] border border-[#E8C547]/30">
              <Clock className="size-3" /> Pending University Approval
            </div>
            <button onClick={onClose} className="mt-6 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#08E8F0]/40 text-sm">
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-[11px] uppercase tracking-widest text-white/50 mb-1">{label}</div>
      <div className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 focus-within:border-[#E8C547]/60">
        {children}
      </div>
    </label>
  );
}

/* ---------- Empty state for student without Guild access ---------- */

export function NoGuildAccessEmpty({ onRequest }: { onRequest: () => void }) {
  return (
    <div className="p-10 text-center rounded-3xl bg-white/[0.03] border border-white/10">
      <div className="size-14 mx-auto rounded-2xl bg-[#E8C547]/10 border border-[#E8C547]/30 flex items-center justify-center">
        <Briefcase className="size-6 text-[#E8C547]" />
      </div>
      <h3 className="mt-3 text-white" style={{ fontSize: 18 }}>You do not have Guild Master access.</h3>
      <p className="mt-1 text-sm text-white/60">If you're on a club committee, request a workspace and university staff will review it.</p>
      <button onClick={onRequest} className="mt-5 px-5 py-2.5 rounded-xl bg-[#E8C547] text-[#0A1530] hover:bg-[#F0D365] inline-flex items-center gap-2">
        Request Club Workspace <ArrowRight className="size-4" />
      </button>
    </div>
  );
}
