"use client";
import LoginForm from "../components/login-form";
import { useSendOtp } from "../hooks/useSendOtp";

export default function SendOtp() {
  const { sendOtpAction, phone, changePhone } = useSendOtp();

  return (
    <LoginForm
      changePhone={changePhone}
      phone={phone}
      sendOtpAction={sendOtpAction}
    />
  );
}
