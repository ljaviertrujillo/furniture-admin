import { classNames } from "../../utilities"

export enum ButtonType{
    LARGE = 'lg',
    SMALL = 'sm',
}

interface Props{
    title: string,
    type: ButtonType,
    handle?: () => void,
    icon: React.ReactNode
}

export default function UtilityButton({title, type, handle, icon}: Props) {
  return (
    <button
        type="button"
        onClick={handle}
        className={classNames('btn-utility', type)}
    >
        {icon}
        {type === ButtonType.LARGE ? title : null}
    </button>
  )
}