"use client";

import {ItemCategory} from "@/src/app/dashboard/categories/components/item-category";
import {useCategories} from "@/src/app/dashboard/categories/components/categories/hook/use-categories";

interface Props {

}

export default function Main({}: Props) {

  const page = 1;
  const limit = 10;

  const { data, isLoading, error } = useCategories(page, limit);

  const categories = data?.data?.data ?? [];

  if (isLoading) return <div className={"w-full h-full flex items-center justify-center"}>Loading...</div>;
  if (error) return <p>Error...</p>;
  console.log("categories", categories)
  return (
    <div className="h-[540px] overflow-x-auto rounded-sm py-1 ">
     <div className={"flex flex-col gap-4 pl-4"}>
       {
         categories &&
         categories.map((cat) => (
           <ItemCategory cat={cat} key={cat.id}  />
         ))
       }
     </div>
    </div>
    );
}
