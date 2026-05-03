export type MissionStatus = "open" | "accepted" | "in_progress" | "proof_submitted" | "released";

export type MissionCategory =
  | "university_campaign"
  | "club_mission"
  | "peer_support"
  | "junior_support";

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface MissionCategoryMeta {
  key: MissionCategory;
  label: string;
  shortLabel: string;
  color: string;
  description: string;
  pointsRange: [number, number];
  recommendedPoints: number;
  certificates: string[];
  badge: string;
  volunteerHours?: number;
}

export const MISSION_CATEGORIES: Record<MissionCategory, MissionCategoryMeta> = {
  university_campaign: {
    key: "university_campaign",
    label: "University Campaign Support",
    shortLabel: "University",
    color: "#E8C547",
    description: "Major university events, campaigns, and volunteering needs.",
    pointsRange: [120, 300],
    recommendedPoints: 150,
    certificates: ["Event Ambassador Certificate", "Volunteer Excellence Certificate"],
    badge: "Leadership Badge",
    volunteerHours: 2,
  },
  club_mission: {
    key: "club_mission",
    label: "Club Campaign / Club Mission",
    shortLabel: "Club",
    color: "#08E8F0",
    description: "Club events, workshops, campaigns, competitions, and recruitment.",
    pointsRange: [80, 220],
    recommendedPoints: 120,
    certificates: ["Club Contributor Certificate", "Campus Engagement Certificate"],
    badge: "Club Supporter Badge",
  },
  peer_support: {
    key: "peer_support",
    label: "Peer Support",
    shortLabel: "Peer",
    color: "#10E6A1",
    description: "Student-to-student help with tasks, skills, or project issues.",
    pointsRange: [40, 120],
    recommendedPoints: 80,
    certificates: ["Peer Support Certificate"],
    badge: "Skill Helper Badge",
  },
  junior_support: {
    key: "junior_support",
    label: "Junior Support",
    shortLabel: "Junior",
    color: "#A78BFA",
    description: "Senior-to-junior mentorship — academic or social guidance.",
    pointsRange: [80, 200],
    recommendedPoints: 120,
    certificates: ["Peer Mentor Certificate", "Campus Leadership Certificate"],
    badge: "Junior Mentor Badge",
  },
};

export interface Mission {
  id: string;
  title: string;
  club: string;
  verified: boolean;
  reward: number;
  deposit: number;
  urgency: "low" | "medium" | "high";
  tags: string[];
  description: string;
  status: MissionStatus;
  postedAgo: string;
  applicants: number;
  category: "task" | "mentorship" | "hackathon";
  missionCategory?: MissionCategory;
  difficulty?: Difficulty;
  deadline?: string;
  volunteerHours?: number;
  certificateProgress?: string;
  badge?: string;
  createdBy?: string;
  moneyReward?: number;
  generateCertificate?: boolean;
  certificateTitle?: string;
  certificateDescription?: string;
  certificateTemplate?: string;
  certificateSignerType?: "university" | "club" | "department";
  clubSupervisor?: string;
  clubPresident?: string;
  skillsDeveloped?: string[];
}

export interface FeedActivity {
  id: string;
  user: string;
  avatar: string;
  action: string;
  target: string;
  amount?: number;
  timeAgo: string;
  kind: "join" | "complete" | "post" | "reward";
}

export interface Mentor {
  id: string;
  name: string;
  avatar: string;
  major: string;
  rating: number;
  sessions: number;
  skills: string[];
  online: boolean;
}

export interface ChatMessage {
  id: string;
  from: "me" | "them";
  text: string;
  time: string;
}
