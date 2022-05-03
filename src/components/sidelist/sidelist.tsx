import {Fragment} from "react";
import React from "react";
import {SideListContainer, SideListChildren} from "./sidelist.component";
type Props = {
  onClick?: (e: string) => void;
  children: React.ReactNode;
  isActive: string;
  className?: string;
};

export default function SideMenuList({ isActive, children, className }: Props) {
  // console.log(children);
  function handleSubmit(e: string) {
    // console.log(e);
  }
  // console.log(isActive);
  return (
    <Fragment>
      <SideListContainer
        onClick={() => handleSubmit(isActive)}
        className={className}
      >
        <SideListChildren>{children}</SideListChildren>
      </SideListContainer>
    </Fragment>
  );
}
