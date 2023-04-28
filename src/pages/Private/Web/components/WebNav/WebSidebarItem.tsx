import { NavLink } from "react-router-dom";
import { ItemMenu, PrivateRoutes } from "../../../../../models";

interface Props{
    route: ItemMenu,
}

export default function WebSidebarItem({route}: Props) {
  return (
    <NavLink to={`${PrivateRoutes.WEB}${route.url}`} className="web-route-link">
      <div className="web-active-bar"></div>
      <div className="web-route">
        <route.icon className="web-icon" />
        <span className="web-label">{route.label}</span>
      </div>
    </NavLink>
  )
}