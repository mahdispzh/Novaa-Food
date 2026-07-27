"use client";

import text from "@/src/shared/constants/texts/texts.json";
import { DefaultButton, OtpInput, Subtitle, Text } from "@/src/shared/ui";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
  const isComplete = code.length === 4;

  return (
    <div className="flex w-[30vw] flex-col rounded-lg bg-white p-[2.5vw] pb-[2vw] shadow-danger">
      <div className="flex flex-col items-center gap-[10vh]">
        <Image
          alt=""
          className="h-auto w-[18vw]"
          height={80}
          src="/images/logo.svg"
          width={80}
        />{" "}
        <div className="flex w-full flex-col gap-[2vh] px-[2vw]">
          <div className="flex flex-col gap-[2vh] pb-[1vw]">
            <Text
              color="primary"
              size="lg"
              text={text.dashboard.login.verifyCode}
              weight="bold"
            />
            <Text
              color="secondary"
              size="sm"
              text={`${text.dashboard.login.codeSent} ${phoneNumber} ${text.dashboard.login.sent}`}
              weight="bold"
            />
            <div className="flex justify-center">
              <OtpInput
                length={4}
                value={code}
                onChange={onChangeCode}
                status={inputStatus}
                onEnter={() => {
                  if (isComplete && !isLoading) {
                    verifyOtpAction();
                  }
                }}
              />
            </div>
          </div>
          <div className="flex justify-center">
            {isExpired ? (
              <button className="cursor-pointer" onClick={resetTimer}>
                <Text
                  color="secondary"
                  size="lg"
                  text={text.dashboard.login.resendCode}
                  weight="regular"
                />
              </button>
            ) : (
              <div className="flex flex-row gap-[0.3vw]">
                <Text
                  text={remainingTime}
                  size="lg"
                  weight="bold"
                  color="secondary"
                />
                <Text
                  color="secondary"
                  size="lg"
                  text={text.dashboard.login.remainingTime}
                  weight="regular"
                />
              </div>
            )}
          </div>
          <div className="flex justify-center pt-[1.5vh]">
            
              <DefaultButton
                type="primary" 
                style="fill"
                label={text.dashboard.login.submit}
                action={verifyOtpAction}
              />
          </div>
          <div
            className="flex w-full cursor-pointer items-center justify-center pt-[1vw]"
            onClick={() => router.push("/send-otp")}
          >
            <Text
              color="secondary"
              size="md"
              text="تغییر شماره و دریافت مجدد کد"
              weight="regular"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
