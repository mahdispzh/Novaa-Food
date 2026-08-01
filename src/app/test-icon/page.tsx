import { BuildingIcon } from "@/src/shared/constants/icons/building-icon";
import { BurgerIcon } from "@/src/shared/constants/icons/burger-icon";
import { CheckboxCheckedIcon } from "@/src/shared/constants/icons/chackboxchecked-icon";
import { ChevronDownIcon } from "@/src/shared/constants/icons/chevrondown-icon";
import { ClockIcon } from "@/src/shared/constants/icons/clock-icon";
import { CoffeeIcon } from "@/src/shared/constants/icons/coffee-icon";
import { ComplexDesignIcon } from "@/src/shared/constants/icons/complexdesign-icon";
import { EventIcon } from "@/src/shared/constants/icons/event-icon";
import { EyeIcon } from "@/src/shared/constants/icons/eye-icon";
import { FilterIcon } from "@/src/shared/constants/icons/filter-icon";
import { HalfstarIcon } from "@/src/shared/constants/icons/halfstar-icon";
import { HeadsetIcon } from "@/src/shared/constants/icons/headset-icon";
import { HeartIcon } from "@/src/shared/constants/icons/heart-icon";
import {TasteIcon} from "@/src/shared/constants/icons/taste-icon";
import { HomeIcon } from "@/src/shared/constants/icons/home-icon";
import { InstagramIcon } from "@/src/shared/constants/icons/instagram-icon";
import { LikeIcon } from "@/src/shared/constants/icons/like-icon";
import { LocationIcon } from "@/src/shared/constants/icons/location-icon";
import { LogoIcon } from "@/src/shared/constants/icons/logo-icon";
import { MapIcon } from "@/src/shared/constants/icons/map-icon";
import { MascotIcon } from "@/src/shared/constants/icons/mascot-icon";
import { MemoryCheckpointIcon } from "@/src/shared/constants/icons/memory-icon";
import { MessageIcon } from "@/src/shared/constants/icons/message-icon";
import { PanIcon } from "@/src/shared/constants/icons/pan-icon";
import {IdkIcon} from "@/src/shared/constants/icons/idk-icon";
import { StarIcon } from "@/src/shared/constants/icons/star-icon";
import { PhoneIcon } from "@/src/shared/constants/icons/phone-icon";
import { ProfileIcon } from "@/src/shared/constants/icons/profile-icon";
import { ResturantIcon } from "@/src/shared/constants/icons/resturant-icon";
import { RoundedSquareIcon } from "@/src/shared/constants/icons/rondedsqare-icon";
import { SaveIcon } from "@/src/shared/constants/icons/save-icon";
import { SearchIcon } from "@/src/shared/constants/icons/search-icon";
import { SettingsIcon } from "@/src/shared/constants/icons/settings-icon";
import { ShareIcon } from "@/src/shared/constants/icons/share-icon";
import { SortDescendingIcon } from "@/src/shared/constants/icons/sortdescending-icon";
import { SparkleIcon } from "@/src/shared/constants/icons/sparkle-icon";
import { TelegramIcon } from "@/src/shared/constants/icons/telegram-icon";
import { TimeIcon } from "@/src/shared/constants/icons/time-icon";
import { TypeIcon } from "@/src/shared/constants/icons/type-icon";
import { UserIcon } from "@/src/shared/constants/icons/user-icon";
import { VerifiedIcon } from "@/src/shared/constants/icons/verified-icon";
import { WhatsappIcon } from "@/src/shared/constants/icons/whatsapp-icon";
import { DislikeIcon } from "@/src/shared/constants/icons/dislike-icon";
import { PersonelIcon } from "@/src/shared/constants/icons/personel-icon";
import {SortIcon} from "@/src/shared/constants/icons/sort-icon";

const icons = [
  { name: "EventIcon", Component: EventIcon },
  { name: "BuildingIcon", Component: BuildingIcon },
  { name: "CheckboxCheckedIcon", Component: CheckboxCheckedIcon },
  { name: "ChevronDownIcon", Component: ChevronDownIcon },
  { name: "ComplexDesignIcon", Component: ComplexDesignIcon },
  { name: "PanIcon", Component: PanIcon },
  { name: "TasteIcon", Component: TasteIcon },
  { name: "SortIcon", Component: SortIcon },
  { name: "PersonelIcon", Component: PersonelIcon },
  { name: "CoffeeIcon", Component: CoffeeIcon },
  { name: "ResturantIcon", Component: ResturantIcon },
  { name: "HalfstarIcon", Component: HalfstarIcon },
  { name: "EyeIcon", Component: EyeIcon },
  { name: "TasteIcon", Component: TasteIcon },
  { name: "FilterIcon", Component: FilterIcon },
  { name: "HeadsetIcon", Component: HeadsetIcon },
  { name: "IdkIcon", Component: IdkIcon },
  { name: "HeartIcon", Component: HeartIcon },
  { name: "HomeIcon", Component: HomeIcon },
  { name: "InstagramIcon", Component: InstagramIcon },
  { name: "LocationIcon", Component: LocationIcon },
  { name: "LogoIcon", Component: LogoIcon },
  { name: "MessageIcon", Component: MessageIcon },
  { name: "MapIcon", Component: MapIcon },
  { name: "MascotIcon", Component: MascotIcon },
  { name: "MemoryCheckpointIcon", Component: MemoryCheckpointIcon },
  { name: "ClockIcon", Component: ClockIcon },
  { name: "DislikeIcon", Component: DislikeIcon },
  { name: "StarIcon", Component: StarIcon },
  { name: "PhoneIcon", Component: PhoneIcon },
  { name: "ProfileIcon", Component: ProfileIcon },
  { name: "RoundedSquareIcon", Component: RoundedSquareIcon },
  { name: "SaveIcon", Component: SaveIcon },
  { name: "SearchIcon", Component: SearchIcon },
  { name: "ShareIcon", Component: ShareIcon },
  { name: "SortDescendingIcon", Component: SortDescendingIcon },
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
