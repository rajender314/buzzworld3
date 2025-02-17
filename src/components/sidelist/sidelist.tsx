import { ReactNode } from "react";
import { SideListContainer, SideListChildren } from "./sidelist.component";

type Props = {
  children: ReactNode;
  isActive: string;
  className: string;
};

export default function SideMenuList({ isActive, children, className }: Props) {
  // console.log(children);
  function handleSubmit(e: string) {
    console.log(e);
  }
  // console.log(isActive);
  return (
    <SideListContainer
      onClick={() => handleSubmit(isActive)}
      className={className}
    >
      <SideListChildren>{children}</SideListChildren>
    </SideListContainer>
  );
}
