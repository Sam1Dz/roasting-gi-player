import NextScript from 'next/script';
import localFont from 'next/font/local';

/* TYPES */
import type { Metadata } from 'next';
import type { PropsWithChildren } from '@/types';

import '../styles/globals.css';

const GIFontJP = localFont({
  src: '../styles/fonts/gi-font-jp.ttf',
  variable: '--font-genshin',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://roasting-genshin-player.shirokuro.dev'),
  title: 'Roasting Genshin Impact Player',
  description:
    'Sebuah website yang memberi komentar pedas ke pemain genshin impact berdasarkan UID pemain.',
  keywords: 'Genshin Impact, roasting, UID pemain geshin, pesan roasting',
  openGraph: {
    title: 'Roasting Genshin Impact Player',
    description:
      'Sebuah website yang memberi komentar pedas ke pemain genshin impact berdasarkan UID pemain.',
    images: '/thumbnail.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roasting Genshin Impact Player',
    description:
      'Sebuah website yang memberi komentar pedas ke pemain genshin impact berdasarkan UID pemain.',
    images: '/thumbnail.png',
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="id">
      {process.env.NODE_ENV === 'production' ? (
        <NextScript
          strategy="afterInteractive"
          data-website-id="9d50e1cc-c377-4fbb-b141-c677efdc6f63"
          src="https://cloud.umami.is/script.js"
        />
      ) : null}
      <body className={`${GIFontJP.variable} font-genshin`}>{children}</body>
    </html>
  );
}
