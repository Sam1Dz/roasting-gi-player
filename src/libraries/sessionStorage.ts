'use client';

import type { Messages } from '@/types';

export const setSessionData = (key: string, data: Messages) => {
    sessionStorage.setItem(key, JSON.stringify(data));
}

export const getSessionData = (key: string) => {
    return JSON.parse(sessionStorage.getItem(key) as string) as Messages;
}