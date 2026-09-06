"use client";

import { cn } from "@/src/shared/lib/utils";
import { useRef } from "react";

export interface OtpInputProps {
  length: number;
  value: string;
  onChange: (value: string) => void;
  status?: "default" | "success" | "error";
  onEnter?: () => void;
}

const statusClassMap: Record<NonNullable<OtpInputProps["status"]>, string> = {
  default: "border-gray focus:border-primary",
  success: "border-success",
  error: "border-danger",
};

export function OtpInput({
  length,
  value,
  onChange,
  status = "default",
  onEnter,
}: OtpInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  const setDigit = (index: number, digit: string) => {
    const chars = value.split("");
    chars[index] = digit;
    onChange(chars.join("").slice(0, length));
  };

  const handleChange = (index: number, raw: string) => {
    const digit = raw.replace(/\D/g, "").slice(-1);
    setDigit(index, digit);

    if (digit && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === "Enter") {
      onEnter?.();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;
    e.preventDefault();
    onChange(pasted.slice(0, length));
    const nextIndex = Math.min(pasted.length, length - 1);
    inputsRef.current[nextIndex]?.focus();
  };

  return (
    <div className="flex flex-row gap-2" dir="ltr">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          className={cn(
            "h-14 w-14 rounded-full border text-center text-2xl font-medium transition outline-none",
            statusClassMap[status],
          )}
          inputMode="numeric"
          maxLength={1}
          type="text"
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
}
