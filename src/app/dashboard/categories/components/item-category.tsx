"use client"
import Image from "next/image";
import {Text} from "@/src/shared/ui";
import {ComposeIcon} from "@/src/shared/constants/icons/compose-icon";
import {TrashIcon} from "@/src/shared/constants/icons/trash-icon";
import {Category} from "@/src/app/dashboard/categories/components/categories/types/category.types";
import {useState} from "react";
import {CategoryModal} from "@/src/app/dashboard/categories/components/categories/components/category-modal";
import {
  CategoryDeleteModal
} from "@/src/app/dashboard/categories/components/categories/components/category-delete-modal";

interface Props {
  cat: Category,
  key: number
}

export function ItemCategory({cat, key}: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <div className={"flex justify-between border-2 border-gray rounded-xs px-6 py-4  "}>
      <div className={" flex  gap-4"}>
        <Image src={cat.image ?? "/images/image26.svg"} alt={"d"} width={70} height={87}/>
        <div className={"flex flex-col justify-between gap-2"}>
          <Text text={cat.name} size={"lg"} weight={"medium"}/>
          <Text text={"توضیحات نمونه مربوطه به این دسته بندی"} weight={"regular"} size={"sm"} color={"secondary"}/>
          <div className={"flex gap-2"}>
            <Text text={"#" + cat.slug} weight={"regular"} size={"sm"} color={"secondary"}/>

          </div>
        </div>
      </div>
      <div className={"flex gap-3 items-end"}>
        <button className={"cursor-pointer"} onClick={() => {
          setSelectedId(cat.id)
          setUpdateModal(true)
        }
        }>
          <ComposeIcon size={"md"}/>
        </button>


        <button className={"cursor-pointer"}
                onClick={() => {
                  setSelectedId(cat.id)
                  setDeleteModal(true)
                }
                }
        >
          <TrashIcon size={"md"}/>
        </button>


      </div>
      {updateModal && selectedId !== null && (
        <CategoryModal
          mode="update"
          categoryId={selectedId}
          onClose={() => setUpdateModal(false)}
        />
      )}
      {
        deleteModal && selectedId !== null && (
        <CategoryDeleteModal
          categoryId={selectedId}
          onClose={() => setDeleteModal(false)}
        />
      )}
    </div>
  );
}





