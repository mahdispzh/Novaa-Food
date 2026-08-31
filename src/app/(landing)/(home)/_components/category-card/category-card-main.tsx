import CategoryCardSection from "./category-card-section";
import { getLandingHome } from "../../_services/home.server";

export default async function CategoryCardMain() {
  const { categories } = await getLandingHome();

  return <CategoryCardSection data={categories} />;
}