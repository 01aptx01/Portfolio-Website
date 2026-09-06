import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionObserver from "@/components/MotionObserver";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Teeranan Pakdeekhan (Dew) — Full-Stack Software Engineer & Systems Architect",
  description: "Personal developer portfolio showcasing high-throughput systems, resilient cloud microservices, and ethereal user interfaces crafted with precision.",
  keywords: ["Software Engineer", "Full-Stack Developer", "Next.js", "TypeScript", "Distributed Systems", "Backend Engineer", "Teeranan Pakdeekhan"],
  authors: [{ name: "Teeranan Pakdeekhan" }],
  openGraph: {
    title: "Teeranan Pakdeekhan (Dew) — Full-Stack Software Engineer",
    description: "End-to-end software engineering, distributed systems, and frontend craft.",
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
    <html lang="en" className={plusJakarta.variable}>
      <body>
        <MotionObserver />
        <a href="#main-content" className="skipToContent">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
