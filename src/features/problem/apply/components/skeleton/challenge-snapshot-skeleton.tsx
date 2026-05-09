import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function ChallengeSnapshotSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-44 rounded" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 rounded-xl border bg-muted/40 p-3">
          <Skeleton className="h-5 w-5 rounded" />
          <div>
            <Skeleton className="h-4 w-16 mb-1" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between gap-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex items-center justify-between gap-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-5 w-24 rounded-full" />
          </div>
          <div className="flex items-center justify-between gap-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
        <div className="space-y-2 rounded-lg border p-3">
          <Skeleton className="h-5 w-36 mb-1" />
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[1, 2, 3].map((_, i) => (
              <li key={i} className="flex items-start gap-2">
                <Skeleton className="mt-0.5 h-4 w-4 rounded" />
                <Skeleton className="h-4 w-52" />
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground flex items-center">
        <Skeleton className="mr-2 h-4 w-4 rounded" />
        <Skeleton className="h-4 w-72" />
      </CardFooter>
    </Card>
  );
}
