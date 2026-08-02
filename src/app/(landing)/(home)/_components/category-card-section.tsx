"use client"

import CategoryCard from "@/src/shared/ui/category-card/category-card";
import { categories } from "@/src/shared/ui/category-card/category-card-constants";
import SectionHeading from "@/src/shared/ui/section-heading/section-heading";

 export default function CategoryCardSection(){
    return(
        <div className="flex flex-col gap-5">

            <SectionHeading
        title="دسته‌بندی‌ها"
        subtitle="از کافه‌های دنج تا رستوران‌های خاص"
        />

       <div className="flex gap-5">

       {categories.map( (category) =>(

        <CategoryCard
        key={category.id}
        title={category.title}
        icon={category.icon}
        />

       ) )}


       </div>

        </div>
        

    )
 }