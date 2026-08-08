import { Blogger } from "../../_types/blogger.types";

export interface BloggerCardProps {
  blogger: Blogger;
  /** When true, flips the card so the frame sits on the right and the text on the left. */
  reversed?: boolean;
}