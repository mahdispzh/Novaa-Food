// نمایش توضیحات کامل محصول در یک بخش با عنوان "معرفی کالا".

import { Text, Title } from "@/src/shared/ui";
import { Product } from "../_types/product";

export function ProductDescription({
  description,
}: {
  description: Product["description"];
}) {
  return (
    <section className="mb-8">
      <Title variant="underlined" text="معرفی کالا" size="3xl" />
      <div className="pt-4 md:pt-[2vw]">
        <Text text={description} weight="regular" size="lg" />
      </div>
    </section>
  );
}
