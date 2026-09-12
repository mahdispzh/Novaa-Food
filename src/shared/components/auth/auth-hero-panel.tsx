import type { ReactNode } from "react";

import { Text } from "@/src/shared/ui";

interface AuthHeroPanelProps {
  icon: ReactNode;
  title: string;
  description: ReactNode;
}

// Just the icon/title/description block for the top (green) area of the
// auth screens. The white wave shape is a separate component
// (AuthWaveShape) so it can be sized/positioned independently and keep
// its aspect ratio intact.
export function AuthHeroPanel({
  icon,
  title,
  description,
}: AuthHeroPanelProps) {
  return (
    <div
      className="relative flex flex-col items-center gap-4 px-8 pt-24 pb-8 text-center"
      style={{ transform: "translateY(clamp(24px, 7vh, 56px))" }}
    >
      <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-white/25">
        {icon}
      </div>

      <Text
        className="relative top-2 text-2xl"
        color="white"
        size="xl"
        text={title}
        weight="bold"
      />

      <p className="relative top-2 text-base leading-relaxed text-white/90">
        {description}
      </p>
    </div>
  );
}
