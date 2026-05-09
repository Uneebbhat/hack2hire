import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function ProblemDetailsSkeleton() {
  return (
    <>
      <Card>
        <CardHeader className="space-y-5">
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-32 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
          <div>
            <Skeleton className="h-10 w-72 md:w-96 rounded" />
            <div className="mt-4 flex flex-wrap gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <section>
            <div className="mb-3 flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-6 w-32 rounded" />
            </div>
            <Skeleton className="h-5 w-full max-w-2xl" />
          </section>
          <section>
            <div className="mb-3 flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-6 w-32 rounded" />
            </div>
            <ul className="grid gap-3 md:grid-cols-2">
              <li className="flex items-start gap-2">
                <Skeleton className="h-4 w-4 mt-0.5 shrink-0 rounded-full" />
                <Skeleton className="h-5 w-44 rounded" />
              </li>
              <li className="flex items-start gap-2">
                <Skeleton className="h-4 w-4 mt-0.5 shrink-0 rounded-full" />
                <Skeleton className="h-5 w-44 rounded" />
              </li>
              <li className="flex items-start gap-2">
                <Skeleton className="h-4 w-4 mt-0.5 shrink-0 rounded-full" />
                <Skeleton className="h-5 w-44 rounded" />
              </li>
            </ul>
          </section>
        </CardContent>
        <CardFooter className="border-t">
          <div className="flex items-center gap-2 text-sm">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-5 w-48 rounded" />
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
