import { Card, Skeleton } from "@nextui-org/react";

export default function LoadedSkeletonCard () {

    return (
      <Card className="w-full space-y-5 p-4" radius="lg">
        <Skeleton isLoaded className="rounded-lg">
          <div className="h-28 w-[50%] rounded-lg bg-primary"></div>
        </Skeleton>

        <div className="space-y-3">
          <Skeleton isLoaded className="w-3/5 rounded-lg">
            <div className="h-3 w-full rounded-lg bg-primary"></div>
          </Skeleton>
          <Skeleton isLoaded className="w-4/5 rounded-lg">
            <div className="h-3 w-full rounded-lg bg-primary-300"></div>
          </Skeleton>
          <Skeleton isLoaded className="w-2/5 rounded-lg">
            <div className="h-3 w-full rounded-lg bg-primary-200"></div>
          </Skeleton>
        </div>
      </Card>
    );
}