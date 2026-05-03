import { useState } from "react";
import { mentors } from "./data";
import { Mentor, ChatMessage } from "./types";
import { Star, Send, Circle, MessageSquare, Wifi } from "lucide-react";

const allSkills = ["Java", "Spring4", "FinalYearProject", "GraphicDesign", "Figma", "LinearAlgebra", "Python", "Robotics"];

export function MentorshipBridge() {
  const [active, setActive] = useState<Mentor | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  const filtered = filter ? mentors.filter((m) => m.skills.includes(filter)) : mentors;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-slate-900">Peer-Mentorship Bridge</h3>
          <p className="text-xs text-slate-500">Verified seniors · pay-per-session</p>
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
          <Wifi className="size-3" /> Socket connected
        </span>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        <SkillChip label="All" active={filter === null} onClick={() => setFilter(null)} />
        {allSkills.map((s) => (
          <SkillChip key={s} label={`#${s}`} active={filter === s} onClick={() => setFilter(s)} />
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {filtered.map((m) => (
          <button
            key={m.id}
            onClick={() => setActive(m)}
            className="text-left p-4 rounded-2xl bg-white border border-slate-200/70 hover:border-[#0B3D91]/40 hover:shadow-md transition group"
          >
            <div className="flex items-start gap-3">
              <div className="relative">
                <div className="size-12 rounded-full bg-gradient-to-br from-[#0B3D91] to-[#1E5FBF] text-white flex items-center justify-center">{m.avatar}</div>
                {m.online && <Circle className="absolute -bottom-0.5 -right-0.5 size-3.5 fill-emerald-500 text-emerald-500 stroke-white stroke-2" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-slate-900 truncate">{m.name}</span>
                  <span className="flex items-center gap-0.5 text-xs text-amber-600">
                    <Star className="size-3 fill-amber-500 text-amber-500" /> {m.rating}
                  </span>
                </div>
                <div className="text-xs text-slate-500">{m.major} · {m.sessions} sessions</div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {m.skills.slice(0, 3).map((s) => (
                    <span key={s} className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-50 text-[#0B3D91]">#{s}</span>
                  ))}
                </div>
              </div>
              <MessageSquare className="size-4 text-slate-300 group-hover:text-[#0B3D91] transition" />
            </div>
          </button>
        ))}
      </div>

      {active && <ChatPanel mentor={active} onClose={() => setActive(null)} />}
    </div>
  );
}

function SkillChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-3 py-1.5 rounded-full border transition ${active ? "bg-[#0B3D91] text-white border-[#0B3D91]" : "bg-white text-slate-600 border-slate-200 hover:border-[#0B3D91]/40"}`}
    >
      {label}
    </button>
  );
}

function ChatPanel({ mentor, onClose }: { mentor: Mentor; onClose: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "c1", from: "them", text: `Hey! I'm ${mentor.name}. What are you stuck on?`, time: "now" },
  ]);
  const [input, setInput] = useState("");

  function send() {
    if (!input.trim()) return;
    const msg: ChatMessage = { id: `c${Date.now()}`, from: "me", text: input, time: "now" };
    setMessages((m) => [...m, msg]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { id: `c${Date.now() + 1}`, from: "them", text: "Got it — let me share a code snippet that addresses that.", time: "now" }]);
    }, 900);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col max-h-[85vh]" style={{ animation: "slideUp 0.3s ease-out" }}>
        <div className="px-4 py-3 border-b border-slate-200 flex items-center gap-3">
          <div className="relative">
            <div className="size-10 rounded-full bg-gradient-to-br from-[#0B3D91] to-[#1E5FBF] text-white flex items-center justify-center">{mentor.avatar}</div>
            {mentor.online && <Circle className="absolute -bottom-0.5 -right-0.5 size-3 fill-emerald-500 text-emerald-500 stroke-white stroke-2" />}
          </div>
          <div className="flex-1">
            <div className="text-slate-900">{mentor.name}</div>
            <div className="text-xs text-emerald-600">● Active session · billed at $40/hr</div>
          </div>
          <button onClick={onClose} className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50">End</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${m.from === "me" ? "bg-[#0B3D91] text-white rounded-br-sm" : "bg-slate-100 text-slate-800 rounded-bl-sm"}`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-slate-200 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Type a message…"
            className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-[#0B3D91]"
          />
          <button onClick={send} className="size-10 rounded-xl bg-[#0B3D91] text-white flex items-center justify-center hover:bg-[#0A2E6E]">
            <Send className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
