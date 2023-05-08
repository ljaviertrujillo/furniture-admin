import { configureStore } from "@reduxjs/toolkit";
import { IUser } from "../models";
import userReducer from "./states/user";
import categoryReducer, { CategoryState } from "./states/categories";
import { IPrincipal } from "../models/principal.model";
import principalReducer from "./states/principal";
import projectReducer, { ProjectState } from "./states/projects";
import benefitReducer, { BenefitState } from "./states/benefits";

export interface AppStore {
  user: IUser;
  principal: IPrincipal;
  category: CategoryState;
  project: ProjectState;
  benefit: BenefitState;
}

export default configureStore<AppStore>({
  reducer: {
    user: userReducer,
    principal: principalReducer,
    category: categoryReducer,
    project: projectReducer,
    benefit: benefitReducer,
  },
});
