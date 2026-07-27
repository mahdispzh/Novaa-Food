import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "نام دسته بندی الزامی است"),
  image: z.string().optional(),
  parentId: z.number().nullable(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
