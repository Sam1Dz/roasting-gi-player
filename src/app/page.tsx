'use client';

import React from 'react';
import NextImage from 'next/image';
import NextLink from 'next/link';

export default function RootPage() {
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
      <div className="max-w-lg rounded-[10px] bg-black/60 p-5">
        <header className="mb-5 text-center">
          <h1 className="text-3xl leading-none text-color-secondary">
            Roasting Genshin Impact Player
          </h1>
        </header>
        <main>
          <form className="flex flex-col">
            <input
              required
              type="text"
              name="uid"
              autoComplete="off"
              placeholder="Masukkan UID Kamu"
              className="utilities-input mb-5"
            />
            <button type="button" className="utilities-button button-anim">
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
              href="https://github.com/shirokuro-dev/shirokuro-dev"
              target="_blank"
              className="utilities-link"
            >
              open source
            </NextLink>
            &nbsp;dibawah&nbsp;
            <NextLink
              href="https://github.com/shirokuro-dev/shirokuro-dev/blob/main/LICENSE"
              target="_blank"
              className="utilities-link"
            >
              Lisensi ISC
            </NextLink>
          </p>
        </footer>
      </div>
    </React.Fragment>
  );
}
