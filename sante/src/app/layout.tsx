import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import { Header } from "@/components/sante/header";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Santé - Contact list",
  description:
    "A simple contact list app built with tRPC and Next.js for santé test",
  icons: [{ rel: "icon", url: "/logo.webp" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <Header />
          {children}
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
