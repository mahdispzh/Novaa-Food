import { useState } from "react";

export default function useReastaurantDetail() {
  const [activeTab, setActiveTab] = useState("introduction");
  const [showReviewForm, setshowReviewForm] = useState(false);

  return {
    activeTab,
    setActiveTab,

    showReviewForm,
    setshowReviewForm,
  };
}
