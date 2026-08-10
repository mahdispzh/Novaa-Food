import { cn } from "@/src/shared/lib/utils";
import { TabProps } from "./tab-types";
import { tabVariants } from "./tab-variants";


export function Tab({
  label,
  active=false,
  onClick,
}:TabProps){

  return(
    <button
      onClick={onClick}
      className={cn(
        tabVariants({
          active,
        })
      )}
    >
      {label}
    </button>
  );
}