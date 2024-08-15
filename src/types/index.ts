import type { Characters, Owner, Player } from 'enkanetwork.js';

// CLIENT
export type PropsWithChildren = Readonly<{ children?: React.ReactNode }>;

// SERVER
export interface GenshinPlayerData {
  characters: Characters[];
  owner: Owner;
  player: Player;
  ttl: number;
  uid: string;
}

export interface Messages {
  message: string,
  username: string
}
