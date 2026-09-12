"use client";

import { AuthHeroPanel } from "@/src/shared/components/auth/auth-hero-panel";
import { AuthWaveShape } from "@/src/shared/components/auth/auth-wave-shape";
import { ICONS } from "@/src/shared/constants/dynamic-icon";
import text from "@/src/shared/constants/texts/texts.json";
import { DefaultButton, OtpInput, Text } from "@/src/shared/ui";

const OTP_LENGTH = 4;

interface VerifyFormProps {
  code: string;
  onChangeCode: (value: string) => void;
  phoneNumber?: string;
  remainingTime?: string;
  isExpired?: boolean;
  resetTimer: () => void;
  verifyOtpAction: () => void;
  inputStatus: "default" | "success" | "error";
  isLoading?: boolean;
}

export default function VerifyForm({
  code,
  onChangeCode,
  phoneNumber = "********",
  remainingTime = "1:00",
  isExpired = false,
  resetTimer,
  verifyOtpAction,
  inputStatus,
  isLoading,
}: VerifyFormProps) {
  const canSubmit = code.length === OTP_LENGTH && !isLoading;

  return (
    <div className="fixed inset-0 flex h-screen max-h-screen w-full flex-col overflow-hidden bg-primary">
      <AuthHeroPanel
        description={
          <>
            {text.dashboard.login.codeSent} <bdi dir="ltr">{phoneNumber}</bdi>{" "}
            {text.dashboard.login.sent}
          </>
        }
        icon={
          <ICONS.otpIcon
            color="text-white"
            size="9xl"
            style={{
              height: "80px",
              transform: "scaleX(3) scaleY(2.5)",
              width: "100px",
            }}
          />
        }
        title={text.dashboard.login.verifyCode}
      />

      <div className="relative w-full flex-1 overflow-hidden">
        <AuthWaveShape
          stretch
          className="absolute right-0 bottom-7 h-[150%] w-4/5 [&_svg]:origin-bottom [&_svg]:scale-y-[1.35]"
        />

        <div className="relative z-10 flex h-full flex-col items-center justify-between px-8 py-10">
          <div
            className="relative z-20 flex flex-col items-center gap-5"
            style={{ transform: "translateY(clamp(190px, 28vh, 260px))" }}
          >
            {/* 4 large boxes per spec — reusing the existing OtpInput component */}
            <OtpInput
              length={OTP_LENGTH}
              status={inputStatus}
              value={code}
              onChange={onChangeCode}
              onEnter={() => canSubmit && verifyOtpAction()}
            />

            {isExpired ? (
              <button
                className="cursor-pointer"
                type="button"
                onClick={resetTimer}
              >
                <Text
                  className="underline"
                  color="secondary"
                  size="md"
                  text={text.dashboard.login.resendCode}
                  weight="medium"
                />
              </button>
            ) : (
              <Text
                color="secondary"
                size="lg"
                text={remainingTime}
                weight="bold"
              />
            )}
          </div>
        </div>
      </div>

      <div
        className="fixed z-20"
        style={{ bottom: "64px", left: "15%", width: "70%" }}
      >
        <DefaultButton
          action={verifyOtpAction}
          className="h-14 text-lg"
          disabled={!canSubmit}
          label="ورود"
          style="fill"
          type="primary"
          width="full"
        />
      </div>
    </div>
  );
}
