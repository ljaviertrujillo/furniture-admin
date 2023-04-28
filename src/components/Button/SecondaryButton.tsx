export const enum TypeButton {
  SUBMIT = "submit",
  BUTTON = "button",
}

export interface ButtonProps {
  typeButton?: TypeButton;
  title: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  handle?: () => void;
}

export default function SecondaryButton({
  typeButton,
  handle,
  title,
  icon,
  disabled,
}: ButtonProps) {
  return (
    <button
      type={typeButton}
      className="btn-secondary"
      onClick={handle}
      disabled={disabled}
    >
      {icon}
      {title}
    </button>
  );
}
