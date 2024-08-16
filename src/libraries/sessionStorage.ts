'use client';

import type { GenshinPlayerData } from '@/types';

export const setSessionData = (key: string, data: GenshinPlayerData) => {
  sessionStorage.setItem(key, JSON.stringify(data));
};

export const getSessionData = (key: string) => {
  return JSON.parse(sessionStorage.getItem(key) as string) as GenshinPlayerData;
};
