import clsx from "clsx"
import { ReactNode } from "react"

interface IIconWrapperProps {
    children: ReactNode
    onClick?: () => void
    className?: string
    disable?: boolean
}

const IconWrapper = (props: IIconWrapperProps) => {

    return (
        <div
            className={clsx(`p-1 rounded-sm ${props.className}`,
                {
                    'text-slate-400 dark:text-zinc-200/40 cursor-not-allowed hover:bg-transparent hover:dark:bg-transparent hover:text-slate-400': props.disable
                }
            )}
            onClick={props.onClick}
        >
            {props.children}
        </div>
    )
}

export default IconWrapper
