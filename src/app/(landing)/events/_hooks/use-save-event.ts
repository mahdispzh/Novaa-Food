"use client";

import { useState } from "react";

export function useSaveEvent(initialIsSaved: boolean) {
  const [isSaved, setIsSaved] = useState(initialIsSaved);

  function toggleSave() {
    setIsSaved((prev) => !prev);
  }

  return { isSaved, toggleSave };
}
