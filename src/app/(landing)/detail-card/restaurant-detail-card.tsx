"use client";

export default function RestaurantDetailCard() {
  return (
    <div className="relative w-[260px] shrink-0">
      {/* مستطیل بالا */}
      <div className="absolute -top-3 right-0 h-11 w-36 rounded-md bg-secondary" />
      {/* مستطیل پایین */}
      <div className="absolute -bottom-4 left-8 h-10 w-48 rounded-md bg-secondary" />
    </div>
  );
}
