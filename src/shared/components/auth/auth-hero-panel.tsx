import { ReactNode } from "react";

import { Text } from "@/src/shared/ui";

interface AuthHeroPanelProps {
  icon: ReactNode;
  title: string;
  description: ReactNode;
}

// سطح رنگی با محتوا بزرگ می‌شه، موج فقط یه نوار زیرشه.
// ارتفاع ثابت نداریم: وگرنه path باید دقیقاً با باکس جور در بیاد و
// هر وقت متن یا فونت یا زبان عوض بشه می‌شکنه.
const WAVE_PATH = "M0,0 H400 V20 C300,20 220,20 150,20 C90,20 60,80 0,80 Z";

export function AuthHeroPanel({ icon, title, description }: AuthHeroPanelProps) {
  return (
    <div className="w-full shrink-0">
      <div className="flex flex-col items-center gap-3 bg-primary px-8 pt-10 pb-4 text-center">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/25">
          {icon}
        </div>

        <Text color="white" size="xl" text={title} weight="bold" />

        <p className="text-sm leading-relaxed text-white/90">{description}</p>
      </div>

      {/* mt-px منفی خط مویی رندر ساب‌پیکسلی رو می‌پوشونه */}
      <svg
        aria-hidden="true"
        className="-mt-px block h-12 w-full text-primary"
        preserveAspectRatio="none"
        viewBox="0 0 400 80"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={WAVE_PATH} fill="currentColor" />
      </svg>
    </div>
  );
}
