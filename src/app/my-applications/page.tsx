import ProblemCard from "@/components/common/problem-card";
import ProblemCardSkeleton from "@/components/common/skeleton/problem-card-skeleon";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Applications",

  description:
    "View and manage your submitted hackathon applications, internship opportunities, project submissions, and application statuses on Hack2Hire.",

  keywords: [
    "Hack2Hire applications",
    "Hackathon applications",
    "Internship applications",
    "Student developer applications",
    "Submitted projects",
    "Hackathon submissions",
    "Application tracking",
    "Tech internship platform",
    "Developer opportunities",
    "Coding competition applications",
  ],

  openGraph: {
    title: "My Applications | Hack2Hire",
    description:
      "Track your submitted applications, monitor statuses, and manage your hackathon journey with Hack2Hire.",
    url: "https://hack2hire.com/dashboard/my-applications",
    siteName: "Hack2Hire",
    images: [
      {
        url: "/og-applications.png",
        width: 1200,
        height: 630,
        alt: "Hack2Hire Applications Dashboard",
      },
    ],
    locale: "en_PK",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "My Applications | Hack2Hire",
    description:
      "Monitor your hackathon applications and internship opportunities in one place.",
    images: ["/og-applications.png"],
  },

  robots: {
    index: false,
    follow: false,
  },

  alternates: {
    canonical: "https://hack2hire.com/dashboard/my-applications",
  },

  category: "technology",
};

export default function MyApplicationsPage() {
  return (
    <>
      <section>
        <h1 className="text-3xl font-bold tracking-tight">
          Your Submitted Applications
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Here you can view the hackathons you have applied for and check their
          current status.
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
