"use client";

import { AuthHeroPanel } from "@/src/shared/components/auth/auth-hero-panel";
import { AuthWaveShape } from "@/src/shared/components/auth/auth-wave-shape";
import { ICONS } from "@/src/shared/constants/dynamic-icon";
import text from "@/src/shared/constants/texts/texts.json";
import { DefaultButton } from "@/src/shared/ui";
import { Rules } from "@/src/shared/validations/rules";
import { useValidation } from "@/src/shared/validations/use-validation";

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
    <div className="fixed inset-0 flex h-screen max-h-screen w-full flex-col overflow-hidden bg-primary">
      <AuthHeroPanel
        description={text.dashboard.login.description}
        icon={
          <ICONS.mobileIcon
            color="text-white"
            size="9xl"
            style={{
              height: "80px",
              transform: "scaleX(3) scaleY(2.5)",
              width: "100px",
            }}
          />
        }
        title={text.dashboard.login.title}
      />

      <div className="relative w-full flex-1 overflow-hidden">
        <AuthWaveShape
          stretch
          className="absolute right-0 bottom-7 h-[150%] w-4/5 [&_svg]:origin-bottom [&_svg]:scale-y-[1.35]"
        />

        <div className="relative z-10 flex h-full flex-col px-8 py-10">
          <div
            className="relative z-20 flex w-4/5 flex-col gap-2 self-center"
            style={{
              marginInline: "auto",
              transform: "translateY(clamp(190px, 28vh, 260px))",
              width: "70%",
            }}
          >
            {/* Fixed +98 prefix, no country selector, per spec */}
            <div
              className={`flex items-center gap-3 border-b py-3 text-lg transition ${
                phoneValidation.error
                  ? "border-danger"
                  : "border-gray focus-within:border-primary"
              }`}
              dir="ltr"
            >
              <span className="text-secondary">+98</span>
              <input
                autoFocus
                className="flex-1 text-secondary outline-none placeholder:text-gray"
                inputMode="numeric"
                placeholder="9123456789"
                type="tel"
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>

            {phoneValidation.error && (
              <span className="text-danger text-sm">
                {phoneValidation.error}
              </span>
            )}
          </div>
        </div>
      </div>

      <div
        className="fixed z-20"
        style={{ bottom: "64px", left: "15%", width: "70%" }}
      >
        <DefaultButton
          action={handleSubmit}
          className="h-14 text-lg"
          label="ورود"
          style="fill"
          type="primary"
          width="full"
        />
      </div>
    </div>
  );
}
