import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSidebarSkeleton() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="flex flex-col items-center pt-6 text-center">
          <Skeleton className="size-24 rounded-full" />
          <Skeleton className="mt-4 h-7 w-40" />
          <Skeleton className="mt-2 h-4 w-32" />
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Skeleton className="h-6 w-14 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-36" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </CardContent>
      </Card>
    </div>
  );
}
