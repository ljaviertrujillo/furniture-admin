import "./navbar.scss";

import { useLocation, useMatch } from "react-router-dom";
import UserMenu from "../UserMenu/UserMenu";
import { features, settings } from "../../models";
import { UtilityButton } from "../Button";
import { ButtonType } from "../Button/UtilityButton";
import { BsBell, BsCalendar3 } from "react-icons/bs";
import User from "../Button/User";
import { useContext } from "react";
import { PageContext } from "../../context/PageContext";
import BackButton from "../Button/BackButton";
import { WebContext } from "../../context/Web/WebContext";
import { classNames } from "../../utilities";

export default function Navbar() {
  const { userOptions, setUserOptions } = useContext(PageContext);
  const { isOpen } = useContext(WebContext);
  const location = useLocation();
  const profileLabel = "Profile";
  const labelPage =
    features.find((route) => route.url === location.pathname) ||
    settings.find((route) => route.url === location.pathname);
  const webMatch = useMatch("/web/*");

  return (
    <nav className="nav">
      <div className={classNames("nav-content", isOpen ? "collapsed" : "")}>
        <div className="nav-header">
          {webMatch === null ? (
            <span className="page-label">
              {location.pathname === "/profile"
                ? profileLabel
                : labelPage?.label}
            </span>
          ) : (
            <BackButton route="/" />
          )}
        </div>
        <div className="footer">
          <div className="utilities">
            <UtilityButton
              type={ButtonType.SMALL}
              title="Calendar"
              icon={<BsCalendar3 />}
            />
            <UtilityButton
              type={ButtonType.SMALL}
              title="Notifications"
              icon={<BsBell />}
            />
          </div>
          <User
            type={ButtonType.LARGE}
            handle={() => setUserOptions(!userOptions)}
          />
        </div>
      </div>
      <UserMenu />
    </nav>
  );
}
