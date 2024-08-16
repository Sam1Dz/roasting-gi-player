'use client';

import React from 'react';
import NextImage from 'next/image';
import NextLink from 'next/link';

import clsx from 'clsx/lite';

/* COMPONENTS */
import Modal from '@/components/modal';
import Skeleton from '@/components/skeleton';
import LoadingScreen from '@/components/loading-screen';
// Icons
import AIIcon from '@/components/icons/ai-icon';
import CopyIcon from '@/components/icons/copy-icon';

/* LIBRARIES */
import { GenerateRoastText } from '@/libraries/generateRoastText';
import { setSessionData, getSessionData } from '@/libraries/sessionStorage';
// Actions
import { GenerateText } from '@/libraries/actions/gemini-generator';
import { GetAccountInfo } from '@/libraries/actions/fetch.action';

/* TYPES */
import type { GenshinPlayerData } from '@/types/index';

interface TModalRoast {
  isOpen: boolean;
  title: string;
  content: string;
  status: 'success' | 'failed' | null;
}

export default function RootPage() {
  const [isCopyClipboard, setIsCopyClipboard] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isAILoading, setIsAILoading] = React.useState(false);
  const [openPolicy, setOpenPolicy] = React.useState(false);
  const [playeInfo, setPlayerInfo] = React.useState<GenshinPlayerData>();
  const [modalRoast, setModalRoast] = React.useState<TModalRoast>({
    isOpen: false,
    title: '',
    content: '',
    status: null,
  });

  const callLlm = async (passing: GenshinPlayerData) => {
    const { player } = passing;
    const username = player.username;
    const prfilePicture = player.profilePicture.name;
    const characterCount = player.showcase.length;
    const customeCount = player.showcase.filter(
      ({ costumeId }) => costumeId,
    ).length;
    try {
      const prompt = `
        Roasting pemain genshin impact ini menggunakan bahasa gaul, username pemain yaitu ${username}, gambar profil pemain menggunakan ${prfilePicture}, untuk level pemain yaitu ${player?.levels?.rank}. Informasi tambahan yaitu pemain sudah di abyss lantai ${player?.abyss?.floor || 'belum ada'} dan chamber ${player?.abyss?.chamber || 'belum ada'}, jumlah karakter yang dipamerkan berjumlah ${characterCount} dan jumlah kostum karakter berjumlah ${customeCount}  (jawaban format ke style string, boleh kasih emote dan gunakan bahasa indonesia)
      `;
      const data = await GenerateText(prompt);
      return data.data as string;
    } catch (error) {
      console.error(error);
      return '';
    }
  };

  const generateAIText = async () => {
    setIsAILoading(true);
    const data = playeInfo;
    if (!data) {
      setModalRoast({
        isOpen: true,
        title: 'UID tidak ditemukan!',
        content: 'Coba pake UID yang lain ngab ...',
        status: 'failed',
      });
      setIsAILoading(false);
      return;
    }
    const message = (await callLlm(data)) as string;
    const title = playeInfo.player.username;
    if (!message) {
      setModalRoast({
        isOpen: true,
        title: 'API AI lagi penuh request!',
        content:
          'Tunggu 5 menit lagi ya ngab, soalnya API AI nya pake yg gratisan...',
        status: 'failed',
      });
      setIsAILoading(false);
      return;
    }
    setModalRoast({
      isOpen: true,
      title,
      content: message,
      status: 'success',
    });
    setIsAILoading(false);
  };

  // Component Function
  const submitData = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);
    // Get value from text input
    const target = event.target as typeof event.target & {
      uid: { value: number };
    };
    const uid = target.uid.value;

    // use data from session storage if the uid data is available
    const data = getSessionData(uid.toString());
    if (data) {
      const { title, content } = GenerateRoastText(data);
      setModalRoast({
        isOpen: true,
        title,
        content,
        status: 'success',
      });
      setIsLoading(false);
      setPlayerInfo(data);
      return;
    }

    // Send payload data to server component and get responses back
    const Response = await GetAccountInfo(uid);
    if (Response.code === 200 && Response.data) {
      const data = Response.data as GenshinPlayerData;
      const { title, content } = GenerateRoastText(data);
      setSessionData(uid.toString(), data);
      setModalRoast({
        isOpen: true,
        title,
        content,
        status: 'success',
      });
      setPlayerInfo(data);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      switch (Response.code) {
        case 400:
          setModalRoast({
            isOpen: true,
            title: 'UID tidak valid!',
            content:
              'UID yang lu masukin gak valid coy, coba cek lagi dah ... Blok',
            status: 'failed',
          });
          break;

        case 404:
          setModalRoast({
            isOpen: true,
            title: 'UID tidak ditemukan!',
            content: 'Coba pake UID yang lain ngab ...',
            status: 'failed',
          });
          break;

        default:
          setModalRoast({
            isOpen: true,
            title: 'Ada Masalah!',
            content: 'Kayaknya API bang Hoyoverse lagi rusak ...',
            status: 'failed',
          });
          break;
      }
    }
  };

  React.useEffect(() => {
    if (isCopyClipboard) {
      setTimeout(() => {
        setIsCopyClipboard(false);
      }, 3000);
    }
  }, [isCopyClipboard]);

  return (
    <React.Fragment>
      {/* BACKGROUND IMAGE */}
      <NextImage
        fill
        src="/background-image.jpg"
        alt="background image"
        className="-z-10 object-cover"
      />

      {/* MAIN CONTENT */}
      <div className="max-w-lg rounded-[10px] bg-black/75 p-5">
        <header className="mb-5 text-center">
          <h1 className="text-3xl leading-none text-color-secondary">
            Roasting Genshin Impact Player
          </h1>
        </header>
        <main>
          <form className="flex flex-col" onSubmit={submitData}>
            <NextLink
              href="https://genshin-impact.fandom.com/wiki/UID"
              target="_blank"
              className="utilities-link mb-2.5 text-right text-xs leading-none"
            >
              Apa itu UID?
            </NextLink>
            <input
              required
              type="number"
              name="uid"
              autoComplete="off"
              placeholder="Masukkan UID Kamu"
              className="utilities-input mb-5"
            />
            <button type="submit" className="utilities-button button-anim">
              Kirim
            </button>
          </form>
        </main>
        <footer className="mt-5 text-center text-xs leading-normal">
          <p>
            Artwork by&nbsp;
            <NextLink
              href="https://www.pixiv.net/en/artworks/111287235"
              target="_blank"
              className="utilities-link"
            >
              yuuchi_ir
            </NextLink>
            &nbsp;on Pixiv
          </p>
          <p>
            Build by&nbsp;
            <NextLink
              href="https://github.com/shirokuro-dev"
              target="_blank"
              className="utilities-link"
            >
              shirokuro-dev
            </NextLink>
            ,&nbsp;
            <NextLink
              href="https://github.com/Sam1Dz"
              target="_blank"
              className="utilities-link"
            >
              Sam1Dz
            </NextLink>
            ,&nbsp;
            <NextLink
              href="https://github.com/inudola"
              target="_blank"
              className="utilities-link"
            >
              inudola
            </NextLink>
            &nbsp;on Github&nbsp;
          </p>
          <p className="mt-5 text-[#CCCCCC]">
            &copy; 2024, Project ini&nbsp;
            <NextLink
              href="https://github.com/shirokuro-dev/roasting-genshin-impact-player"
              target="_blank"
              className="utilities-link"
            >
              open source
            </NextLink>
            &nbsp;dibawah&nbsp;
            <NextLink
              href="https://github.com/shirokuro-dev/roasting-genshin-impact-player/blob/main/LICENSE"
              target="_blank"
              className="utilities-link"
            >
              Lisensi ISC
            </NextLink>
          </p>
          <div className="flex justify-center">
            <p
              className="utilities-link mt-5 w-fit cursor-pointer text-base leading-none"
              onClick={() => setOpenPolicy(true)}
            >
              Kebijakan Privasi
            </p>
          </div>
        </footer>
      </div>

      {/* LOADING SCREEN */}
      <LoadingScreen loading={isLoading} />

      {/* MODAL SCREEN */}
      <Modal
        open={modalRoast.isOpen}
        onClose={() => {
          setModalRoast({
            isOpen: false,
            title: '',
            content: '',
            status: null,
          });
          setIsAILoading(false);
        }}
        title={isAILoading ? <Skeleton count={1} /> : modalRoast.title}
        message={isAILoading ? <Skeleton count={7} /> : modalRoast.content}
        footer={
          modalRoast.status === 'success' ? (
            <div className="block justify-between sm:flex">
              <button
                type="button"
                onClick={() => {
                  generateAIText();
                }}
                className={clsx(
                  isAILoading && '!cursor-not-allowed',
                  !isAILoading && '!cursor-pointer',
                  'secondary-button mb-2 flex items-center sm:mb-0',
                )}
              >
                <AIIcon />
                {isAILoading ? 'Generating...' : 'AI generates'}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (isCopyClipboard === false) {
                    navigator.clipboard.writeText(modalRoast.content);
                    setIsCopyClipboard(true);
                  }
                }}
                className={clsx(
                  isCopyClipboard && '!cursor-not-allowed',
                  !isCopyClipboard && '!cursor-pointer',
                  'utilities-button flex items-center',
                )}
              >
                <CopyIcon />
                {!isCopyClipboard ? 'Salin kalimat ini' : 'Berhasil disalin!'}
              </button>
            </div>
          ) : null
        }
      />

      {/* MODAL PRIVACY POLICY SCREEN */}
      <Modal
        open={openPolicy}
        onClose={() => setOpenPolicy(false)}
        title="Kebijakan Privasi"
        message={
          <React.Fragment>
            <p className="mb-4">
              Website Roasting Genshin Impact Player{' '}
              <span className="font-semibold">TIDAK MENYIMPAN</span> password,
              UID, username, email, temporary keys, ataupun data penting
              lainnya. Statistik pengunjung menggunakan&nbsp;
              <NextLink
                href="https://eu.umami.is/share/9UTkhbvMBHdyL0SI/roasting-genshin-impact-player.vercel.app"
                target="_blank"
                className="utilities-link"
              >
                Umami.is
              </NextLink>
              &nbsp;.
            </p>
            <p className="mb-4">
              Jika kamu seorang developer yang mengerti ReactJS ataupun paham
              dengan Web Development dan tertarik mengulik kodenya, kalian bisa
              cek proyek-nya di&nbsp;
              <NextLink
                href="https://github.com/shirokuro-dev/roasting-genshin-impact-player"
                target="_blank"
                className="utilities-link"
              >
                shirokuro-dev/roasting-genshin-impact-player
              </NextLink>
              &nbsp;di Github.
            </p>
            <p>
              Proyek ini bersifat open source dibawah&nbsp;
              <NextLink
                href="https://github.com/shirokuro-dev/roasting-genshin-impact-player/blob/main/LICENSE"
                target="_blank"
                className="utilities-link"
              >
                Lisensi ISC
              </NextLink>
            </p>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
}
