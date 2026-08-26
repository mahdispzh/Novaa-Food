import { BloggerSocialLinks } from "../../_types/blogger.types";
import SocialLinks from "../social-links/social-links";

interface SocialSectionProps {
  links: BloggerSocialLinks;
}

export default function SocialSection({ links }: SocialSectionProps) {
  const hasAnyLink = Boolean(
    links.instagram || links.telegram || links.whatsapp,
  );
  if (!hasAnyLink) return null;

  return (
      <div className="relative aspect-[2.75] w-full">
        <svg
          viewBox="0 0 366 133"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 0H366V126.179H88C43.8172 126.179 8 90.3623 8 46.1795V0Z"
            fill="#8E977D"
          />
          <path
            d="M357.5 7.32056V132.5H80C36.0934 132.5 0.500115 96.9068 0.5 53.0002V7.32056H357.5Z"
            stroke="#301F18"
            fill="none"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-right">
          <div className="flex flex-col translate-x-6 gap-1">
            <h2 className="text-[15px] font-bold text-secondary">
              شبکه‌های اجتماعی
            </h2>
            <p className="text-[11px] text-white/80">
              برای اطلاع از جدیدترین معرفی‌ها و عکس‌ها همراه باشید!
            </p>
          </div>

          <SocialLinks links={links} iconColor="text-white" />
        </div>
      </div>
  );
}
