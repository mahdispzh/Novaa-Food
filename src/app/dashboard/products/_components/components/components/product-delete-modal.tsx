// "use client";

// import { CloseIcon } from "@/src/shared/constants/icons/close-icon";
// import { Modal, Text } from "@/src/shared/ui";
// import { useDeleteProduct } from "../hook/useDeleteProduct";

// type Props = {
//   productSlug: string;
//   onClose: () => void;
// };

// export function ProductDeleteModal({ productSlug, onClose }: Props) {
//   const deleteMutation = useDeleteProduct();

//   const handleDelete = () => {
//     deleteMutation.mutate(productSlug, {
//       onSuccess: () => {
//         console.log("deleted");
//         onClose();
//       },
//       onError: (err) => console.log(err),
//     });
//   };

//   return (
//     <Modal isOpen onClose={onClose}>
//       <div className="w-[400px] rounded-sm bg-white">
//         <div className="flex items-center justify-between border-b px-4 py-2">
//           <Text text="حذف محصول" size="lg" weight="bold" />
//           <button onClick={onClose} className="cursor-pointer">
//             <CloseIcon size="sm" />
//           </button>
//         </div>
//         <div className="px-5 py-6">
//           <p className="text-sm text-gray-500">
//             آیا مطمئن هستید که می‌خواهید این محصول را حذف کنید؟
//           </p>
//           <div className="mt-6 flex gap-3">
//             <button
//               onClick={onClose}
//               className="w-full rounded-sm border border-gray-300 py-3"
//             >
//               لغو
//             </button>
//             <button
//               disabled={deleteMutation.isPending}
//               onClick={handleDelete}
//               className="w-full rounded-sm bg-danger py-3 text-white disabled:opacity-50"
//             >
//               {deleteMutation.isPending ? "در حال حذف..." : "حذف"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// }
"use client";

import { CloseIcon } from "@/src/shared/constants/icons/close-icon";
import { Text } from "@/src/shared/ui";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDeleteProduct } from "../hook/useDeleteProduct";

type Props = {
  productSlug: string;
  onClose: () => void;
};

export function ProductDeleteModal({ productSlug, onClose }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const deleteMutation = useDeleteProduct();

  const handleDelete = () => {
    deleteMutation.mutate(productSlug, {
      onSuccess: () => {
        console.log("deleted");
        onClose();
      },
      onError: (err) => console.log(err),
    });
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-[400px] rounded-sm bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b px-4 py-2">
          <Text text="حذف محصول" size="lg" weight="bold" />
          <button onClick={onClose} className="cursor-pointer">
            <CloseIcon size="sm" />
          </button>
        </div>
        <div className="px-5 py-6">
          <p className="text-sm text-gray-500">
            آیا مطمئن هستید که می‌خواهید این محصول را حذف کنید؟
          </p>
          <div className="mt-6 flex gap-3">
            <button
              onClick={onClose}
              className="w-full rounded-sm border border-gray-300 py-3"
            >
              لغو
            </button>
            <button
              disabled={deleteMutation.isPending}
              onClick={handleDelete}
              className="w-full rounded-sm bg-danger py-3 text-white disabled:opacity-50"
            >
              {deleteMutation.isPending ? "در حال حذف..." : "حذف"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
