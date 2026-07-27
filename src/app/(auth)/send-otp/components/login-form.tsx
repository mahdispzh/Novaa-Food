"use client";

import text from "@/src/shared/constants/texts/texts.json";
import { DefaultButton, Text } from "@/src/shared/ui";
import { Rules } from "@/src/shared/validations/rules";
import { useValidation } from "@/src/shared/validations/use-validation";
import Image from "next/image";

interface LoginFormProps {
  phone: string;
  changePhone: (value: string) => void;
  sendOtpAction: (phone: string) => void;
}

export default function LoginForm({
  phone,
  changePhone,
  sendOtpAction,
}: LoginFormProps) {
  const phoneValidation = useValidation(Rules.phone);

  const handlePhoneChange = (value: string) => {
    const numbersOnly = value.replace(/\D/g, "");

    phoneValidation.onChange(numbersOnly);
    changePhone(numbersOnly);
  };

  const handleSubmit = () => {
    const isValid = phoneValidation.validate();
    if (!isValid) return;

    sendOtpAction(phone);
  };

  return (
    <div className="flex w-[30vw] flex-col items-center gap-[10vh] rounded-lg bg-white p-[2.5vw] shadow-danger">
      <Image
        alt="logo"
        className="h-auto w-[18vw]"
        height={80}
        src="/images/logo.svg"
        width={200}
      />

      <div className="flex w-full flex-col gap-[3vh]">
        <div className="flex w-full flex-col gap-[3vh] px-[2vw]">
          <div className="flex flex-col gap-[1vh] pb-[1vw]">
            <Text
              color="primary"
              size="lg"
              text={text.dashboard.login.title}
              weight="bold"
            />

            <Text
              color="primary"
              size="lg"
              text={text.dashboard.login.description}
              weight="bold"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-[0.2vw]">
              <input
                autoFocus
                className={`text-medium w-full rounded-r-sm border px-4 py-3 text-lg text-[#6b6a6a] transition outline-none placeholder:text-gray ${
                  phoneValidation.error
                    ? "border-danger focus:border-danger"
                    : "border-gray focus:border-primary"
                }`}
                placeholder="9176202911"
                type="tel"
                value={phoneValidation.value}
                onChange={(e) => handlePhoneChange(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
              <div className="flex w-15 items-center justify-center rounded-l-sm border border-gray bg-white py-3 focus:border-primary">
                <p className="text-medium text-lg text-[#6b6a6a]">98+</p>
              </div>
            </div>

            {phoneValidation.error && (
              <span className="text-sm text-danger">
                {phoneValidation.error}
              </span>
            )}
          </div>
          <div className="flex justify-center pt-[1.5vh]">
            <DefaultButton
              action={handleSubmit}
              label={text.dashboard.login.submit}
              style="fill"
              type="primary"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Text
            color="secondary"
            size="md"
            text={text.dashboard.login.terms}
            weight="regular"
          />
        </div>
      </div>
    </div>
  );
}
