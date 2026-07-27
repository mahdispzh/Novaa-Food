export type ProfileModalType =
  | "fullName"
  | "email"
  | "phone"
  | "password"
  | "bankAccountNumber"
  | "accountHolderName"
  | "bankName"
  | "iban";

export interface ModalField {
  name: string;
  label: string;
  value?: string;
}

export interface ProfileModalConfig {
  title: string;
  fields: ModalField[];
}
