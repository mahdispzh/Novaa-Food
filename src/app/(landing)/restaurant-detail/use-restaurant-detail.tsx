import { useState } from "react";

export default function useReastaurantDetail() {
  const [activeTab, setActiveTab] = useState("introduction");
  return {
    activeTab,
    setActiveTab,
  };
}
