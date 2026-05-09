import ProblemDetails from "@/features/problem/components/problem-details";
import ProblemDetailsAside from "@/features/problem/components/problem-details-aside";
import ProblemDetailsAsideSkeleton from "@/features/problem/components/skeleton/problem-details-aside-skeleton";
import ProblemDetailsSkeleton from "@/features/problem/components/skeleton/problem-details-skeleton";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Problem Details",

  description:
    "View detailed hackathon problem statements, company requirements, required skills, submission deadlines, internship positions, and application status on Hack2Hire.",

  keywords: [
    "Hack2Hire problem details",
    "Hackathon problem statement",
    "Company coding challenge",
    "Internship challenge",
    "Developer problem statement",
    "Student hackathon project",
    "Technical challenge",
    "Software engineering internship",
    "Company sponsored hackathon",
    "UMT ACM Hackathon",
  ],

  openGraph: {
    title: "Problem Details | Hack2Hire",
    description:
      "Explore real-world company problem statements, review requirements, and apply for internship-focused hackathon opportunities.",
    url: "https://hack2hire.com/problem/1",
    siteName: "Hack2Hire",
    images: [
      {
        url: "/og-problem-details.png",
        width: 1200,
        height: 630,
        alt: "Hack2Hire Problem Details Page",
      },
    ],
    locale: "en_PK",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Problem Details | Hack2Hire",
    description:
      "Review company challenges, required skills, deadlines, and internship positions on Hack2Hire.",
    images: ["/og-problem-details.png"],
  },

  robots: {
    index: false,
    follow: false,
  },

  alternates: {
    canonical: "https://hack2hire.com/problem/1",
  },

  category: "technology",
};

export default function ProblemDetailsPage() {
  return (
    <>
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
        {/* Left Content */}
        <main className="min-w-0">
          <Suspense fallback={<ProblemDetailsSkeleton />}>
            <ProblemDetails />
          </Suspense>
        </main>

        {/* Sticky Right Card */}
        <aside className="lg:sticky lg:top-6 lg:h-fit">
          <Suspense fallback={<ProblemDetailsAsideSkeleton />}>
            <ProblemDetailsAside />
          </Suspense>
        </aside>
      </div>
    </>
  );
}
