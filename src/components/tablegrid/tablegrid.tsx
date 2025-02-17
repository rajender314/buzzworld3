import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function TableGrid({ children }: Props) {
  return <div style={{ height: "100%" }}>{children}</div>;
}
