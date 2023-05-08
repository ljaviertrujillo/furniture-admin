import { configureStore } from "@reduxjs/toolkit";
import { User } from "../models";
import { Principal } from "../models/principal.model";
import userReducer from "./states/user";
import principalReducer from "./states/principal";
import categoryReducer, { CategoryState } from "./states/categories";
import projectReducer, { ProjectState } from "./states/projects";
import benefitReducer, { BenefitState } from "./states/benefits";
import subCategoryReducer, { SubCategoryState } from "./states/subcategories";
import productReducer, { ProductState } from "./states/products";

export interface AppStore {
  user: User;
  principal: Principal;
  category: CategoryState;
  subCategory: SubCategoryState;
  product: ProductState;
  project: ProjectState;
  benefit: BenefitState;
}

export default configureStore<AppStore>({
  reducer: {
    user: userReducer,
    principal: principalReducer,
    category: categoryReducer,
    subCategory: subCategoryReducer,
    product: productReducer,
    project: projectReducer,
    benefit: benefitReducer,
  },
});
