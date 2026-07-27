"use client";

import { useProducts } from "@/src/app/dashboard/products/_components/components/hook/useProducts";
import { ProductTableRow } from "@/src/app/dashboard/products/_components/product-table-row";
import { Text } from "@/src/shared/ui";

export const ProductTable = () => {
  const { data } = useProducts();

  const products = data?.data?.data ?? [];

  return (
    <div className="h-[540px] overflow-x-auto rounded-sm border border-gray-100 bg-white shadow-sm">
      <table className="w-full border-collapse">
        <thead className="border-b border-gray bg-gray-50">
          <tr>
            <th className="px-4 py-4 text-center"></th>
            <th className="px-4 py-4 text-center text-secondary">
              <Text text="عکس" size="lg" weight="medium" color="secondary" />
            </th>
            <th className="px-4 py-4 text-center text-secondary">
              <Text text="نام" size="lg" weight="medium" color="secondary" />
            </th>
            <th className="px-4 py-4 text-center text-secondary">
              <Text text="قیمت" size="lg" weight="medium" color="secondary" />
            </th>
            <th className="px-4 py-4 text-center text-secondary">
              <Text text="موجودی" size="lg" weight="medium" color="secondary" />
            </th>
            <th className="px-4 py-4 text-center text-secondary">
              <Text text="وضعیت" size="lg" weight="medium" color="secondary" />
            </th>
            <th className="px-4 py-4 text-center text-secondary">
              <Text text="عملیات" size="lg" weight="medium" color="secondary" />
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <ProductTableRow key={product.id} pro={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
