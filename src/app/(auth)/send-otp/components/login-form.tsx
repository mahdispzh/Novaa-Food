"use client";

import { ICONS } from "@/src/shared/constants/dynamic-icon";
import text from "@/src/shared/constants/texts/texts.json";
import { DefaultButton, Text } from "@/src/shared/ui";
import { Rules } from "@/src/shared/validations/rules";
import { useValidation } from "@/src/shared/validations/use-validation";
import { AuthHeroPanel } from "@/src/shared/components/auth/auth-hero-panel";
import { AuthCard } from "@/src/shared/components/auth/auth-card";

const PHONE_LENGTH = 10;

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
    const numbersOnly = value.replace(/\D/g, "").slice(0, PHONE_LENGTH);

    phoneValidation.onChange(numbersOnly);
    changePhone(numbersOnly);
  };

  const handleSubmit = () => {
    if (!phoneValidation.validate()) return;

    sendOtpAction(phone);
  };

  return (
    <main className="flex min-h-dvh justify-center bg-beige">
      <div className="w-full max-w-sm">
        <AuthHeroPanel
          description={text.dashboard.login.description}
          icon={<ICONS.phoneIcon color="text-white" size="md" />}
          title={text.dashboard.login.title}
        />

        <AuthCard>
          <div className="flex flex-col gap-2">
            <div
              dir="ltr"
              className={`flex items-center gap-3 border-b py-2 transition ${
                phoneValidation.error
                  ? "border-danger"
                  : "border-gray focus-within:border-primary"
              }`}
            >
              <span className="text-lg text-gray">+98</span>
              <input
                className="flex-1 text-lg text-secondary outline-none placeholder:text-gray"
                inputMode="numeric"
                placeholder="Mobile Number"
                type="tel"
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>

            {phoneValidation.error && (
              <span className="text-sm text-danger">
                {phoneValidation.error}
              </span>
            )}
          </div>

          <div className="mt-8">
            <DefaultButton
              action={handleSubmit}
              label={text.dashboard.login.submit}
              style="fill"
              type="primary"
              width="full"
            />
          </div>

          <Text
            className="mt-4 block text-center leading-relaxed"
            color="secondary"
            size="xs"
            text={text.dashboard.login.terms}
            weight="regular"
          />
        </AuthCard>
      </div>
    </main>
  );
}
