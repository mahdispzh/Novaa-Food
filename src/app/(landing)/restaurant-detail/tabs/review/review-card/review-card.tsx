"use client"

import { Review } from "../restaurant-review-type"

export default function ReviewCard({
    name,
    date,
    rating,
    comment,
}:Review){
    return(
        <div className="border border-beige rounded-sm mt-5">
         <div className="flex flex-col">
            <div className="flex">
                <p className="text-[13px] font-regular text-secondary">{name}</p>
            </div>
         </div>
        </div>
    )
}