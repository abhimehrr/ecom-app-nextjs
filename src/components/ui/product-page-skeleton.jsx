import { Skeleton } from "@/components/ui/skeleton";

export const ProductPageSkeleton = () => {
  return (
    <div className="h-screen w-full fixed top-0 left-0 bg-secondary flex item-center justify-center">
      <div className="flex flex-col justify-center items-center space-y-3">
        <Skeleton className="h-[125px] w-[250px] md:h-[250px] md:w-[450px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 md:w-[400px] w-[250px]" />
          <Skeleton className="h-4 md:w-[350px] w-[200px]" />
          <Skeleton className="h-4 md:w-[400px] w-[200px]" />
          <Skeleton className="h-4 md:w-[300px] w-[150px]" />
        </div>
      </div>
    </div>
  );
};
