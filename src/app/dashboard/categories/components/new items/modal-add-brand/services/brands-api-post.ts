import {apiClient, fetcher} from "@/src/shared/api/fetcher";

export type CreateBrandDto = {
  name: string;
  slug: string;
  logoUrl: string;
};

export type SendOtpResponse = {
  success: boolean;
  debugCode?: string;
};
export async function brandsApiPost(data: CreateBrandDto) {
  const token = localStorage.getItem("accessToken");

  // console.log("API TOKEN =>", token);

  return fetcher<SendOtpResponse>(() =>
    apiClient.post(
      "protected/brands",
      {
        name: data.name,
        slug: data.name,
        logoUrl: data.logoUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  );
}
