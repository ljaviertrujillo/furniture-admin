import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { ItemMenu } from "../../models";

export interface RouteItemInterface {
  route: ItemMenu;
}

function SidebarItemView({ route }: RouteItemInterface) {
  const { setSidebarOpen } = useContext(AppContext);
  return (
    <NavLink
      to={route.url}
      className="route-link"
      onClick={() => setSidebarOpen(false)}
    >
      <div className="active-bar"></div>
      <div className="route">
        <route.icon className="icon" />
        <span className="label">{route.label}</span>
      </div>
    </NavLink>
  );
}

export default SidebarItemView;
