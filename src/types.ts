export interface PlayerBattingStats {
  "2B": string;
  "3B": string;
  AB: string;
  AVG: string;
  Age: string;
  BB: string;
  CS: string;
  G: string;
  H: string;
  HBP: string;
  HR: string;
  OBP: string;
  OPS: string;
  Player: string;
  Pos: string;
  R: string;
  RBI: string;
  SB: string;
  SF: string;
  SH: string;
  SLG: string;
  SO: string;
  Team: string;
}

export interface PlayerPitchingStats {
  Player: string;
  Team: string;
  Age: string;
  G: string;
  GS: string;
  CG: string;
  SHO: string;
  IP: string;
  H: string;
  ER: string;
  K: string;
  BB: string;
  HR: string;
  W: string;
  L: string;
  SV: string;
  BS: string;
  HLD: string;
  ERA: string;
  WHIP: string;
}

export type Stats = PlayerBattingStats[] | PlayerPitchingStats[];

export type Category = "batting" | "pitching";
