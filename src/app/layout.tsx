import type { Metadata } from 'next';
import { Cormorant_Garamond, Geist } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Brielle Daenerys turns one — October 9, 2026',
  description: 'Her first year, and an invitation to stand as ninong or ninang.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#fff0f5] text-[#5c3a48] font-sans">
        {children}
      </body>
    </html>
  );
}
