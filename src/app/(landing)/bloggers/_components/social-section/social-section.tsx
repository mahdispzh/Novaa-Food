import socialFrame from "../../_assets/frames/social-frame.svg";
import { frameMaskStyle } from "../../_utils/frame-mask";
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
    <div className="relative">
      {/* aspect matches the native social-frame.svg (366x133) */}
      <div className="relative aspect-[366/133] w-full">
        <div
          className="bg-primary absolute inset-0"
          style={frameMaskStyle(socialFrame)}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
          <div className="flex flex-col gap-1">
            <h2 className="text-[15px] font-bold text-white">
              شبکه‌های اجتماعی
            </h2>
            <p className="text-[11px] text-white/80">
              برای اطلاع از جدیدترین معرفی‌ها و عکس‌ها همراه باشید
            </p>
          </div>

          <SocialLinks links={links} iconColor="text-white" />
        </div>
      </div>
    </div>
  );
}
