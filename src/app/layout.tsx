import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DeVoraX",
  description: "Learn DSA, ML, and Core Subjects all in one place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.variable} bg-[#0A0A0A] text-gray-100 antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
