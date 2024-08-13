'use server';

import { Wrapper } from 'enkanetwork.js';

/* TYPES */
import type { GenshinPlayerData } from '@/types';

export const GetAccountInfo = async (uid: number) => {
  try {
    const { genshin: GenshinAPI } = new Wrapper({
      language: 'id',
      cache: true,
    });

    const PlayerData = await GenshinAPI.getPlayer(uid);
    const newPlayerData: GenshinPlayerData = {
      characters: PlayerData.characters,
      owner: PlayerData.owner,
      player: PlayerData.player,
      ttl: PlayerData.ttl,
      uid: PlayerData.uid,
    };

    return {
      status: 'success',
      code: 200,
      message: 'Success get player data',
      data: JSON.parse(JSON.stringify(newPlayerData)) as GenshinPlayerData,
    };
  } catch (error: unknown) {
    const errorRes = error as Error;
    console.error(errorRes.message);

    switch (errorRes.message) {
      case 'The UID format is incorrect':
        return {
          status: 'error',
          code: 400,
          message: errorRes.message,
          data: null,
        };

      case "The player or profile doesn't exists":
        return {
          status: 'error',
          code: 404,
          message: errorRes.message,
          data: null,
        };

      default:
        return {
          status: 'error',
          code: 500,
          message: 'Internal server error',
          data: null,
        };
    }
  }
};
