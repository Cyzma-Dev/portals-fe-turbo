import React, { ReactNode } from 'react'
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip'

interface TooltipTrigger {
    children: ReactNode
    tooltipContent: ReactNode
}
function CommonTooltip({ children, tooltipContent }: TooltipTrigger) {
    return (
        <div className='z-50'>
            <TooltipProvider >
                <Tooltip >
                    <TooltipTrigger asChild >
                        {children}
                    </TooltipTrigger>
                    <TooltipContent side={'bottom'} >
                        {tooltipContent}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}

export default CommonTooltip

