import { Skeleton } from "@/components/ui/skeleton";

export default function CategoriesSkeleton({ count = 6 }: { count?: number }) {
  return (
    <section className="container mx-auto px-4 py-8" aria-busy="true">
      <Skeleton className="mb-6 h-7 w-48" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-3 rounded-xl border p-4"
          >
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    </section>
  );
}