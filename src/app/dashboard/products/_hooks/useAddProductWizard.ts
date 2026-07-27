"use client";

import { useState } from "react";

const stepFields = [
  ["name", "categoryId", "description"],
  ["brand_id", "color_id", "size_id", "price", "stock"],
  ["images"],
] as const;

export function useAddProductWizard(methods: any) {
  const [step, setStep] = useState(0);

  const next = async () => {
    const fields = stepFields[step];
    const valid = await methods.trigger(fields as any);

    if (!valid) return;

    setStep((s) => Math.min(s + 1, 2));
  };

  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const reset = () => setStep(0);

  return { step, next, prev, reset };
}
