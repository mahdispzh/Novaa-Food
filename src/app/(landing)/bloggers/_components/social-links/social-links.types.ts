import { BloggerSocialLinks } from "../../_types/blogger.types";

export interface SocialLinksProps {
  links: BloggerSocialLinks;
  /** Tailwind text-color class for the icons. Defaults to "text-primary". */
  iconColor?: string;
}
