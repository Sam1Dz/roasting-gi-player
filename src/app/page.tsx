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
import { GenerateRoastText } from '@/libraries/generateRoastText';

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

  // Component Function
  const submitData = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    setIsLoading(true);

    // Get value from text input
    const target = event.target as typeof event.target & {
      uid: { value: number };
    };
    const uid = target.uid.value;

    // Send payload data to server component and get responses back
    const Response = await GetAccountInfo(uid);
    if (Response.code === 200 && Response.data) {
      const roastText = GenerateRoastText(Response.data);

      setModalRoast({
        isOpen: true,
        title: roastText.title,
        content: roastText.content,
        status: 'success',
      });
    } else {
      switch (Response.code) {
        case 400:
          setModalRoast({
            isOpen: true,
            title: 'UID tidak valid!',
            content: 'UID yang lu masukin gak valid coy, coba cek lagi dah ...',
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

    setIsLoading(false);
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
            <p className="mb-2">
              Website Roasting Genshin Impact Player TIDAK MENYIMPAN password,
              UID, username, email, temporary keys, ataupun data penting lainya.
            </p>
            <p className="mb-2">
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
