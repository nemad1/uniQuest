export type RankKey = "bronze" | "silver" | "gold" | "platinum" | "diamond" | "legend";

export interface Rank {
  key: RankKey;
  label: string;
  min: number;
  max: number;
  color: string;
  glow: string;
}

export const RANKS: Rank[] = [
  { key: "bronze",   label: "Bronze Vanguard",   min: 0,    max: 499,   color: "#C68B5C", glow: "rgba(198,139,92,0.4)" },
  { key: "silver",   label: "Silver Vanguard",   min: 500,  max: 1499,  color: "#C0CBD8", glow: "rgba(192,203,216,0.4)" },
  { key: "gold",     label: "Gold Vanguard",     min: 1500, max: 2999,  color: "#E8C547", glow: "rgba(232,197,71,0.5)" },
  { key: "platinum", label: "Platinum Vanguard", min: 3000, max: 4999,  color: "#9FE8FF", glow: "rgba(159,232,255,0.4)" },
  { key: "diamond",  label: "Diamond Vanguard",  min: 5000, max: 7999,  color: "#08E8F0", glow: "rgba(8,232,240,0.5)" },
  { key: "legend",   label: "Campus Legend",     min: 8000, max: 99999, color: "#10E6A1", glow: "rgba(16,230,161,0.5)" },
];

export function getRank(points: number): Rank {
  return RANKS.find((r) => points >= r.min && points <= r.max) ?? RANKS[0];
}

export function getNextRank(points: number): Rank | null {
  const idx = RANKS.findIndex((r) => points >= r.min && points <= r.max);
  return idx >= 0 && idx < RANKS.length - 1 ? RANKS[idx + 1] : null;
}
