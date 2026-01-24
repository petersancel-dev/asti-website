import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoreProvider from "./StoreProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Advanced Solutions Technical Institute | ASTI",
  description: "Teaching Tomorrow's Technology...Today. Internationally accredited programmes in Telecommunications, UAV Operations, Engineering, and more. Located in San Juan, Trinidad.",
  keywords: ["ASTI", "Technical Institute", "Trinidad", "Education", "Telecommunications", "UAV", "Engineering", "Accredited"],
  openGraph: {
    title: "Advanced Solutions Technical Institute",
    description: "Through Education and Innovation - Internationally accredited technical programmes",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${oswald.variable} antialiased`}>
        <StoreProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}

