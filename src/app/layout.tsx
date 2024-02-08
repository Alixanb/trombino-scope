import "./globals.css";
import type { Metadata } from "next";
// import localFont from '@next/font'
import { satoshi, ibm_plex_mono, clash_display } from "../fonts";

export const metadata: Metadata = {
  title: "Trombino scope",
  description:
    "Trombino scope est un outil mis à disposition pour tous les étudiants de l'université de haguenau afin de faciliter la création et la gestion des trombinoscope",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`${ibm_plex_mono.className} bg-white uppercase min-h-screen lg:h-screen flex flex-col gap-8 justify-between relative overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
