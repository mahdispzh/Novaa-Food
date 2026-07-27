export const categoryKeys = {
  all: ["categories"] as const,

  list: (page: number, limit: number) =>
    [...categoryKeys.all, "list", page, limit] as const,

  detail: (id: number) =>
    [...categoryKeys.all, "detail", id] as const,
};
