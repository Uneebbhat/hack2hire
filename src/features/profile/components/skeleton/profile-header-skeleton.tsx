import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileHeaderSkeleton() {
  return (
    <section className="space-y-3">
      <Skeleton className="h-9 w-48 max-w-full" />
      <Skeleton className="h-6 w-full max-w-xl" />
    </section>
  );
}
