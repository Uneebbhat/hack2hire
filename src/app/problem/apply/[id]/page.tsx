import ApplyForm from "@/features/problem/apply/components/apply-form";
import ChallengeSnapshot from "@/features/problem/apply/components/challenge-snapshot";
import ApplyFormSkeleton from "@/features/problem/apply/components/skeleton/apply-form-skeleton";
import ChallengeSnapshotSkeleton from "@/features/problem/apply/components/skeleton/challenge-snapshot-skeleton";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Submit Application",

  description:
    "Submit your Hack2Hire application for a company-sponsored hackathon challenge. Add your skills, team members, resume, GitHub profile, portfolio, and project approach for internship review.",

  keywords: [
    "Hack2Hire application",
    "Submit hackathon application",
    "Apply for hackathon",
    "Internship application",
    "Company challenge application",
    "Student developer application",
    "Team hackathon submission",
    "Developer internship Pakistan",
    "UMT ACM Hackathon application",
    "Coding challenge application",
  ],

  openGraph: {
    title: "Submit Application | Hack2Hire",
    description:
      "Apply for real-world company challenges, submit your developer profile, add your team members, and get reviewed for internship opportunities.",
    url: "https://hack2hire.com/problem/apply/1",
    siteName: "Hack2Hire",
    images: [
      {
        url: "/og-apply.png",
        width: 1200,
        height: 630,
        alt: "Hack2Hire Application Submission Page",
      },
    ],
    locale: "en_PK",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Submit Application | Hack2Hire",
    description:
      "Submit your hackathon application, team members, portfolio, resume, and solution approach on Hack2Hire.",
    images: ["/og-apply.png"],
  },

  robots: {
    index: false,
    follow: false,
  },

  alternates: {
    canonical: "https://hack2hire.com/problem/apply/1",
  },

  category: "technology",
};

export default function ApplyPage() {
  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
      <main className="min-w-0 space-y-5">
        <Suspense fallback={<ApplyFormSkeleton />}>
          <ApplyForm />
        </Suspense>
      </main>

      <aside className="lg:sticky lg:top-6 lg:h-fit">
        <Suspense fallback={<ChallengeSnapshotSkeleton />}>
          <ChallengeSnapshot />
        </Suspense>
      </aside>
    </div>
  );
}
