import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PROFILE_DEMO } from "@/features/profile/constants/profile-demo-data";
import Link from "next/link";

type ProfileFormProps = {
  username: string;
};

export default function ProfileForm({ username }: ProfileFormProps) {
  const profileHref = `/profile/${username}`;

  return (
    <form className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input
              id="fullName"
              placeholder="Jane Doe"
              defaultValue={PROFILE_DEMO.displayName}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="janedoe"
              defaultValue={PROFILE_DEMO.username}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              defaultValue={PROFILE_DEMO.email}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="City, Country"
              defaultValue={PROFILE_DEMO.location}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              placeholder="Full-stack developer"
              defaultValue={PROFILE_DEMO.roleTitle}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              className="min-h-28"
              placeholder="A short introduction about your background and interests."
              defaultValue={PROFILE_DEMO.bio}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Education & Experience</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="university">University</Label>
            <Input
              id="university"
              placeholder="e.g. University of Management and Technology"
              defaultValue={PROFILE_DEMO.university}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="degree">Degree</Label>
            <Input
              id="degree"
              placeholder="e.g. BSc Software Engineering"
              defaultValue={PROFILE_DEMO.degree}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="semester">Semester</Label>
            <Input
              id="semester"
              placeholder="e.g. 4th semester"
              defaultValue={PROFILE_DEMO.semester}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Experience level</Label>
            <Select defaultValue={PROFILE_DEMO.experienceValue}>
              <SelectTrigger id="experience" className="w-full">
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Professional Links</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Input
              id="github"
              placeholder="https://github.com/yourusername"
              defaultValue={PROFILE_DEMO.githubUrl}
            />
          </div>

          <div className="space-y-2">
            <Input
              id="linkedin"
              placeholder="https://linkedin.com/in/yourprofile"
              defaultValue={PROFILE_DEMO.linkedinUrl}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="portfolio">Portfolio</Label>
            <Input
              id="portfolio"
              placeholder="https://yourportfolio.com"
              defaultValue={PROFILE_DEMO.portfolioUrl}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {PROFILE_DEMO.skills.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Add skills</Label>
            <Input
              id="skills"
              placeholder="Type a skill and press Enter (e.g. Prisma, PostgreSQL)"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline" type="button" asChild>
          <Link href={profileHref}>Cancel</Link>
        </Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
