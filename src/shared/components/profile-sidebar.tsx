import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function ProfileSidebar({ children }: Props) {
  return <div className={"gap-layout w-[25%] hidden xl:flex flex-col"}>{children}</div>;
}
