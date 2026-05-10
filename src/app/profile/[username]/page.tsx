import ProfileHeader from "@/features/profile/components/profile-header";
import ProfileSidebar from "@/features/profile/components/profile-sidebar";
import ProfileView from "@/features/profile/components/profile-view";
import ProfileHeaderSkeleton from "@/features/profile/components/skeleton/profile-header-skeleton";
import ProfileSidebarSkeleton from "@/features/profile/components/skeleton/profile-sidebar-skeleton";
import ProfileViewSkeleton from "@/features/profile/components/skeleton/profile-view-skeleton";
import { PROFILE_DEMO } from "@/features/profile/constants/profile-demo-data";
import { Suspense } from "react";

type ProfilePageProps = {
  params: Promise<{ username: string }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <Suspense fallback={<ProfileHeaderSkeleton />}>
        <ProfileHeader
          title={PROFILE_DEMO.displayName}
          description="View your public profile and how it appears to others."
        />
      </Suspense>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[340px_1fr]">
        <aside className="space-y-6">
          <Suspense fallback={<ProfileSidebarSkeleton />}>
            <ProfileSidebar username={username} />
          </Suspense>
        </aside>

        <main className="space-y-6">
          <Suspense fallback={<ProfileViewSkeleton />}>
            <ProfileView />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
