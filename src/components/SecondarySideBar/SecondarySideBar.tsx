import { ItemMenu, PrivateRoutes, webRoutes } from "../../models";
import { ArrowButton } from "../Button";
import "./secondary-sidebar.scss";

import { NavLink } from "react-router-dom";

export default function SecondarySideBar() {
  const WebSidebarItem = ({ route }: { route: ItemMenu }) => {
    return (
      <NavLink
        to={`${PrivateRoutes.WEB}${route.url}`}
        className="web-route-link"
      >
        <div className="web-active-bar"></div>
        <div className="web-route">
          <route.icon className="web-icon" />
          <span className="web-label">{route.label}</span>
        </div>
      </NavLink>
    );
  };

  return (
    <aside className="web-nav">
      <header className="web-header">
        <ArrowButton />
      </header>
      {webRoutes.map((route) => (
        <WebSidebarItem key={route.id} route={route} />
      ))}
    </aside>
  );
}
