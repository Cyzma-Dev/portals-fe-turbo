import React, { ReactNode } from 'react'
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip'

interface TooltipTrigger {
    children: ReactNode
    tooltipContent: ReactNode
    showContent?: boolean
}
function CommonTooltip({ children, tooltipContent, showContent = true }: TooltipTrigger) {
    return (
        <div className='z-50'>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        {children}
                    </TooltipTrigger>
                    {
                        showContent &&
                        <TooltipContent side={'bottom'}>
                            {tooltipContent}
                        </TooltipContent>
                    }

                </Tooltip>
            </TooltipProvider>
        </div>
    )
}

export default CommonTooltip

