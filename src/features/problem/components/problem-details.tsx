import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  CheckCircle2,
  Briefcase,
  Users,
  CalendarDays,
} from "lucide-react";

export default function ProblemDetails() {
  return (
    <>
      <Card>
        <CardHeader className="space-y-5">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">TechCorp Solutions</Badge>
            <Badge variant="outline">Cloud</Badge>
            <Badge variant="outline">Infrastructure</Badge>
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Scalable Microservices Orchestration
            </h1>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="secondary">Go</Badge>
              <Badge variant="secondary">Kubernetes</Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          <section>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <Briefcase className="h-5 w-5 text-muted-foreground" />
              The Challenge
            </h2>

            <p className="max-w-3xl leading-7 text-muted-foreground">
              Design a system that can handle dynamic scaling of microservices
              across multiple cloud regions while maintaining lower latency.
            </p>
          </section>

          <section>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <Users className="h-5 w-5 text-muted-foreground" />
              Requirements
            </h2>

            <ul className="grid gap-3 md:grid-cols-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>Experience with Docker & Kubernetes</span>
              </li>

              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>Strong understanding of distributed systems</span>
              </li>

              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>Proficiency in Go or Rust</span>
              </li>
            </ul>
          </section>
        </CardContent>

        <CardFooter className="border-t">
          <div className="flex items-center gap-2 text-sm text-red-500">
            <CalendarDays className="h-4 w-4" />
            Submission closes March 30, 2026
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
