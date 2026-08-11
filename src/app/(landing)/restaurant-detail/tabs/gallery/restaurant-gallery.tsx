"use client"

import GalleryCard from "./restaurant-gallery-card"
import { GalleryCardData } from "./restaurant-gallery-card-constant"

export default function RestaurantGallery(){
    return(
        <div className="">
      {GalleryCardData.map((item, index) => (
        <GalleryCard key={index} {...item} />
      ))}
    </div>
    )
}