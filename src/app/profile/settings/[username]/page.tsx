import ProfileForm from "@/features/profile/components/profile-form";
import ProfileHeader from "@/features/profile/components/profile-header";
import ProfileFormSkeleton from "@/features/profile/components/skeleton/profile-form-skeleton";
import ProfileHeaderSkeleton from "@/features/profile/components/skeleton/profile-header-skeleton";
import { Suspense } from "react";

type ProfileSettingsPageProps = {
  params: Promise<{ username: string }>;
};

export default async function ProfileSettingsPage({
  params,
}: ProfileSettingsPageProps) {
  const { username } = await params;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <Suspense fallback={<ProfileHeaderSkeleton />}>
        <ProfileHeader
          title="Profile settings"
          description="Update your personal details, skills, and professional links."
        />
      </Suspense>

      <Suspense fallback={<ProfileFormSkeleton />}>
        <ProfileForm username={username} />
      </Suspense>
    </div>
  );
}
