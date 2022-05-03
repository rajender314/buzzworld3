import {Fragment} from "react";
import React from "react";
type Props = {
  children: React.ReactNode;
};

export default function TableGrid({ children }: Props) {
  return (
    <Fragment>
      <div style={{ height: "100%" }}>{children}</div>
    </Fragment>
  );
}
