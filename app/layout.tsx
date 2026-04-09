import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "HopePulse — Cancer Support & Information",
  description:
    "Compassionate AI-powered cancer support for patients and families. Understand diagnoses, treatments, and outcomes — clearly, calmly, and with hope.",
  keywords: ["cancer support", "oncology", "cancer information", "pediatric cancer", "cancer stages"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-gradient-to-br from-hope-50 via-white to-pulse-50 font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
