import { ButtonProps } from "./SecondaryButton";


export default function PrimaryButton({handle, icon, title}: ButtonProps) {
  return (
    <button
        type="button"
        className="btn-primary"
        onClick={handle}
    >
        {icon}
        {title}
    </button>
  )
}