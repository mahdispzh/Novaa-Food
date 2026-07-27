export const productKeys = {
  all: ["products"] as const,
  list: (page: number, limit: number) =>
    [...productKeys.all, "list", page, limit] as const,
  detail: (slug: string) => [...productKeys.all, "detail", slug] as const,
};
