import { ICONS } from "@/src/shared/constants/dynamic-icon";

import { SocialLinksProps } from "./social-links.types";

export default function SocialLinks({
  links,
  iconColor = "text-primary",
}: SocialLinksProps) {
  return (
    <div className="flex items-center gap-4">
      {links.instagram && (
        <a href={links.instagram} target="_blank" rel="noreferrer">
          <ICONS.instagramIcon size="lg" color={iconColor} />
        </a>
      )}
      {links.telegram && (
        <a href={links.telegram} target="_blank" rel="noreferrer">
          <ICONS.telegramIcon size="lg" color={iconColor} />
        </a>
      )}
      {links.whatsapp && (
        <a href={links.whatsapp} target="_blank" rel="noreferrer">
          <ICONS.messageIcon size="lg" color={iconColor} />
        </a>
      )}
    </div>
  );
}
