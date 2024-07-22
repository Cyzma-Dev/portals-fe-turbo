import { Skeleton } from "@repo/ui/shadcn";

export function DocumentSkeleton() {
    return (
        <div className="flex-col align-start space-y-4 h-full">
            <div className='flex'>
                <h2 className="inline-block text-xl justify-self-start font-bold tracking-tight">Dashboard</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <Skeleton className="h-[125px] w-full rounded-xl" />
            </div>
        </div>
    )
}