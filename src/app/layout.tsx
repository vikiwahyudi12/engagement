import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Untuk [Nama Perempuan] — Viki",
  description:
    "Sebuah pesan dari hati, untuk seseorang yang selalu ingin kujadikan tujuan pulang.",
  icons: {
    icon: "/favicon.ico",
    other: [
      { rel: "icon", url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "Untuk [Nama Perempuan]",
    description: "Sebuah pesan dari hati yang paling dalam.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${poppins.variable} h-full`}
    >
      <body className="grain-overlay min-h-full bg-[#0a0806] text-[#f5f0e8] antialiased">
        {children}
      </body>
    </html>
  );
}
