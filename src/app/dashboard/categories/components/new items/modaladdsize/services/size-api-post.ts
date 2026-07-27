import { apiClient, fetcher } from "@/src/shared/api/fetcher";

export type CreateSizeDto = {
  name: string;
};

export async function sizeApiPost(
  data: CreateSizeDto
) {
  const token =
    localStorage.getItem("accessToken");

  return fetcher(() =>
    apiClient.post(
      "protected/sizes",
      {
        name: data.name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  );
}
