import React from 'react'
import { clsx } from "clsx";
import { Icons } from './icons';
import CommonTooltip from './commonTooltip';
interface INotesTooltipViewerProps {
    header: string
    Content: string
    statusValue: string
}

export function NotesTooltipViewer(props: INotesTooltipViewerProps) {
    return (
        <>
            <CommonTooltip
                tooltipContent={
                    <div className="border bg-secondary rounded-md p-3 text-sm w-64 ">
                        <h1 className="font-bold text-sm mb-3 text-foreground border">{props.header}</h1>
                        <span className='text-sm'>{props.Content} </span>
                    </div>
                }
            >
                <div className={
                    clsx("flex items-center justify-center gap-2 w-fit border rounded-full px-2 py-1",
                        {
                            'text-blue bg-blueBackground': props.statusValue === "Approved",
                            'text-orange bg-orangeBackground': props.statusValue === "Requested",
                            'text-red bg-redBackground': props.statusValue === "Rejected" || props.statusValue === "Cancelled",
                            'text-green bg-greenBackground': props.statusValue === "Done",
                            'text-purple bg-purpleBackground': props.statusValue === "Hold",

                        }
                    )}>
                    {
                        props.statusValue === "Approved"
                            ?
                            <Icons.check className="h-4 w-4" />  /*Approved*/
                            :
                            props.statusValue === "Requested"
                                ?
                                <Icons.sendHorizontal className="h-4 w-4" />   /*Requested*/
                                :
                                props.statusValue === "Rejected" || props.statusValue === "Cancelled"
                                    ?
                                    <Icons.circleX className="h-4 w-4" /> /*Rejected*/
                                    :
                                    props.statusValue === "Done"
                                        ?
                                        <Icons.circleCheckBig className="h-4 w-4" /> /*Done*/
                                        :
                                        props.statusValue === "Hold"
                                            ?
                                            <Icons.timer className="h-4 w-4" />   /* Hold*/
                                            :
                                            ""
                    }
                    {props.statusValue}
                </div>
            </CommonTooltip >
        </>
    )
}



