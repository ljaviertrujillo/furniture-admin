import "./private.scss";
import { Suspense, lazy, useContext } from "react";
import { Route, useMatch } from "react-router-dom";
import { PrivateRoutes } from "../../models";
import { RoutesWithNotFound, classNames } from "../../utilities";
import { Navbar, Sidebar } from "../../components";
import { AppContext } from "../../context/AppContext";
import AdminGuard from "../../guards/admin.guard";
import WebContextProvider from "../../context/Web/WebContext";

const Home = lazy(() => import("./Home/Home"));
const Team = lazy(() => import("./Team/Team"));
const Profile = lazy(() => import("./Profile/Profile"));
const Settings = lazy(() => import("./Settings/Settings"));
const Web = lazy(() => import("./Web/Web"));
const Gallery = lazy(() => import("./Gallery/Gallery"));

export default function Private() {
  const { sidebarOpen } = useContext(AppContext);
  const webMatch = useMatch("/web/*");
  return (
    <WebContextProvider>
      {webMatch === null ? <Sidebar /> : null}
      <div className={classNames("content", sidebarOpen ? "blur" : "")}>
        <Navbar />
        <Suspense fallback={<>Loading</>}>
          <RoutesWithNotFound>
            <Route index element={<Home />} />
            <Route path={PrivateRoutes.PROFILE} element={<Profile />} />
            <Route path={PrivateRoutes.TEAM} element={<Team />} />
            <Route path={PrivateRoutes.GALLERY} element={<Gallery />} />
            <Route element={<AdminGuard />}>
              <Route path={`${PrivateRoutes.WEB}/*`} element={<Web />} />
            </Route>
            <Route path={PrivateRoutes.SETTINGS} element={<Settings />} />
          </RoutesWithNotFound>
        </Suspense>
      </div>
    </WebContextProvider>
  );
}
