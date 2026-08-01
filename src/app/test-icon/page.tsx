import { BriefcaseIcon } from "@/src/shared/constants/icons/briefcase-icon";
import { BuildingIcon } from "@/src/shared/constants/icons/building-icon";
import { BurgerIcon } from "@/src/shared/constants/icons/burger-icon";
import { ChevronDownIcon } from "@/src/shared/constants/icons/chevrondown-icon";
import { CoffeeIcon } from "@/src/shared/constants/icons/coffee-icon";
import { ResturantIcon } from "@/src/shared/constants/icons/resturant-icon";
import { HalfstarIcon } from "@/src/shared/constants/icons/halfstar-icon";
import { EyeIcon } from "@/src/shared/constants/icons/eye-icon";
import { FilterIcon } from "@/src/shared/constants/icons/filter-icon";
import { HeadsetIcon } from "@/src/shared/constants/icons/headset-icon";
import { HeartIcon } from "@/src/shared/constants/icons/heart-icon";
import { HomeIcon } from "@/src/shared/constants/icons/home-icon";
import { InstagramIcon } from "@/src/shared/constants/icons/instagram-icon";
import { LikeIcon } from "@/src/shared/constants/icons/like-icon";
import { LocationIcon } from "@/src/shared/constants/icons/location-icon";
import { MessageIcon } from "@/src/shared/constants/icons/message-icon";
import { ClockIcon } from "@/src/shared/constants/icons/clock-icon";
import { NotificationIcon } from "@/src/shared/constants/icons/notification-icon";
import { PanIcon } from "@/src/shared/constants/icons/pan-icon";
import { PenIcon } from "@/src/shared/constants/icons/pen-icon";
import { PhoneIcon } from "@/src/shared/constants/icons/phone-icon";
import { ProfileIcon } from "@/src/shared/constants/icons/profile-icon";
import { SaveIcon } from "@/src/shared/constants/icons/save-icon";
import { SearchIcon } from "@/src/shared/constants/icons/search-icon";
import { SettingsIcon } from "@/src/shared/constants/icons/settings-icon";
import { ShareIcon } from "@/src/shared/constants/icons/share-icon";
import { SparkleIcon } from "@/src/shared/constants/icons/sparkle-icon";
import { TelegramIcon } from "@/src/shared/constants/icons/telegram-icon";
import { TimeIcon } from "@/src/shared/constants/icons/time-icon";
import { TypeIcon } from "@/src/shared/constants/icons/type-icon";
import { UserIcon } from "@/src/shared/constants/icons/user-icon";
import { VerifiedIcon } from "@/src/shared/constants/icons/verified-icon";
import { WhatsappIcon } from "@/src/shared/constants/icons/whatsapp-icon";

const icons = [
  { name: "BriefcaseIcon", Component: BriefcaseIcon },
  { name: "BuildingIcon", Component: BuildingIcon },
  { name: "ChevronDownIcon", Component: ChevronDownIcon },
  { name: "PanIcon", Component: PanIcon },
  { name: "CoffeeIcon", Component: CoffeeIcon },
  { name: "ResturantIcon", Component: ResturantIcon },
  { name: "HalfstarIcon", Component: HalfstarIcon },
  { name: "EyeIcon", Component: EyeIcon },
  { name: "FilterIcon", Component: FilterIcon },
  { name: "HeadsetIcon", Component: HeadsetIcon },
  { name: "HeartIcon", Component: HeartIcon },
  { name: "HomeIcon", Component: HomeIcon },
  { name: "InstagramIcon", Component: InstagramIcon },
  { name: "LocationIcon", Component: LocationIcon },
  { name: "MessageIcon", Component: MessageIcon },
  { name: "ClockIcon", Component: ClockIcon },
  { name: "NotificationIcon", Component: NotificationIcon },
  { name: "PenIcon", Component: PenIcon },
  { name: "PhoneIcon", Component: PhoneIcon },
  { name: "ProfileIcon", Component: ProfileIcon },
  { name: "SaveIcon", Component: SaveIcon },
  { name: "SearchIcon", Component: SearchIcon },
  { name: "ShareIcon", Component: ShareIcon },
  { name: "LikeIcon", Component: LikeIcon },
  { name: "SparkleIcon", Component: SparkleIcon },
  { name: "SettingsIcon", Component: SettingsIcon },
  { name: "TelegramIcon", Component: TelegramIcon },
  { name: "TimeIcon", Component: TimeIcon },
  { name: "TypeIcon", Component: TypeIcon },
  { name: "UserIcon", Component: UserIcon },
  { name: "VerifiedIcon", Component: VerifiedIcon },
  { name: "BurgerIcon", Component: BurgerIcon },
  { name: "WhatsappIcon", Component: WhatsappIcon },
] as const;

export default function Page() {
  return (
    <div className="flex flex-wrap gap-6 p-6">
      {icons.map(({ name, Component }) => (
        <div
          key={name}
          className="flex flex-col items-center gap-3 rounded-lg border border-gray-200 p-4"
        >
          <span className="text-sm text-gray-500">{name}</span>
          <div className="flex items-center gap-3">
            <Component size="xs" />
            <Component size="sm" />
            <Component size="md" />
            <Component size="lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
