import { ICONS } from "@/src/shared/constants/dynamic-icon";

const {
  tasteIcon :TasteIcon ,
  buildingIcon : BuildingIcon,
  personelIcon : PersonelIcon,
} = ICONS;

export const BloggerRatingData = [
  { icon: TasteIcon, title: "طعم غذا", rating: 4.1 },
  { icon: BuildingIcon, title: "فضای رستوران", rating: 4.1 },
  { icon: PersonelIcon, title: "برخورد پرسنل", rating: 4.2 },
];