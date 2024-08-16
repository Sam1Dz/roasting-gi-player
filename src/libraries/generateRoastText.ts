/* TYPES */
import type { GenshinPlayerData } from '@/types';

const isJapanese = (text: string) => {
  const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF]/;
  return japaneseRegex.test(text);
};

const isChinese = (text: string) => {
  const chineseRegex = /[\u4E00-\u9FFF]/;
  return chineseRegex.test(text);
};

const isNumber = (text: string) => {
  const numberRegex = /\d/;
  return numberRegex.test(text);
};

export const GenerateRoastText = (data: GenshinPlayerData) => {
  const { username, showcase, levels } = data.player;

  const adventureRank = Number(levels.rank);
  const showcaseHaveCustomes = showcase.filter(({ costumeId }) => costumeId);

  // Generate Roasting Text
  let usernameRoast: string;
  if (isJapanese(username)) {
    usernameRoast = 'Lu wibu akut ya sampe username lu pake bahasa jepang. ';
  } else if (isChinese(username)) {
    usernameRoast = 'Lu chindo? gw gk bisa baca username lu apa. ';
  } else if (isNumber(username)) {
    usernameRoast = 'Lu kehabisan username ya sampe pake angka segala. ';
  } else {
    usernameRoast = 'Username lu gk ada kreatif" nya. ';
  }

  let levelRoast: string;
  if (adventureRank < 16) {
    levelRoast = `Kasian bener lu masih level ${adventureRank}, gk bisa Co Op, mending lu main tiap hari biar naek level. `;
  } else if (adventureRank < 20) {
    levelRoast = `Kasian lu level ${adventureRank} udah bisa Co Op tp lu gk punya teman buat maen. `;
  } else if (adventureRank < 25) {
    levelRoast = `Kasian lu level ${adventureRank} udah bisa Co Op tp lu gk punya teman buat maen. `;
  } else if (adventureRank < 30) {
    levelRoast = `Kasian lu level ${adventureRank} tp gk punya artefak bintang 5, mending lu kalahin weekly boss biar dapat banyak artefak bintang 5. `;
  } else if (adventureRank < 35) {
    levelRoast = `Kasian lu level ${adventureRank} tp gk punya artefak bintang 5, mending lu kalahin weekly boss biar dapat banyak artefak bintang 5. `;
  } else if (adventureRank < 40) {
    levelRoast = `Kasian lu level ${adventureRank} tp gk punya artefak bintang 5, mending lu kalahin weekly boss biar dapat banyak artefak bintang 5. `;
  } else if (adventureRank < 45) {
    levelRoast = `Kasian lu udah level ${adventureRank} tp artefak bintang 5 lu sedikit, mending lu farming normal bos biar banyak dapat artefak bintang 5. `;
  } else if (adventureRank < 50) {
    levelRoast = `Kasian lu udah level ${adventureRank} tp artefak bintang 5 lu sedikit, mending lu farming normal bos biar banyak dapat artefak bintang 5. `;
  } else if (adventureRank < 55) {
    levelRoast = `Kasian lu udah level ${adventureRank} tp gk punya meterial bintang 5, mending lu kalahin weekly bos biar dapat material bintang 5. `;
  } else if (adventureRank < 60) {
    levelRoast = `Kasian lu udah level ${adventureRank} tp meterial bintang 5 lu sedikit, mending lu farming normal bos biar banyak dapat banyak meterial bintang 5. `;
  } else {
    levelRoast = `Level lu udah ${adventureRank}, udah mentok noh, mau cari apa lagi lu?. `;
  }

  let showcaseRoast: string;
  if (showcase.length > 0) {
    showcaseRoast = `Lu juga flexing lagi dengan nampilin ${showcase.length} karakter terbaik di profil lu. `;
  } else {
    showcaseRoast = '';
  }

  let showcaseCostumeRoast: string;
  if (showcaseHaveCustomes.length > 0) {
    showcaseCostumeRoast = `${showcaseHaveCustomes.length} karakter yang lu flexing juga ada skin-nya lagi. Lu pasti orang kaya ya sampe top up beli-in skin buat nih karakter.`;
  } else {
    showcaseCostumeRoast = '';
  }

  return {
    title: `Hei lu ${username}!`,
    content: usernameRoast + levelRoast + showcaseRoast + showcaseCostumeRoast,
  };
};
