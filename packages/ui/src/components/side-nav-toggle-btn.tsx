import { ReactNode } from "react";

interface SideNavToggleBtnProps {
  toggleCollapse: () => void;
  collapsed: boolean;
  children: ReactNode;
  className: string;
}

export const SideNavToggleBtn = (props: SideNavToggleBtnProps) => {
  return (
    <div
        onClick={props.toggleCollapse}
        className={props.className}
    >
      {props.children}
    </div>
  )
}