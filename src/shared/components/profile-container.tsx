import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function ProfileContainer({ children }: Props) {
  return (
    <div className={"flex w-full items-center justify-center"}>
      <div className={"w-[95%] pt-[1vw]"}>
        <div className={"gap-layout flex"}>{children}</div>
      </div>
    </div>
  );
}
