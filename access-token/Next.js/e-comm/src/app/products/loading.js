import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const Loading = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      {/* Page Title */}
      <Skeleton className="mb-8 h-8 w-56" />

      {/* Products */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            {/* Image */}
            <div className="flex h-64 items-center justify-center bg-muted p-6">
              <Skeleton className="h-48 w-40 rounded-md" />
            </div>

            <CardContent className="space-y-4 p-5">
              {/* Category Badge */}
              <Skeleton className="h-6 w-24 rounded-full" />

              {/* Title */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>

              {/* Price + Rating */}
              <div className="flex items-center justify-between">
                <Skeleton className="h-7 w-20" />
                <Skeleton className="h-5 w-16" />
              </div>

              {/* Button */}
              <Skeleton className="h-10 w-full rounded-md" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Loading;