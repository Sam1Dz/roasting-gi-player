import localFont from 'next/font/local';

/* TYPES */
import type { Metadata } from 'next';
import Script from 'next/script';
import type { PropsWithChildren } from '@/types';

import '../styles/globals.css';
import { env } from 'process';

const GIFontJP = localFont({
  src: '../styles/fonts/gi-font-jp.ttf',
  variable: '--font-genshin',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://roasting-genshin-player.shirokuro.dev'),
  title: 'Roasting Genshin Impact Player',
  description: 'Sebuah website yang memberi komentar pedas ke pemain genshin impact berdasarkan UID pemain.',
  keywords: 'Genshin Impact, roasting, UID pemain geshin, pesan roasting',
  openGraph: {
    title: 'Roasting Genshin Impact Player',
    description: 'Sebuah website yang memberi komentar pedas ke pemain genshin impact berdasarkan UID pemain.',
    images: '/thumbnail.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roasting Genshin Impact Player',
    description: 'Sebuah website yang memberi komentar pedas ke pemain genshin impact berdasarkan UID pemain.',
    images: '/thumbnail.png',
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="id">
      <body className={`${GIFontJP.variable} font-genshin`}>
        {children}
        {
          env.NODE_ENV === 'production' ?
          <Script
            strategy="afterInteractive"
            data-website-id="9d50e1cc-c377-4fbb-b141-c677efdc6f63"
            src="https://cloud.umami.is/script.js"
          />
          :
          null
        }
      </body>
    </html>
  );
}
