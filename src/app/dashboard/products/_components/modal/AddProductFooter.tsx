"use client";

import { DefaultButton } from "@/src/shared/ui";

interface Props {
  step: number;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
  isLoading?: boolean;
}

export function AddProductFooter({
  step,
  onPrev,
  onNext,
  onClose,
  isLoading = false,
}: Props) {
  const totalSteps = 3;

  return (
    <div className="flex w-full gap-3">
      {step > 0 && (
        <DefaultButton
          type="primary"
          style="outline"
          label="مرحله قبل"
          disabled={isLoading}
          action={onPrev}
        />
      )}

      {step < totalSteps - 1 && (
        <DefaultButton
          type="primary"
          style="fill"
          label="مرحله بعد"
          disabled={isLoading}
          action={onNext}
        />
      )}

      {step === totalSteps - 1 && (
        <button
          type="submit" // ✅ فقط این دکمه submit کند
          disabled={isLoading}
          className="text-medium w-full cursor-pointer rounded-sm bg-secondary py-2 text-accent transition hover:bg-primary disabled:opacity-50"
        >
          {isLoading ? "در حال ثبت..." : "ثبت محصول"}
        </button>
      )}
    </div>
  );
}
