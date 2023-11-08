"use client";

import { useEffect, useState } from "react";
import { Card, Skeleton } from "@nextui-org/react";

export default function LoadedSkeletonCard () {

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 1000);
    }, []);

    return (
      <Card className="w-full p-4 flex gap-4" radius="lg">
        <div className="w-full">
          <Skeleton isLoaded={isLoaded} className="rounded-lg">
            <div className="h-28 w-full rounded-lg bg-primary"></div>
          </Skeleton>
        </div>

        <div className="space-y-3 w-full py-1">
          <Skeleton isLoaded={isLoaded} className="w-5/5 rounded-lg">
            <div className="h-3 w-full rounded-lg bg-primary-300"></div>
          </Skeleton>
          <Skeleton isLoaded={isLoaded} className="w-3/5 rounded-lg">
            <div className="h-3 w-full rounded-lg bg-primary-200"></div>
          </Skeleton>
          <Skeleton isLoaded={isLoaded} className="w-1/5 rounded-full">
            <div className="h-3 w-full rounded-lg bg-primary"></div>
          </Skeleton>
        </div>
      </Card>
    );
}