import { Text } from "@/src/shared/ui";
import { statusItems } from "../_constants/status-items";
import { StatusItem } from "./status-item";

interface Props {}

export function ProductStatusCard({}: Props) {
  return (
    <div className="flex h-auto w-full flex-col rounded-sm bg-pure-white shadow-xl">
      <div className="border-b-2 border-accent px-4 py-4">
        <Text text="وضعیت محصولات" size="lg" color="secondary" weight="bold" />
      </div>
      <div className="flex flex-col gap-5 px-4 py-4">
        {statusItems.map((item) => (
          <StatusItem
            key={item.id}
            icon={item.icon}
            count={item.count}
            label={item.label}
          />
        ))}
      </div>
    </div>
  );
}
