import "./web.scss";
import { Route } from "react-router-dom";

import { Suspense, lazy } from "react";
import { RoutesWithNotFound } from "../../../utilities";
import { WebRoutes } from "../../../models";
import CategoriesContextProvider from "../../../context/Web/CategoriesContext";
import PrincipalContextProvider from "../../../context/Web/PrincipalContext";
import ProjectsContextProvider from "../../../context/Web/ProjectsContext";
import ProductsContextProvider from "../../../context/Web/ProductsContext";
import BenefitContextProvider from "../../../context/Web/BenefitContext";
import { SecondarySideBar } from "../../../components";

const Categories = lazy(() => import("./Categories/Categories"));
const Principal = lazy(() => import("./Principal/Principal"));
const Products = lazy(() => import("./Products/Products"));
const Projects = lazy(() => import("./Projects/Projects"));
const Benefits = lazy(() => import("./Benefits/Benefits"));

export default function Web() {
  return (
    <>
      <SecondarySideBar />
      <PrincipalContextProvider>
        <CategoriesContextProvider>
          <ProductsContextProvider>
            <ProjectsContextProvider>
              <BenefitContextProvider>
                <Suspense fallback={<>Loading</>}>
                  <RoutesWithNotFound>
                    <Route index element={<Principal />} />
                    <Route path={WebRoutes.BENEFITS} element={<Benefits />} />
                    <Route
                      path={WebRoutes.CATEGORIES}
                      element={<Categories />}
                    />
                    <Route path={WebRoutes.PRODUCTS} element={<Products />} />
                    <Route path={WebRoutes.PROJECTS} element={<Projects />} />
                  </RoutesWithNotFound>
                </Suspense>
              </BenefitContextProvider>
            </ProjectsContextProvider>
          </ProductsContextProvider>
        </CategoriesContextProvider>
      </PrincipalContextProvider>
    </>
  );
}
