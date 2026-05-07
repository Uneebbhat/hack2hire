import JobCard from "@/components/common/job-card";
import JobCardSkeleton from "@/components/common/skeleton/job-card-skeleon";
import { Suspense } from "react";

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
          <Suspense fallback={<JobCardSkeleton />}>
            <JobCard />
          </Suspense>
        </div>
      </section>
    </>
  );
}
