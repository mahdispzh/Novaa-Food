// src/app/profile/payment/_hooks/useAddress.ts

"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useAddresses } from "../../addresses/hooks/useAddresses";

interface FormattedAddress {
  id: number;
  title: string;
  fullAddress: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  receiverName: string;
  receiverPhone: string;
  isDefault: boolean;
}

export function useAddress() {
  const {
    addresses: allAddresses,
    isLoading: isLoadingAddresses,
    error: addressesError,
    selectAddress,
    fetchAddresses,
    userInfo,
  } = useAddresses();

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [address, setAddress] = useState<string>("");
  const [hasAddress, setHasAddress] = useState<boolean>(false);

  // فرمت کردن آدرس‌ها
  const formattedAddresses = useMemo<FormattedAddress[]>(() => {
    console.log("🔄 فرمت کردن آدرس‌ها...", allAddresses);
    
    if (!allAddresses || allAddresses.length === 0) {
      return [];
    }

    return allAddresses.map((addr: any) => ({
      id: addr.id,
      title: addr.title || "آدرس",
      fullAddress: addr.fullAddress || addr.address || 
        `${addr.province || ''} - ${addr.city || ''} - ${addr.address || ''}`,
      province: addr.province || "",
      city: addr.city || "",
      address: addr.address || "",
      postalCode: addr.postal_code || "",
      receiverName: addr.receiver_name || userInfo?.name || "",
      receiverPhone: addr.receiver_phone || userInfo?.phone || "",
      isDefault: addr.default || false,
    }));
  }, [allAddresses, userInfo]);

  // تنظیم آدرس پیش‌فرض
  useEffect(() => {
    console.log("📍 بررسی آدرس‌ها برای تنظیم پیش‌فرض...", formattedAddresses);
    
    if (formattedAddresses.length > 0) {
      const defaultAddress = formattedAddresses.find((addr) => addr.isDefault === true);
      
      if (defaultAddress) {
        console.log("✅ آدرس پیش‌فرض پیدا شد:", defaultAddress);
        setAddress(defaultAddress.fullAddress);
        setSelectedAddressId(defaultAddress.id);
        setHasAddress(true);
      } else {
        const firstAddress = formattedAddresses[0];
        if (firstAddress) {
          console.log("ℹ️ آدرس پیش‌فرضی وجود ندارد، انتخاب اولین آدرس");
          setAddress(firstAddress.fullAddress);
          setSelectedAddressId(firstAddress.id);
          setHasAddress(true);
        }
      }
    } else {
      console.log("ℹ️ هیچ آدرسی موجود نیست");
      setAddress("");
      setSelectedAddressId(null);
      setHasAddress(false);
    }
  }, [formattedAddresses]);

  // توابع کنترل مودال
  const openAddressModal = useCallback(() => {
    console.log("🔓 باز کردن مودال انتخاب آدرس");
    setIsAddressModalOpen(true);
  }, []);

  const closeAddressModal = useCallback(() => {
    console.log("🔒 بستن مودال انتخاب آدرس");
    setIsAddressModalOpen(false);
  }, []);

  // ✅ اصلاح شده: selectedAddressId حتماً number است
  const confirmAddressSelection = useCallback(() => {
    console.log("✅ تایید انتخاب آدرس");
    
    if (!selectedAddressId) {
      console.warn("⚠️ هیچ آدرسی انتخاب نشده است");
      closeAddressModal();
      return;
    }

    const selected = formattedAddresses.find((a) => a.id === selectedAddressId);
    if (selected) {
      selectAddress(selected.id);
      setAddress(selected.fullAddress);
      setHasAddress(true);
      console.log("✅ آدرس انتخاب و تایید شد:", selected);
    } else {
      console.warn("⚠️ آدرس انتخاب شده پیدا نشد");
    }
    closeAddressModal();
  }, [selectedAddressId, formattedAddresses, selectAddress, closeAddressModal]);

  const refreshAddresses = useCallback(async () => {
    console.log("🔄 رفرش آدرس‌ها...");
    await fetchAddresses();
  }, [fetchAddresses]);

  return {
    addresses: formattedAddresses,
    address,
    selectedAddressId,
    isAddressModalOpen,
    isLoadingAddresses,
    error: addressesError,
    hasAddress,
    setAddress,
    setSelectedAddressId, // ✅ این تابع number می‌گیرد
    openAddressModal,
    closeAddressModal,
    confirmAddressSelection,
    refreshAddresses,
  };
}