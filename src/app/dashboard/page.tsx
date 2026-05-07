import JobCard from "@/components/common/job-card";
import JobCardSkeleton from "@/components/common/skeleton/job-card-skeleon";
import getCurrentUser from "@/helper/getCurrentUser";
import { Suspense } from "react";

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
          <Suspense fallback={<JobCardSkeleton />}>
            <JobCard />
          </Suspense>
        </div>
      </section>
    </>
  );
}
