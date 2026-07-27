import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function ProfileMain({ children }: Props) {
  return <div className={"gap-layout flex w-full xl:w-[75%] flex-col"}>{children}</div>;
}
