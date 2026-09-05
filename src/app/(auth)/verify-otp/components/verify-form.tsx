"use client";

import { ICONS } from "@/src/shared/constants/dynamic-icon";
import text from "@/src/shared/constants/texts/texts.json";
import { DefaultButton, OtpInput, Text } from "@/src/shared/ui";
import { useRouter } from "next/navigation";
import { AuthHeroPanel } from "@/src/shared/components/auth/auth-hero-panel";
import { AuthCard } from "@/src/shared/components/auth/auth-card";

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
  const router = useRouter();
  const canSubmit = code.length === OTP_LENGTH && !isLoading;

  return (
    <main className="flex min-h-dvh justify-center bg-beige">
      <div className="w-full max-w-sm">
        <AuthHeroPanel
          icon={<ICONS.checkbox color="text-white" size="md" />}
          title={text.dashboard.login.verifyCode}
          description={
            <>
              {text.dashboard.login.codeSent}{" "}
              <bdi dir="ltr">{phoneNumber}</bdi>{" "}
              {text.dashboard.login.sent}
            </>
          }
        />

        <AuthCard>
          <div className="flex flex-col items-center gap-6">
            <OtpInput
              length={OTP_LENGTH}
              value={code}
              onChange={onChangeCode}
              status={inputStatus}
              onEnter={() => canSubmit && verifyOtpAction()}
            />

            <div className="flex flex-col items-center gap-2">
              {!isExpired && (
                <Text
                  color="secondary"
                  size="xs"
                  text={text.dashboard.login.remainingTime}
                  weight="regular"
                />
              )}

              {isExpired ? (
                <button
                  type="button"
                  className="cursor-pointer"
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

          <div className="mt-8 flex flex-col items-center gap-4">
            <DefaultButton
              action={verifyOtpAction}
              disabled={!canSubmit}
              label={text.dashboard.login.submit}
              style="fill"
              type="primary"
              width="full"
            />

            <button
              type="button"
              className="cursor-pointer"
              onClick={() => router.push("/send-otp")}
            >
              <Text
                color="secondary"
                size="sm"
                text="تغییر شماره و دریافت مجدد کد"
                weight="regular"
              />
            </button>
          </div>
        </AuthCard>
      </div>
    </main>
  );
}
