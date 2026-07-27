import { SearchInput } from "@/src/app/dashboard/products/_components/search-input";
import { IconLabelButton } from "@/src/shared/ui";

interface Props {}

export function ProductTab({}: Props) {
  return (
    <div className={"flex justify-between"}>
      <SearchInput />
      <IconLabelButton />
    </div>
  );
}
