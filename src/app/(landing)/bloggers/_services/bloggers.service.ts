import { MOCK_BLOGGERS } from "../_constants/bloggers.mock";
import { Blogger } from "../_types/blogger.types";

export async function getBloggers(): Promise<Blogger[]> {
  return MOCK_BLOGGERS;
}

export async function getBloggerById(id: string): Promise<Blogger | null> {
  return MOCK_BLOGGERS.find((blogger) => blogger.id === id) ?? null;
}