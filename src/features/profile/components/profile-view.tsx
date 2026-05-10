import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PROFILE_DEMO } from "@/features/profile/constants/profile-demo-data";
import { GraduationCap, Link2, User } from "lucide-react";

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="text-sm">{value}</p>
    </div>
  );
}

export default function ProfileView() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="size-5 text-muted-foreground" />
            Personal information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InfoRow label="Full name" value={PROFILE_DEMO.displayName} />
          <InfoRow label="Username" value={`@${PROFILE_DEMO.username}`} />
          <InfoRow label="Email" value={PROFILE_DEMO.email} />
          <InfoRow label="Location" value={PROFILE_DEMO.location} />
          <div className="space-y-1 md:col-span-2">
            <p className="text-xs font-medium text-muted-foreground">Bio</p>
            <p className="text-sm leading-relaxed">{PROFILE_DEMO.bio}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <GraduationCap className="size-5 text-muted-foreground" />
            Education & experience
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InfoRow label="University" value={PROFILE_DEMO.university} />
          <InfoRow label="Degree" value={PROFILE_DEMO.degree} />
          <InfoRow label="Semester" value={PROFILE_DEMO.semester} />
          <InfoRow
            label="Experience level"
            value={PROFILE_DEMO.experienceLevel}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Link2 className="size-5 text-muted-foreground" />
            Professional links
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">GitHub</p>
            <a
              href={PROFILE_DEMO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary underline-offset-4 hover:underline"
            >
              {PROFILE_DEMO.githubUrl}
            </a>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">
              LinkedIn
            </p>
            <a
              href={PROFILE_DEMO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary underline-offset-4 hover:underline"
            >
              {PROFILE_DEMO.linkedinUrl}
            </a>
          </div>
          <div className="space-y-1 md:col-span-2">
            <p className="text-xs font-medium text-muted-foreground">
              Portfolio
            </p>
            <a
              href={PROFILE_DEMO.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary underline-offset-4 hover:underline"
            >
              {PROFILE_DEMO.portfolioUrl}
            </a>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {PROFILE_DEMO.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
