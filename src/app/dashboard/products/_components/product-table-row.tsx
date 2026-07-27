import { ProductDeleteModal } from "@/src/app/dashboard/products/_components/components/components/product-delete-modal";
import { AddProductModal } from "@/src/app/dashboard/products/_components/modal/AddProductModal";
import { Product } from "@/src/app/dashboard/products/_types/product.types";
import { ComposeIcon } from "@/src/shared/constants/icons/compose-icon";
import { TrashIcon } from "@/src/shared/constants/icons/trash-icon";
import { Price, Text } from "@/src/shared/ui";
import { Checkbox } from "@/src/shared/ui/check-box/checkbox.ui";
import { getProductStatus } from "@/src/shared/utils/getProductStatusByCount";
import Image from "next/image";
import { useState } from "react";

interface Props {
  pro: Product;
}

export const ProductTableRow = ({ pro }: Props) => {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  // =============================================
  // انتخاب واریانت پیش‌فرض (اولین واریانت)
  // =============================================
  const [selectedVariant, setSelectedVariant] = useState(
    pro.product_variants?.[0] || null,
  );

  // =============================================
  // استخراج رنگ‌های یکتا (بر اساس color_id)
  // =============================================
  const uniqueColors = Array.from(
    new Map(
      pro.product_variants?.map((v) => [v.color_id, v.colors]) || [],
    ).values(),
  );

  // =============================================
  // هندلر انتخاب رنگ
  // =============================================
  const handleColorClick = (colorId: number) => {
    const variant =
      pro.product_variants?.find((v) => v.color_id === colorId) || null;
    setSelectedVariant(variant);
  };

  // =============================================
  // داده‌های نمایشی
  // =============================================
  const imageSrc =
    pro.images && pro.images.length > 0 && pro.images[0]?.trim()
      ? pro.images[0]
      : "/images/placeholder.jpg";

  const stock = selectedVariant?.stock ?? 0;
  const price = selectedVariant?.price ?? 0;
  const status = getProductStatus(stock);

  const handleEdit = () => {
    setSelectedSlug(pro.slug);
    setUpdateModal(true);
  };

  const handleDelete = () => {
    setSelectedSlug(pro.slug);
    setDeleteModal(true);
  };

  return (
    <>
      <tr className="h-28 border-b border-gray hover:bg-gray-50">
        <td className="px-4 py-4 text-center align-middle">
          <Checkbox variant="secondary" />
        </td>

        <td className="px-4 py-4 text-center align-middle">
          <div className="h-[90px] w-[70px] cursor-pointer overflow-hidden rounded-xs bg-gray-100">
            <Image
              src={imageSrc}
              alt={pro.name}
              width={70}
              height={90}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          </div>
        </td>

        <td className="px-4 py-4 text-center align-middle">
          <div className="flex flex-col items-center gap-2">
            <Text text={pro.name} size="lg" weight="medium" />

            {/* ================================ */}
            {/* دکمه‌های رنگ‌ها */}
            {/* ================================ */}
            <div className="flex items-center gap-1.5">
              {uniqueColors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleColorClick(color.id)}
                  className="h-4 w-4 cursor-pointer rounded-full border-2 transition-transform hover:scale-110"
                  style={{
                    backgroundColor: color.hex_code,
                    borderColor:
                      selectedVariant?.color_id === color.id
                        ? "#000"
                        : "transparent",
                  }}
                  title={color.name}
                />
              ))}
              {uniqueColors.length === 0 && (
                <Text text="—" size="sm" color="secondary" />
              )}
            </div>
          </div>
        </td>

        <td className="px-4 py-4 text-center align-middle">
          <Price price={price} />
        </td>

        <td className="px-4 py-4 text-center align-middle">
          <Text text={`${stock}`} size="md" />
        </td>

        <td className="px-4 py-4 text-center align-middle">
          <Text
            text={status.text}
            size="md"
            color={status.color === "primary" ? "primary" : "danger"}
          />
        </td>

        <td className="px-4 py-4 text-center align-middle">
          <div className="flex justify-center gap-3">
            <button className="cursor-pointer" onClick={handleEdit}>
              <ComposeIcon size="md" />
            </button>
            <button className="cursor-pointer" onClick={handleDelete}>
              <TrashIcon size="md" />
            </button>
          </div>
        </td>
      </tr>

      {updateModal && selectedSlug && (
        <AddProductModal
          isOpen={updateModal}
          mode="update"
          productSlug={selectedSlug}
          onClose={() => setUpdateModal(false)}
        />
      )}
      {deleteModal && selectedSlug && (
        <ProductDeleteModal
          productSlug={selectedSlug}
          onClose={() => setDeleteModal(false)}
        />
      )}
    </>
  );
};
