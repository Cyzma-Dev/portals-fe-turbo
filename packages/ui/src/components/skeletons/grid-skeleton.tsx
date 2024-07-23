import { Skeleton } from "@repo/ui/shadcn";
import clsx from "clsx";
interface IGridSkeleton {
    title: string;
    width?: string;
    height?: string;
}
export function DocumentSkeleton(
    {
        title,
        width = "full",
        height = "full"
    }: IGridSkeleton) {
    return (
        <div className={clsx('flex flex-col gap-4', `w-${width}`, `h-${height}`)}>
            <div className='flex gap-4 justify-content items-center text-xl font-bold'>
                {title}
                <Skeleton className="h-6 w-6 rounded-sm" />
            </div>
            <Skeleton className="h-[600px] w-full rounded-sm" />
            <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-48 rounded-sm" />

                <div className="flex gap-4 items-center">
                    <Skeleton className="h-6 w-48 rounded-sm" />
                    <div className="flex gap-2">
                        <Skeleton className="h-8 w-8 rounded-sm" />
                        <Skeleton className="h-8 w-8 rounded-sm" />
                    </div>
                </div>
            </div>
        </div>
    )
}