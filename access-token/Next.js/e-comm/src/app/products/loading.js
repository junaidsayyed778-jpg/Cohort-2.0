import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      {/* Page Heading */}
      <Skeleton className="h-8 w-56 mb-8" />

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 bg-white shadow-sm"
          >
            {/* Product Image */}
            <Skeleton className="h-52 w-full rounded-lg" />

            {/* Title */}
            <Skeleton className="h-5 w-3/4 mt-4" />

            {/* Category */}
            <Skeleton className="h-4 w-1/2 mt-2" />

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-10" />
            </div>

            {/* Price */}
            <Skeleton className="h-6 w-20 mt-4" />

            {/* Button */}
            <Skeleton className="h-10 w-full mt-5 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;