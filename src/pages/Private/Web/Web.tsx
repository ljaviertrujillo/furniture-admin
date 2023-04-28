import "./web.scss";
import { Route } from "react-router-dom";

import WebNav from "./components/WebNav/WebNav";
import { Suspense, lazy } from "react";
import { RoutesWithNotFound } from "../../../utilities";
import WebContextProvider from "../../../context/Web/WebContext";
import { WebRoutes } from "../../../models";
import CategoriesContextProvider from "../../../context/Web/CategoriesContext";
import PrincipalContextProvider from "../../../context/Web/PrincipalContext";
import ProjectsContextProvider from "../../../context/Web/ProjectsContext";

const Categories = lazy(() => import("./components/Categories/Categories"));
const Subcategories = lazy(
  () => import("./components/Subcategories/Subcategories")
);
const Principal = lazy(() => import("./components/Principal/Principal"));
const Products = lazy(() => import("./components/Products/Products"));
const Projects = lazy(() => import("./components/Projects/Projects"));

export default function Web() {
  return (
    <>
      <WebNav />
      <PrincipalContextProvider>
        <CategoriesContextProvider>
          <ProjectsContextProvider>
            <Suspense fallback={<>Loading</>}>
              <RoutesWithNotFound>
                <Route index element={<Principal />} />
                <Route path={WebRoutes.CATEGORIES} element={<Categories />} />
                <Route
                  path={WebRoutes.SUBCATEGORIES}
                  element={<Subcategories />}
                />
                <Route path={WebRoutes.PRODUCTS} element={<Products />} />
                <Route path={WebRoutes.PROJECTS} element={<Projects />} />
              </RoutesWithNotFound>
            </Suspense>
          </ProjectsContextProvider>
        </CategoriesContextProvider>
      </PrincipalContextProvider>
    </>
  );
}
