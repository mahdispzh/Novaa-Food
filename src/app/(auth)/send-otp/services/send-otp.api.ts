import { apiClient } from "@/src/shared/api/client";
import { fetcher } from "@/src/shared/api/fetcher";

export type SendOtpDto = {
  phone: string;
};

export type SendOtpResponse = {
  success: boolean;
  debugCode?: string;
};

export async function sendOtp(data: SendOtpDto) {
  console.log("sendOtp called");
  console.log("sendOtp called");
  console.log(apiClient.defaults.baseURL);
  return fetcher<SendOtpResponse>(() =>
    apiClient.post("auth/send-otp", {
      phone: data.phone,
      code: "0000",
    }),
  );
}
