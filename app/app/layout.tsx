
import type { Metadata } from "next";
import "./globals.css";
import { Sessionprovider } from "@/providers/SessionProvider";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
import { Plus_Jakarta_Sans, Inter } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Sessionprovider>
      <body
        className={`${plusJakarta.variable} antialiased no-scrollbar`}
      >
        {children}
        <Toaster/>
      </body>
      </Sessionprovider>
    </html>
  );
}
