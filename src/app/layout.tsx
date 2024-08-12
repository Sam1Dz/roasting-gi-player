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
  title: 'Roasting Genshin Impact Player',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="id">
      <body className={`${GIFontJP.variable} font-genshin`}>{children}</body>
    </html>
  );
}
