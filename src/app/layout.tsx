import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Providers } from './providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';

const font = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const baseUrl = 'https://racquetsportsleague.com';
const title = 'Ashoka Racquet Sports League';
const description = "Ashoka's RPL";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: title,
  description,
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={font.className}>
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <Header />
          {/* <div className="max-w-[100ch] mx-auto"> */}
          {/* <main className="mx-16">{children}</main> */}
          {/* </div> */}
          {children}
        </Providers>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
