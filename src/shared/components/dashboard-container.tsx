import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function DashboardContainer({ children }: Props) {
  return (
    <div className={"flex w-full items-start justify-center"}>
      <div className={"w-[85%] pt-[1vw]"}>
        <div className={"gap-layout flex"}>{children}</div>
      </div>
    </div>
  );
}
