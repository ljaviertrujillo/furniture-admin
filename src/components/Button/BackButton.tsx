import { BsArrowLeft } from 'react-icons/bs'
import { Link } from 'react-router-dom'

interface Props{
    route: string
}

export default function BackButton({route}: Props) {
  return (
    <Link to={route} className='btn-secondary'>
        <BsArrowLeft />
        Volver
    </Link>
  )
}
BackButton