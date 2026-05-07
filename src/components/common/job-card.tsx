import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CalendarDays, Clock3, VerifiedIcon } from "lucide-react";
import { Badge } from "../ui/badge";

export default function JobCard() {
  return (
    <>
      <Card>
        <CardContent>
          <div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={"outline"}>TECHCORP SOLUTIONS</Badge>

                <Badge variant={"outline"}>3 Spots</Badge>
              </div>

              <div>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight">
                  Scalable Microservices Orchestration
                </h2>
                <Badge>
                  <VerifiedIcon />
                  Applied
                </Badge>
              </div>

              <p className="mt-4 max-w-4xl text-muted-foreground">
                Design a system that can handle dynamic scaling of microservices
                across multiple cloud regions while maintaining lower latency.
              </p>

              {/* Tags */}
              <div className="mt-5 flex flex-wrap gap-2">
                <Badge variant={"secondary"}>Cloud</Badge>

                <Badge variant={"secondary"}>Infrastructure</Badge>

                <Badge variant={"secondary"}>Go</Badge>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 border-t px-6 py-4 md:flex-row items-start md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock3 className="h-4 w-4" />
              Ends in 5 days
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Summer 2024
            </div>
          </div>

          <Button className="rounded-full w-full md:w-fit">View Details</Button>
        </CardFooter>
      </Card>
    </>
  );
}
