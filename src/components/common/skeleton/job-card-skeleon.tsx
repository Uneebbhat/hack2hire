import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function JobCardSkeleton() {
  return (
    <Card>
      <CardContent>
        <div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Skeleton className="rounded-full h-6 w-32" />
              <Skeleton className="rounded-full h-6 w-16" />
            </div>

            <Skeleton className="h-8 w-3/4 mt-4 mb-2 rounded-full" />

            <Skeleton className="h-5 w-full max-w-4xl mt-4 rounded-full" />

            <div className="mt-5 flex flex-wrap gap-2">
              <Skeleton className="rounded-full h-6 w-16" />
              <Skeleton className="rounded-full h-6 w-24" />
              <Skeleton className="rounded-full h-6 w-10" />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 border-t px-6 py-4 md:flex-row items-start md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-5 text-sm">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <Skeleton className="rounded-full h-10 w-full md:w-32" />
      </CardFooter>
    </Card>
  );
}
