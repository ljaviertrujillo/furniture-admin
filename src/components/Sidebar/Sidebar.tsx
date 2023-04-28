import "./sidebar.scss";

import { useContext } from "react";
import { classNames } from "../../utilities";
import { PageContext } from "../../context/PageContext";
import CloseButton from "../Button/CloseButton";
import { features, settings } from "../../models";
import SidebarItemView from "./SidebarItemView";

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useContext(PageContext);

  return (
    <aside className={classNames("sidebar", sidebarOpen ? "expanded" : "")}>
      <div className="logo">
        Logo
        <CloseButton handle={() => setSidebarOpen(false)} />
      </div>
      <div className="routes">
        <div className="features">
          {features.map((route) => (
            <SidebarItemView key={route.id} route={route} />
          ))}
        </div>
        <div className="settings">
          {settings.map((route) => (
            <SidebarItemView key={route.id} route={route} />
          ))}
        </div>
      </div>
    </aside>
  );
}
