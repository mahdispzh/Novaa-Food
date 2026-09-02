import { Button } from "./Button";
import { ButtonVariant, ButtonWidth } from "./button-types";

export interface DefaultButtonProps {
  label: string;
  action?: () => void;
  type?: ButtonVariant;
  style?: "fill" | "outline";
  width?: ButtonWidth;
  disabled?: boolean;
}

export function DefaultButton({
  label,
  action,
  type = "primary",
  style = "fill",
  width = "full",
  disabled,
}: DefaultButtonProps) {
  const variant: ButtonVariant = style === "outline" ? "outline" : type;

  return (
    <Button
      variant={variant}
      width={width}
      rounded="sm"
      size="lg"
      disabled={disabled}
      onClick={action}
      type="button"
    >
      {label}
    </Button>
  );
}
