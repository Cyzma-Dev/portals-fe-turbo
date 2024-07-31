import clsx from "clsx"
import { ReactNode } from "react"
import { Button } from "../shadcn/ui"

interface IIconWrapperProps {
    children: ReactNode
    onClick?: () => void
    className?: string
    disable?: boolean
}

const IconWrapper = (props: IIconWrapperProps) => {

    return (
        <Button
            className={clsx(`flex justify-center items-center p-0 h-7 w-7 m-0 rounded-sm bg-transparent text-foreground ${props.className}`,
                {
                    'cursor-not-allowed hover:bg-transparent hover:dark:bg-transparent hover:text-slate-400': props.disable
                }
            )}
            disabled={props.disable}
            onClick={props.onClick}
        >
            {props.children}
        </Button>
    )
}

export default IconWrapper
