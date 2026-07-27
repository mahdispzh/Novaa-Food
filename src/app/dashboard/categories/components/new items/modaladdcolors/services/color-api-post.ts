import {apiClient, fetcher} from "@/src/shared/api/fetcher";

export type CreateBrandDto = {
  name: string;
  hexCode: string;
};

export type SendOtpResponse = {
  success: boolean;
  debugCode?: string;
};
export async function colorApiPost(data: CreateBrandDto) {
  const token = localStorage.getItem("accessToken");

  // console.log("API TOKEN =>", token);

  return fetcher<SendOtpResponse>(() =>
    apiClient.post(
      "protected/colors",
      {
        name: data.name,
        hexCode: data.hexCode,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  );
}
