import {
  ProfileModalConfig,
  ProfileModalType,
} from "@/src/app/dashboard/profile/_types/profile-modal.types";

export const PROFILE_MODAL_CONFIG: Record<
  ProfileModalType,
  ProfileModalConfig
> = {
  fullName: {
    title: "ویرایش نام و نام خانوادگی",
    fields: [
      {
        name: "firstName",
        label: "نام",
      },
      {
        name: "lastName",
        label: "نام خانوادگی",
      },
    ],
  },

  email: {
    title: "ویرایش ایمیل",
    fields: [
      {
        name: "email",
        label: "ایمیل",
      },
    ],
  },

  phone: {
    title: "ویرایش شماره موبایل",
    fields: [
      {
        name: "phone",
        label: "شماره موبایل",
      },
    ],
  },

  password: {
    title: "ویرایش رمز عبور",
    fields: [
      {
        name: "oldPassword",
        label: "رمز قبلی خود را وارد کنید",
      },
      {
        name: "currentPassword",
        label: "رمز فعلی",
      },
      {
        name: "newPassword",
        label: "رمز جدید",
      },
    ],
  },

  bankAccountNumber: {
    title: "ویرایش شماره حساب",
    fields: [
      {
        name: "accountNumber",
        label: "شماره حساب",
      },
    ],
  },
  accountHolderName: {
    title: "ویرایش نام صاحب حساب",
    fields: [
      {
        name: "accountNumber",
        label: "نام صاحب حساب",
      },
    ],
  },
  bankName: {
    title: "ویرایش نام بانک",
    fields: [
      {
        name: "accountNumber",
        label: "نام بانک ",
      },
    ],
  },
  iban: {
    title: "ویرایش شماره شبا",
    fields: [
      {
        name: "iban",
        label: "شماره شبا",
      },
    ],
  },
};
