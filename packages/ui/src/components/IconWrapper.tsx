import { ReactNode } from "react"

interface IIconWrapperProps {
    children: ReactNode
    onClick?: () => void
    className?: string
}

const IconWrapper = (props: IIconWrapperProps) => {

    return (
        <div className={`p-1 rounded-sm ${props.className}`} onClick={props.onClick}>
            {props.children}
        </div>
    )
}

export default IconWrapper
