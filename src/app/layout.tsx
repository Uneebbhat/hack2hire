import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Hack2Hire | Solve Real Problems. Get Hired.",
    template: "%s | Hack2Hire",
  },

  description:
    "Hack2Hire is a unique hackathon platform where students solve real-world problems provided by companies and get internship opportunities. Join top developers, collaborate with industry mentors, and kickstart your tech career.",

  keywords: [
    "Hackathon Pakistan",
    "Student Hackathon UMT",
    "Hackathon with internships",
    "Coding competition Pakistan",
    "Tech internship platform",
    "Developers hiring platform",
    "Hackathon for students",
    "Programming competition",
    "UMT ACM Hackathon",
    "Software engineering internships",
  ],

  authors: [{ name: "ACM UMT Chapter" }],
  creator: "ACM UMT",
  publisher: "Hack2Hire",

  // metadataBase: new URL("https://hack2hire.com"), // change to your domain

  openGraph: {
    title: "Hack2Hire | Solve Real Problems. Get Hired.",
    description:
      "Participate in a next-generation hackathon where companies post real challenges and hire top talent. Build, compete, and get hired.",
    // url: "https://hack2hire.com",
    siteName: "Hack2Hire",
    images: [
      {
        url: "/og-image.png", // add this image in public folder
        width: 1200,
        height: 630,
        alt: "Hack2Hire Platform - Hackathon + Internship",
      },
    ],
    locale: "en_PK",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Hack2Hire | Solve Real Problems. Get Hired.",
    description:
      "A hackathon where companies post real problems and hire developers. Join now and launch your tech career.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
      </body>
    </html>
  );
}
