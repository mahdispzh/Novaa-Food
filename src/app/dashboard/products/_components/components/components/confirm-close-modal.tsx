// "use client";

// import {Text} from "@/src/shared/ui";

// type Props = {
//   onCancel: () => void;
//   onConfirm: () => void;
// };

// export function ConfirmCloseModal({
//                                     onCancel,
//                                     onConfirm,
//                                   }: Props) {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div
//         className="absolute inset-0 bg-black/40"
//         onClick={onCancel}
//       />

//       <div className="relative bg-white p-6 rounded-sm w-[400px] z-10">
//         <Text text="آیا مطمئن هستید؟" size="md" weight="bold"/>

//         <p className="text-sm text-gray-500 mt-2">
//           اگر خارج شوید، اطلاعات ذخیره نمی‌شود.
//         </p>

//         <div className="flex justify-end gap-3 mt-4">
//           <button onClick={onCancel}
//                   style={{width: "110px", height: "35px"}}
//                   className="cursor-pointer font-primary rounded-xs text-primary  py-2 text-primary flex items-center justify-center border border-primary text-md text-medium"

//           >لغو
//           </button>
//           <button onClick={onConfirm}
//                   style={{width: "110px", height: "35px"}}
//                   className="cursor-pointer font-primary rounded-xs bg-primary  py-2 text-white flex items-center justify-center text-md text-medium"

//           >تایید
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { Text } from "@/src/shared/ui";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
};

export function ConfirmCloseModal({ onCancel, onConfirm }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* بک‌گراند تیره */}
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />

      {/* باکس سفید */}
      <div className="relative z-10 w-[400px] rounded-sm bg-white p-6">
        <Text text="آیا مطمئن هستید؟" size="md" weight="bold" />

        <p className="mt-2 text-sm text-gray-500">
          اگر خارج شوید، اطلاعات ذخیره نمی‌شود.
        </p>

        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={onCancel}
            style={{ width: "110px", height: "35px" }}
            className="text-medium flex cursor-pointer items-center justify-center rounded-xs border border-primary py-2 font-primary text-md text-primary"
          >
            لغو
          </button>
          <button
            onClick={onConfirm}
            style={{ width: "110px", height: "35px" }}
            className="text-medium flex cursor-pointer items-center justify-center rounded-xs bg-primary py-2 font-primary text-md text-white"
          >
            تایید
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
