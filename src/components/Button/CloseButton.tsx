import {VscClose} from 'react-icons/vsc'

interface Props{
    handle?: () => void,
}

export default function CloseButton({handle}: Props) {
  return (
    <button
        className='btn-close'
        onClick={handle}
    >
        <VscClose />
    </button>
  )
}