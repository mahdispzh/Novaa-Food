import { ICONS } from "@/src/shared/constants/dynamic-icon";

const icons = [
  { name: "EventIcon", Component: ICONS.eventIcon },
  { name: "BuildingIcon", Component: ICONS.buildingIcon },
  { name: "CheckboxCheckedIcon", Component: ICONS.checkbox },
  { name: "ChevronDownIcon", Component: ICONS.chevronDownIcon },
  { name: "ComplexDesignIcon", Component: ICONS.complexDesignIcon },
  { name: "PanIcon", Component: ICONS.panIcon },
  { name: "TasteIcon", Component: ICONS.tasteIcon },
  { name: "SortIcon", Component: ICONS.sortIcon },
  { name: "PersonelIcon", Component: ICONS.personelIcon },
  { name: "CoffeeIcon", Component: ICONS.coffeeIcon },
  { name: "ResturantIcon", Component: ICONS.resturantIcon },
  { name: "HalfstarIcon", Component: ICONS.halfstarIcon },
  { name: "EyeIcon", Component: ICONS.eyeIcon },
  { name: "FilterIcon", Component: ICONS.filterIcon },
  { name: "HeadsetIcon", Component: ICONS.headsetIcon },
  { name: "HeartIcon", Component: ICONS.heartIcon },
  { name: "HomeIcon", Component: ICONS.homeIcon },
  { name: "InstagramIcon", Component: ICONS.instagramIcon },
  { name: "LocationIcon", Component: ICONS.locationIcon },
  { name: "LogoIcon", Component: ICONS.logoIcon },
  { name: "MessageIcon", Component: ICONS.messageIcon },
  { name: "MapIcon", Component: ICONS.mapIcon },
  { name: "MascotIcon", Component: ICONS.mascotIcon },
  { name: "MemoryCheckpointIcon", Component: ICONS.memoryCheckpointIcon },
  { name: "ClockIcon", Component: ICONS.clockIcon },
  { name: "DislikeIcon", Component: ICONS.dislikeIcon },
  { name: "StarIcon", Component: ICONS.starIcon },
  { name: "PhoneIcon", Component: ICONS.phoneIcon },
  { name: "ProfileIcon", Component: ICONS.profileIcon },
  { name: "RoundedSquareIcon", Component: ICONS.roundedSquareIcon },
  { name: "SaveIcon", Component: ICONS.saveIcon },
  { name: "SearchIcon", Component: ICONS.searchIcon },
  { name: "ShareIcon", Component: ICONS.shareIcon },
  { name: "SortDescendingIcon", Component: ICONS.sortDescendingIcon },
  { name: "LikeIcon", Component: ICONS.likeIcon },
  { name: "SparkleIcon", Component: ICONS.sparkleIcon },
  { name: "SettingsIcon", Component: ICONS.settingsIcon },
  { name: "TelegramIcon", Component: ICONS.telegramIcon },
  { name: "TimeIcon", Component: ICONS.timeIcon },
  { name: "TypeIcon", Component: ICONS.typeIcon },
  { name: "UserIcon", Component: ICONS.userIcon },
  { name: "VerifiedIcon", Component: ICONS.verifiedIcon },
  { name: "BurgerIcon", Component: ICONS.burgerIcon },
  { name: "WhatsappIcon", Component: ICONS.whatsappIcon },
  { name: "CorrectIcon", Component: ICONS.correctIcon },
  { name: "ChevronLeftIcon", Component: ICONS.chevronlefticon },
  { name: "DotIcon", Component: ICONS.dotIcon },
  { name: "ArrowRightIcon", Component: ICONS.arrowRightIcon },
  { name: "PlayIcon", Component: ICONS.playIcon },
  { name: "PlusIcon", Component: ICONS.plusIcon },
  { name: "ExploreIcon", Component: ICONS.exploreIcon },
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
