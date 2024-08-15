'use client';

import React from 'react';
import NextImage from 'next/image';
import NextLink from 'next/link';

import clsx from 'clsx/lite';

/* COMPONENTS */
import Modal from '@/components/modal';
import LoadingScreen from '@/components/loading-screen';

/* LIBRARIES */
import { GetAccountInfo } from '@/libraries/actions/fetch.action';

import { setSessionData, getSessionData } from '@/libraries/sessionStorage'

import { GenshinPlayerData } from '@/types/index'

interface TModalRoast {
  isOpen: boolean;
  title: string;
  content: string;
  status: 'success' | 'failed' | null;
}

export default function RootPage() {
  const [isCopyClipboard, setIsCopyClipboard] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [openPolicy, setOpenPolicy] = React.useState(false);
  const [modalRoast, setModalRoast] = React.useState<TModalRoast>({
    isOpen: false,
    title: '',
    content: '',
    status: null,
  });
  const callLlm = async (passing: GenshinPlayerData) => {
    const {player} = passing
    const username = player.username;
    const prfilePicture = player.profilePicture.name;
    const characterCount = player.showcase.length;
    const customeCount = player.showcase.filter(({costumeId}) => costumeId ).length;
    try {
      const response = await fetch('/api/llm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Roasting saya pake bahasa gaul, username ${username}, profile piturenya ${prfilePicture}, untuk karakter level ${player?.levels?.rank}. Game ghensin impact. Informasi tambahan abyss floor ${player?.abyss?.floor || 'belum ada'}, chamber ${player?.abyss?.chamber || 'belum ada'}, jumlah karakter yang diflexing ${characterCount} dan jumlah kostum karakter ${customeCount}  (jawaban format ke style string, boleh kasih emote)`,
                },
              ],
            },
          ],
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data as string;
      
    } catch (error) {
      console.error('Fetch error:', error);
      return '';
    }
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
    if(data) {
      setModalRoast({
        isOpen: true,
        title: data.username,
        content: data.message,
        status: 'success',
      });
      setIsLoading(false);
      return;
    }

    // Send payload data to server component and get responses back
    const Response = await GetAccountInfo(uid);
    if (Response.code === 200 && Response.data) {
      const data = Response.data;
      const message = await callLlm(data) as string;
      setSessionData(uid.toString(), {
        username: data.player.username,
        message: message
      })
      setModalRoast({
        isOpen: true,
        title: data.player.username,
        content: message,
        status: 'success',
      });
      setIsLoading(false);
    } else {
      setIsLoading(false);
      switch (Response.code) {
        case 400:
          setModalRoast({
            isOpen: true,
            title: 'UID tidak valid!',
            content: 'UID yang lu masukin gak valid coy, coba cek lagi dah ... Blok',
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
            &nbsp;, Enhanced by&nbsp;
            <NextLink
              href="https://github.com/Sam1Dz"
              target="_blank"
              className="utilities-link"
            >
              Sam1Dz
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
        onClose={() =>
          setModalRoast({
            isOpen: false,
            title: '',
            content: '',
            status: null,
          })
        }
        title={modalRoast.title}
        message={modalRoast.content}
        footer={
          modalRoast.status === 'success' ? (
            <div className="flex justify-end">
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
                  'utilities-button',
                )}
              >
                {!isCopyClipboard ? 'Salin kata-kata ini' : 'Berhasil disalin!'}
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
              Website Roasting Genshin Impact Player <span className='font-semibold'>TIDAK MENYIMPAN</span> password,
              UID, username, email, temporary keys, ataupun data penting lainnya. Statistik pengunjung menggunakan&nbsp;
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
