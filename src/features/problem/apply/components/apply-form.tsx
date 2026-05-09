"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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

const AVAILABLE_MEMBERS = [
  { id: "1", name: "Ali Raza", username: "aliraza" },
  { id: "2", name: "Ayesha Khan", username: "ayeshak" },
  { id: "3", name: "Hamza Tariq", username: "hamzat" },
  { id: "4", name: "Fatima Noor", username: "fatimanoor" },
  { id: "5", name: "Umar Javed", username: "umarj" },
  { id: "6", name: "Uneeb Bhatti", username: "uneeb" },
  { id: "7", name: "Sara Ahmed", username: "sarahmed" },
] as const;

export default function ApplyForm() {
  const [memberQuery, setMemberQuery] = useState("");
  const [teamMembers, setTeamMembers] = useState<
    Array<{ id: string; name: string; username: string }>
  >([]);

  const filteredMembers = useMemo(() => {
    const normalized = memberQuery.trim().toLowerCase().replace(/^@+/, "");

    if (!normalized) return [];

    return AVAILABLE_MEMBERS.filter((member) => {
      const alreadySelected = teamMembers.some((item) => item.id === member.id);
      if (alreadySelected) return false;

      const nameNormalized = member.name.toLowerCase();
      const nameNoSpaces = nameNormalized.replace(/\s+/g, "");
      const initials = member.name
        .toLowerCase()
        .split(/\s+/)
        .map((part) => part[0] ?? "")
        .join("");

      return (
        nameNormalized.includes(normalized) ||
        nameNoSpaces.includes(normalized) ||
        member.username.toLowerCase().includes(normalized) ||
        initials.startsWith(normalized)
      );
    }).slice(0, 6);
  }, [memberQuery, teamMembers]);

  function addMember(member: { id: string; name: string; username: string }) {
    setTeamMembers((prev) => [...prev, member]);
    setMemberQuery("");
  }

  function removeMember(memberId: string) {
    setTeamMembers((prev) => prev.filter((member) => member.id !== memberId));
  }

  return (
    <>
      <Card>
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Submit Your Application</CardTitle>
          <p className="text-muted-foreground">
            Share your relevant skills and approach for this challenge.
          </p>
        </CardHeader>

        <CardContent>
          <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input id="fullName" name="fullName" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" name="email" type="email" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="github">GitHub profile</Label>
              <Input
                id="github"
                name="github"
                type="url"
                placeholder="https://github.com/username"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio or LinkedIn</Label>
              <Input
                id="portfolio"
                name="portfolio"
                type="url"
                placeholder="https://"
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="resumeUrl">Resume URL</Label>
              <Input
                id="resumeUrl"
                name="resumeUrl"
                type="url"
                placeholder="Drive, Notion, or personal link"
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Experience level</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your current level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner (0-1 year)</SelectItem>
                  <SelectItem value="intermediate">
                    Intermediate (1-3 years)
                  </SelectItem>
                  <SelectItem value="advanced">Advanced (3+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="approach">
                How will you approach this problem?
              </Label>
              <Textarea
                id="approach"
                name="approach"
                className="min-h-36"
                placeholder="Describe your architecture, tradeoffs, and timeline."
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="memberSearch">
                Add team members (search by name or username)
              </Label>
              <Input
                id="memberSearch"
                value={memberQuery}
                onChange={(event) => setMemberQuery(event.target.value)}
                placeholder="Type a name or @username"
              />

              {!!filteredMembers.length && (
                <div className="rounded-lg border p-2">
                  <ul className="space-y-1">
                    {filteredMembers.map((member) => (
                      <li key={member.id}>
                        <button
                          type="button"
                          onClick={() => addMember(member)}
                          className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left hover:bg-muted"
                        >
                          <span className="font-medium">{member.name}</span>
                          <span className="text-sm text-muted-foreground">
                            @{member.username}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {!!teamMembers.length && (
                <div className="flex flex-wrap gap-2">
                  {teamMembers.map((member) => (
                    <Badge
                      key={member.id}
                      variant="secondary"
                      className="gap-2 pr-1"
                    >
                      {member.name} (@{member.username})
                      <button
                        type="button"
                        onClick={() => removeMember(member.id)}
                        className="rounded px-1 text-xs hover:bg-background/70"
                        aria-label={`Remove ${member.name}`}
                      >
                        x
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="md:col-span-2 flex items-start gap-2 rounded-lg border p-3">
              <Checkbox id="terms" name="terms" />
              <Label htmlFor="terms" className="leading-6 text-sm">
                I confirm this submission is my own work and I agree to the
                hackathon review process.
              </Label>
            </div>

            <div className="md:col-span-2 flex justify-end">
              <Button type="button">Submit Application</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
