import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ApplyFormSkeleton() {
  return (
    <Card>
      <CardHeader className="space-y-2">
        <Skeleton className="h-7 w-52 rounded" />
        <Skeleton className="h-4 w-72 rounded" />
      </CardHeader>
      <CardContent>
        <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Skeleton className="h-4 w-44" />
            <Skeleton className="h-24 w-full rounded" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Skeleton className="h-4 w-56" />
            <Skeleton className="h-10 w-full" />
            <div className="flex flex-wrap gap-2 pt-1">
              {Array.from({ length: 2 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-32 rounded-full" />
              ))}
            </div>
          </div>
          <div className="md:col-span-2 flex items-start gap-2 rounded-lg border p-3">
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className="h-4 w-80" />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <Skeleton className="h-10 w-40 rounded" />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
