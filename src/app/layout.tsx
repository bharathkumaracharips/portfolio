import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bharath Kumar Achari P S | Blockchain & Protocol Engineer",
  description:
    "Protocol and infrastructure engineer specializing in distributed systems, L1/L2 networks, parallel EVM runtimes, RPC infrastructure, and performance optimization.",
  keywords: [
    "Blockchain Engineer",
    "Protocol Engineer",
    "L1 Consensus",
    "L2 Rollups",
    "Rust EVM",
    "Parallel EVM",
    "RPC Infrastructure",
    "Substreams Indexing",
    "Kubernetes DevOps",
  ],
  authors: [{ name: "Bharath Kumar Achari P S" }],
  openGraph: {
    title: "Bharath Kumar Achari P S | Blockchain & Protocol Engineer",
    description:
      "Engineering distributed systems from protocol to production — L1, L2, Infrastructure, and Performance Tuning.",
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased scroll-smooth`}
    >
      <body className="bg-[#050505] text-[#F5F5F2] font-sans selection:bg-[#61E7FF] selection:text-[#050505]">
        {children}
      </body>
    </html>
  );
}
