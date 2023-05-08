import './userMenu.scss'
import { useContext } from "react"
import { AppContext } from "../../context/AppContext"
import { useNavigate } from "react-router-dom"
import { classNames } from "../../utilities"
import { UtilityButton } from "../Button"
import { ButtonType } from "../Button/UtilityButton"

import { BsBell, BsCalendar3, BsPerson } from 'react-icons/bs'
import {Logout} from "../"
import ThemePage from "./ThemePage"

export default function UserMenu() {
    const { userOptions, setUserOptions } = useContext(AppContext)
    const navigate = useNavigate()

    const profileNav = () => {
        navigate('/profile')
        setUserOptions(!userOptions)
    }

  return (
    <div className={classNames('user-options', userOptions ? 'expanded' : '')}>
        <div className='theme-options'>
            <ThemePage />
        </div>
        <div className="options utilities">
            <UtilityButton type={ButtonType.LARGE} title='Calendario' icon={<BsCalendar3 />} />
            <UtilityButton type={ButtonType.LARGE} title='Notificaciones' icon={<BsBell />} />
        </div>
        <div className="options">
            <UtilityButton type={ButtonType.LARGE} title='Mi Perfil' icon={<BsPerson />} handle={profileNav} />
            <Logout />
        </div>
    </div>
  )
}