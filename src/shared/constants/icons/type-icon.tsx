import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function TypeIcon({
  size = "lg",
  color = "text-primary",
}: IconProps) {
  return (
<svg 
 className={`${ICON_SIZE_CLASS[size]} ${color}`}
 width="17"
 height="17"
 viewBox="0 0 17 17"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
>
<path d="M11.8496 6.60001H13.3496C14.8496 6.60001 15.5996 5.85001 15.5996 4.35001V2.85001C15.5996 1.35001 14.8496 0.600006 13.3496 0.600006H11.8496C10.3496 0.600006 9.59961 1.35001 9.59961 2.85001V4.35001C9.59961 5.85001 10.3496 6.60001 11.8496 6.60001Z" 
 stroke="currentColor"
 stroke-width="1.2"
 stroke-miterlimit="10"
 stroke-linecap="round"
 stroke-linejoin="round"
/>
<path d="M2.84961 15.6001H4.34961C5.84961 15.6001 6.59961 14.8501 6.59961 13.3501V11.8501C6.59961 10.3501 5.84961 9.60007 4.34961 9.60007H2.84961C1.34961 9.60007 0.599609 10.3501 0.599609 11.8501V13.3501C0.599609 14.8501 1.34961 15.6001 2.84961 15.6001Z"
 stroke="currentColor"
 stroke-linecap="round"
 stroke-linejoin="round"
 stroke-miterlimit="10"
 stroke-width="1.2"
/>
<path d="M3.59961 6.60001C5.25646 6.60001 6.59961 5.25686 6.59961 3.60001C6.59961 1.94315 5.25646 0.600006 3.59961 0.600006C1.94275 0.600006 0.599609 1.94315 0.599609 3.60001C0.599609 5.25686 1.94275 6.60001 3.59961 6.60001Z"
 stroke="currentColor"
 stroke-linecap="round"
 stroke-linejoin="round"
 stroke-miterlimit="10"
 stroke-width="1.2"
/>
<path d="M12.5996 15.6001C14.2564 15.6001 15.5996 14.2569 15.5996 12.6001C15.5996 10.9432 14.2564 9.60007 12.5996 9.60007C10.9428 9.60007 9.59961 10.9432 9.59961 12.6001C9.59961 14.2569 10.9428 15.6001 12.5996 15.6001Z"
 stroke="currentColor"
 stroke-linecap="round"
 stroke-linejoin="round"
 stroke-miterlimit="10"
 stroke-width="1.2"
/>
</svg>
  );
}