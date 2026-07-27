import { Subtitle, Text } from "@/src/shared/ui";

interface StatusItemProps {
  icon: React.ReactNode;
  count: number;
  label: string;
}

export function StatusItem({ icon, count, label }: StatusItemProps) {
  return (
    <div className="flex flex-row gap-2">
      {icon}
      <div className="flex flex-col">
        <Subtitle text={String(count)} size="2xl" weight="bold" />
        <Text text={label} size="md" />
      </div>
    </div>
  );
}
