import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Providers } from "./providers";
import Header from "@/components/Header";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const baseUrl = "https://racquetsportsleague.com";
const title = "Ashoka Racket Sports League";
const description = "Ashoka's RPL";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: title,
    template: `%s – Dhruman Gupta`,
  },
  description,
  manifest: "/manifest.json",
  openGraph: {
    locale: "en_US",
    type: "website",
    siteName: "Dhruman Gupta",
    title: {
      default: title,
      template: `%s – Dhruman Gupta`,
    },
    description,
    url: baseUrl,
  },
  twitter: {
    site: "@dhrumangupta",
    title: {
      default: title,
      template: `%s – Dhruman Gupta`,
    },
    description,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <Header />
          {/* <div className="max-w-[100ch] mx-auto"> */}
          {/* <main className="mx-16">{children}</main> */}
          {/* </div> */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
