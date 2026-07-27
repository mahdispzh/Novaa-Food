import { PencilIcon } from "@/src/shared/constants/icons/pencil-icon";
import { Subtitle } from "@/src/shared/ui";

interface Props {
  name: string;
  onEdit: () => void;
}

export function ShopHeader({ name, onEdit }: Props) {
  return (
    <div className="flex justify-between">
      <Subtitle text={name} size="3xl" weight="medium" color="primary" />

      <button onClick={onEdit}>
        <PencilIcon color="text-primary" size="md" />
      </button>
    </div>
  );
}
