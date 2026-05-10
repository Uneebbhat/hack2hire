import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PROFILE_DEMO } from "@/features/profile/constants/profile-demo-data";
import { Mail, MapPin, GraduationCap } from "lucide-react";
import Link from "next/link";

type ProfileSidebarProps = {
  username: string;
};

export default function ProfileSidebar({ username }: ProfileSidebarProps) {
  const settingsHref = `/profile/settings/${username}`;

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="flex flex-col items-center pt-6 text-center">
          <Avatar className="h-24 w-24">
            <AvatarImage src={PROFILE_DEMO.avatarSrc} alt="User profile" />
            <AvatarFallback>{PROFILE_DEMO.avatarFallback}</AvatarFallback>
          </Avatar>

          <h2 className="mt-4 text-xl font-semibold">{PROFILE_DEMO.displayName}</h2>
          <p className="text-sm text-muted-foreground">{PROFILE_DEMO.roleTitle}</p>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {PROFILE_DEMO.headlineSkills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>

          <Button className="mt-6 w-full" asChild>
            <Link href={settingsHref}>Edit profile</Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Profile Summary</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 text-sm">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="break-all">{PROFILE_DEMO.email}</span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span>{PROFILE_DEMO.location}</span>
          </div>

          <div className="flex items-center gap-3">
            <GraduationCap className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span>{PROFILE_DEMO.university}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
