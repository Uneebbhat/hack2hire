import { Building2, CalendarDays, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ChallengeSnapshot() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Challenge Snapshot</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 rounded-xl border bg-muted/40 p-3">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Company</p>
              <p className="font-medium">TechCorp Solutions</p>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Problem</span>
              <span className="font-medium text-right">Microservices</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Difficulty</span>
              <Badge variant="secondary">Intermediate</Badge>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Deadline</span>
              <span className="font-medium">March 30, 2026</span>
            </div>
          </div>

          <div className="space-y-2 rounded-lg border p-3">
            <p className="font-medium">Before you submit</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                Add project links and resume URL.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                Explain your architecture decisions.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                Add all of your team members name.
              </li>
            </ul>
          </div>
        </CardContent>

        <CardFooter className="text-sm text-muted-foreground">
          <CalendarDays className="mr-2 h-4 w-4" />
          Review starts after the submission window closes.
        </CardFooter>
      </Card>
    </>
  );
}
