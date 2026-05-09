import ProblemCard from "@/components/common/problem-card";
import ProblemCardSkeleton from "@/components/common/skeleton/problem-card-skeleon";
import getCurrentUser from "@/helper/getCurrentUser";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Access your Hack2Hire dashboard to explore company-sponsored problem statements, manage hackathon submissions, track internship opportunities, and collaborate with industry mentors.",

  keywords: [
    "Hack2Hire dashboard",
    "Hackathon dashboard",
    "Internship tracking platform",
    "Coding challenge dashboard",
    "Developer internship portal",
    "Student developer platform",
    "Hackathon problem statements",
    "Software engineering internships",
    "Tech internships Pakistan",
    "UMT ACM Hackathon",
    "Developer community platform",
  ],

  openGraph: {
    title: "Hack2Hire Dashboard",
    description:
      "Explore real-world company challenges, track applications, and participate in a next-generation hackathon experience.",
    url: "https://hack2hire.com/dashboard",
    siteName: "Hack2Hire",
    images: [
      {
        url: "/og-dashboard.png",
        width: 1200,
        height: 630,
        alt: "Hack2Hire Dashboard",
      },
    ],
    locale: "en_PK",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Hack2Hire Dashboard",
    description:
      "Track internship opportunities, solve company problem statements, and grow your developer career.",
    images: ["/og-dashboard.png"],
  },

  robots: {
    index: false,
    follow: false,
  },

  alternates: {
    canonical: "https://hack2hire.com/dashboard",
  },

  category: "technology",
};

export default async function DashboardPage() {
  const { name } = await getCurrentUser();
  return (
    <>
      <section>
        <h1 className="text-3xl font-bold tracking-tight">Welcome, {name}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Explore problem statements and track your internship applications.
        </p>
      </section>

      <section>
        <div className="space-y-4">
          <Suspense fallback={<ProblemCardSkeleton />}>
            <ProblemCard />
          </Suspense>
        </div>
      </section>
    </>
  );
}
