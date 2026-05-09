import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle2,
  Briefcase,
  Users,
  CalendarDays,
  Building2,
  VerifiedIcon,
} from "lucide-react";
import Link from "next/link";

// TODO: disable the button if the project is already been applied

export default function ProblemDetailsPage() {
  return (
    <>
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
        {/* Left Content */}
        <main className="min-w-0">
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
                  Design a system that can handle dynamic scaling of
                  microservices across multiple cloud regions while maintaining
                  lower latency.
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
        </main>

        {/* Sticky Right Card */}
        <aside className="lg:sticky lg:top-6 lg:h-fit">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Application Info</CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="flex items-center gap-3 rounded-xl border bg-muted/40 p-3">
                <Building2 className="h-5 w-5 text-muted-foreground" />

                <div>
                  <p className="text-sm text-muted-foreground">Company</p>
                  <p className="font-medium">TechCorp Solutions</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">Positions</span>
                  <span className="font-medium">3 Positions</span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">Status</span>
                  <Badge>
                    <VerifiedIcon />
                    Applied
                  </Badge>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">Deadline</span>
                  <span className="font-medium">March 30, 2024</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              <Button className="w-full">
                <Link href={"/problem/apply/1"}>Apply Now</Link>
              </Button>
            </CardFooter>
          </Card>
        </aside>
      </div>
    </>
  );
}
