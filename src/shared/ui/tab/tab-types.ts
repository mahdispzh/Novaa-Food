export type TabVariant =
  | "default"
  | "active";


export interface TabProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}