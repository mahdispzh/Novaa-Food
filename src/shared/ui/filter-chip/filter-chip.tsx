import { cn } from "@/src/shared/lib/utils";
import { FilterChipProps } from "./filter-chip-types";
import { filterChipVariants } from "./filter-chip-variants";


export function FilterChip({
 children,
 icon,
}:FilterChipProps){

 return(
   <button
    className={cn(
      filterChipVariants()
    )}
   >

    {icon}

    <span>
      {children}
    </span>

   </button>
 )

}