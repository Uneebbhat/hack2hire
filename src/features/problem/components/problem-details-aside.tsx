import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2, VerifiedIcon } from "lucide-react";
import Link from "next/link";

export default function ProblemDetailsAside() {
  return (
    <>
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
          <Button className="w-full" asChild>
            <Link href={"/problem/apply/1"}>Apply Now</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
