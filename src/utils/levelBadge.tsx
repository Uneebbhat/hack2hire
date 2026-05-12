import { Badge } from "@/components/ui/badge";

function levelBadge(level: string) {
  switch (level) {
    case "easy":
      return (
        <Badge
          variant="outline"
          className="bg-green-100 text-green-800 border-green-300"
        >
          Easy
        </Badge>
      );
    case "intermediate":
      return (
        <Badge
          variant="outline"
          className="bg-yellow-100 text-yellow-800 border-yellow-300"
        >
          Intermediate
        </Badge>
      );
    case "expert":
      return (
        <Badge
          variant="outline"
          className="bg-red-100 text-red-800 border-red-300"
        >
          Expert
        </Badge>
      );
    default:
      return null;
  }
}

export default levelBadge;
